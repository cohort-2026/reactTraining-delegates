/**
 * Starts the real server on a random port and talks to it with real `ws`
 * clients, exactly as two browsers would.
 */
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { SignJWT } from 'jose'
import { WebSocket } from 'ws'
import {
  CLOSE_FORBIDDEN,
  CLOSE_UNAUTHENTICATED,
  type ClientMessage,
  type LoginResponse,
  type ServerMessage,
  type SnapshotMessage,
} from '@taskboard/shared'
import { startServer, type RunningServer } from './app'
import type { ServerConfig } from './config'
import { createSeededStore } from './store'

const config: ServerConfig = {
  port: 0,
  jwtSecret: 'integration-test-secret-at-least-32-characters',
  tokenTtl: '1h',
  allowedOrigins: ['http://localhost:5173'],
  authTimeoutMs: 500,
  heartbeatMs: 60_000,
}
const WAIT_MS = 2_000

let server: RunningServer
const clients: TestClient[] = []

beforeEach(async () => {
  server = await startServer(config, createSeededStore())
})

afterEach(async () => {
  clients.splice(0).forEach((c) => c.socket.terminate())
  await server.close()
})

/** A thin wrapper that buffers messages so a test can `await` the next one it cares about. */
class TestClient {
  private inbox: ServerMessage[] = []
  private waiters: Array<() => void> = []
  readonly socket: WebSocket
  readonly closed: Promise<{ code: number; reason: string }>

  constructor(socket: WebSocket) {
    this.socket = socket
    clients.push(this)
    socket.on('message', (data) => {
      this.inbox.push(JSON.parse(String(data)) as ServerMessage)
      this.waiters.splice(0).forEach((wake) => wake())
    })
    this.closed = new Promise((resolve) =>
      socket.on('close', (code, reason) => resolve({ code, reason: String(reason) })),
    )
  }

  static async open(): Promise<TestClient> {
    const socket = new WebSocket(`ws://127.0.0.1:${server.port}/ws`)
    const client = new TestClient(socket)
    await new Promise((resolve, reject) => {
      socket.once('open', resolve)
      socket.once('error', reject)
    })
    return client
  }

  /** Log in over HTTP, open a socket and authenticate. Resolves with the snapshot. */
  static async join(username: string, boardId = 'launch'): Promise<[TestClient, SnapshotMessage]> {
    const token = await login(username)
    const client = await TestClient.open()
    client.send({ type: 'auth', token, boardId })
    const snapshot = await client.next((m) => m.type === 'snapshot')
    return [client, snapshot as SnapshotMessage]
  }

  send(message: ClientMessage | Record<string, unknown>) {
    this.socket.send(JSON.stringify(message))
  }

  /** Resolve with (and remove) the first buffered or future message that matches. */
  async next<T extends ServerMessage>(match: (m: ServerMessage) => m is T): Promise<T>
  async next(match: (m: ServerMessage) => boolean): Promise<ServerMessage>
  async next(match: (m: ServerMessage) => boolean): Promise<ServerMessage> {
    const deadline = Date.now() + WAIT_MS
    for (;;) {
      const index = this.inbox.findIndex(match)
      if (index !== -1) return this.inbox.splice(index, 1)[0]
      const left = deadline - Date.now()
      if (left <= 0) throw new Error(`Timed out. Received: ${JSON.stringify(this.inbox)}`)
      await new Promise<void>((resolve) => {
        const timer = setTimeout(resolve, left)
        this.waiters.push(() => {
          clearTimeout(timer)
          resolve()
        })
      })
    }
  }

  /** The close code, once the server closes the socket. Fails the test after WAIT_MS * 2. */
  async closeCode(): Promise<number> {
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('The server did not close the socket')), WAIT_MS * 2),
    )
    return (await Promise.race([this.closed, timeout])).code
  }

  /** Everything received so far that matches. Does not wait. */
  received(match: (m: ServerMessage) => boolean): ServerMessage[] {
    return this.inbox.filter(match)
  }
}

async function login(username: string): Promise<string> {
  const res = await fetch(`http://127.0.0.1:${server.port}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password: 'password123' }),
  })
  expect(res.status).toBe(200)
  return ((await res.json()) as LoginResponse).token
}

const settle = () => new Promise((resolve) => setTimeout(resolve, 150))

describe('authentication handshake', () => {
  it('closes a socket whose first message is not auth, with 4001', async () => {
    const client = await TestClient.open()
    client.send({ type: 'task.delete', clientMutationId: 'x', taskId: 't-1', baseVersion: 1 })
    expect(await client.closeCode()).toBe(CLOSE_UNAUTHENTICATED)
  })

  it('closes a socket that sends a forged token, with 4001', async () => {
    const client = await TestClient.open()
    client.send({ type: 'auth', token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1LWFsaWNlIn0.bad', boardId: 'launch' })
    expect(await client.closeCode()).toBe(CLOSE_UNAUTHENTICATED)
  })

  it('closes a socket that never authenticates, with 4001', async () => {
    const client = await TestClient.open()
    expect(await client.closeCode()).toBe(CLOSE_UNAUTHENTICATED)
  })

  it('closes with 4003 when the user is not a member of the board', async () => {
    const token = await login('carol') // carol is not on the "ops" board
    const client = await TestClient.open()
    client.send({ type: 'auth', token, boardId: 'ops' })
    expect(await client.closeCode()).toBe(CLOSE_FORBIDDEN)
  })

  it('closes an authenticated socket with 4001 once its token expires', async () => {
    // A real token (right secret, issuer and audience) that expires in one to two seconds.
    const token = await new SignJWT({ name: 'Alice Ng' })
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject('u-alice')
      .setIssuer('taskboard')
      .setAudience('taskboard-realtime')
      .setExpirationTime(Math.floor(Date.now() / 1000) + 2)
      .sign(new TextEncoder().encode(config.jwtSecret))
    const client = await TestClient.open()
    client.send({ type: 'auth', token, boardId: 'launch' })
    await client.next((m) => m.type === 'snapshot')
    expect(await client.closeCode()).toBe(CLOSE_UNAUTHENTICATED)
  })

  it('sends a snapshot of the board after a valid auth', async () => {
    const [, snapshot] = await TestClient.join('alice')
    expect(snapshot.board).toEqual({ id: 'launch', name: 'Product launch' })
    expect(snapshot.me).toMatchObject({ userId: 'u-alice', role: 'owner' })
    expect(snapshot.tasks.map((t) => t.id)).toEqual(['t-1', 't-2', 't-3', 't-4'])
  })
})

describe('two clients on one board', () => {
  it('broadcasts a change to the other client and acks the sender', async () => {
    const [alice] = await TestClient.join('alice')
    const [bob] = await TestClient.join('bob')

    alice.send({
      type: 'task.create',
      clientMutationId: 'create-1',
      task: { id: 'new-1', title: 'Hire a DJ', description: '', column: 'todo', order: 50 },
    })

    const ack = await alice.next((m) => m.type === 'ack')
    expect(ack).toMatchObject({ clientMutationId: 'create-1', taskId: 'new-1', task: { version: 1 } })

    const created = await bob.next((m) => m.type === 'task.created')
    expect(created).toMatchObject({ task: { id: 'new-1', title: 'Hire a DJ' }, by: 'u-alice' })

    // The sender gets an ack, not a copy of its own broadcast.
    await settle()
    expect(alice.received((m) => m.type === 'task.created')).toHaveLength(0)
  })

  it('accepts the first of two updates on the same version and rejects the second with the current task', async () => {
    const [alice] = await TestClient.join('alice')
    const [bob] = await TestClient.join('bob')

    alice.send({ type: 'task.update', clientMutationId: 'a-1', taskId: 't-1', baseVersion: 1, changes: { title: 'Alice was here' } })
    await alice.next((m) => m.type === 'ack' && m.clientMutationId === 'a-1')

    bob.send({ type: 'task.update', clientMutationId: 'b-1', taskId: 't-1', baseVersion: 1, changes: { title: 'Bob was here' } })
    const rejection = await bob.next((m) => m.type === 'error')
    expect(rejection).toMatchObject({
      code: 'CONFLICT',
      clientMutationId: 'b-1',
      current: { id: 't-1', title: 'Alice was here', version: 2 },
    })

    // A fresh client sees Alice's title, not Bob's.
    const [, snapshot] = await TestClient.join('carol')
    expect(snapshot.tasks.find((t) => t.id === 't-1')).toMatchObject({ title: 'Alice was here', version: 2 })
  })

  it('rejects a viewer\'s change and tells nobody else about it', async () => {
    const [alice] = await TestClient.join('alice')
    const [carol] = await TestClient.join('carol')

    carol.send({ type: 'task.delete', clientMutationId: 'c-1', taskId: 't-1', baseVersion: 1 })
    expect(await carol.next((m) => m.type === 'error')).toMatchObject({ code: 'FORBIDDEN', clientMutationId: 'c-1' })

    await settle()
    expect(alice.received((m) => m.type === 'task.deleted')).toHaveLength(0)
  })

  it('answers an invalid message with an INVALID error and keeps the socket open', async () => {
    const [alice] = await TestClient.join('alice')
    alice.send({ type: 'task.update', clientMutationId: 'a-2', taskId: 't-1', baseVersion: 'one' })
    expect(await alice.next((m) => m.type === 'error')).toMatchObject({ code: 'INVALID' })
    expect(alice.socket.readyState).toBe(WebSocket.OPEN)
  })
})

describe('presence', () => {
  it('announces joins and leaves, once per user rather than once per tab', async () => {
    const [alice] = await TestClient.join('alice')
    const [bob, bobSnapshot] = await TestClient.join('bob')

    expect(bobSnapshot.presence.map((p) => p.userId).sort()).toEqual(['u-alice', 'u-bob'])
    expect(await alice.next((m) => m.type === 'presence.join')).toMatchObject({
      user: { userId: 'u-bob', role: 'member' },
    })

    // Bob opens a second tab: nobody needs to hear about it.
    const [bobTab2] = await TestClient.join('bob')
    await settle()
    expect(alice.received((m) => m.type === 'presence.join')).toHaveLength(0)

    // Closing one of Bob's tabs is not a leave...
    bobTab2.socket.close()
    await settle()
    expect(alice.received((m) => m.type === 'presence.leave')).toHaveLength(0)

    // ...closing the last one is.
    bob.socket.close()
    expect(await alice.next((m) => m.type === 'presence.leave')).toEqual({ type: 'presence.leave', userId: 'u-bob' })
  })
})
