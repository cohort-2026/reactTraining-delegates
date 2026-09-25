import { createServer, type Server } from 'node:http'
import type { AddressInfo } from 'node:net'
import { WebSocketServer, type WebSocket } from 'ws'
import type { ServerConfig } from './config'
import { handleConnection } from './connection'
import { createHttpHandler } from './http'
import { Hub } from './hub'
import type { Store } from './store'

export interface RunningServer {
  port: number
  httpServer: Server
  wss: WebSocketServer
  hub: Hub
  store: Store
  close: () => Promise<void>
}

/** Start the HTTP + WebSocket server. Pass `port: 0` to get a random free port (tests do). */
export async function startServer(config: ServerConfig, store: Store): Promise<RunningServer> {
  const hub = new Hub(store)
  const httpServer = createServer(createHttpHandler(config, store))

  const wss = new WebSocketServer({
    server: httpServer,
    path: '/ws',
    maxPayload: 16 * 1024,
    // Browsers always send Origin. Refuse pages we do not know (cross-site WebSocket hijacking).
    // Non-browser clients (tests, curl) send none and still have to authenticate.
    verifyClient: ({ origin }: { origin?: string }) =>
      !origin || config.allowedOrigins.includes(origin),
  })

  // Heartbeat: a laptop that sleeps or loses Wi-Fi never sends a close frame.
  // Ping everyone; terminate anyone who did not answer the previous ping.
  const alive = new WeakMap<WebSocket, boolean>()
  wss.on('connection', (socket) => {
    alive.set(socket, true)
    socket.on('pong', () => alive.set(socket, true))
    handleConnection(socket, {
      store,
      hub,
      jwtSecret: config.jwtSecret,
      authTimeoutMs: config.authTimeoutMs,
    })
  })
  const heartbeat = setInterval(() => {
    for (const socket of wss.clients) {
      if (!alive.get(socket)) {
        socket.terminate()
        continue
      }
      alive.set(socket, false)
      socket.ping()
    }
  }, config.heartbeatMs)

  await new Promise<void>((resolve) => httpServer.listen(config.port, resolve))
  const port = (httpServer.address() as AddressInfo).port

  return {
    port,
    httpServer,
    wss,
    hub,
    store,
    close: async () => {
      clearInterval(heartbeat)
      for (const socket of wss.clients) socket.terminate()
      await new Promise<void>((resolve) => wss.close(() => resolve()))
      await new Promise<void>((resolve) => httpServer.close(() => resolve()))
    },
  }
}
