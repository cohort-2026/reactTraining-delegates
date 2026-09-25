import type { IncomingMessage, ServerResponse } from 'node:http'
import { loginRequestSchema, type LoginResponse } from '@taskboard/shared'
import { signToken } from './auth'
import type { ServerConfig } from './config'
import type { Store } from './store'

const MAX_BODY_BYTES = 10_000

function json(res: ServerResponse, status: number, body: unknown) {
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(body))
}

async function readBody(req: IncomingMessage): Promise<unknown> {
  let size = 0
  const chunks: Buffer[] = []
  for await (const chunk of req) {
    size += (chunk as Buffer).length
    if (size > MAX_BODY_BYTES) throw new Error('Body too large')
    chunks.push(chunk as Buffer)
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'))
}

/** Plain `node:http` handler: POST /login and GET /health, with CORS for the client origin. */
export function createHttpHandler(config: ServerConfig, store: Store) {
  return async (req: IncomingMessage, res: ServerResponse) => {
    const origin = req.headers.origin
    if (origin && config.allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin)
      res.setHeader('Vary', 'Origin')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
      res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    }
    if (req.method === 'OPTIONS') {
      res.writeHead(204).end()
      return
    }

    if (req.method === 'GET' && req.url === '/health') {
      json(res, 200, { ok: true })
      return
    }

    if (req.method === 'POST' && req.url === '/login') {
      let body: unknown
      try {
        body = await readBody(req)
      } catch {
        json(res, 400, { error: 'Send a JSON body.' })
        return
      }
      const parsed = loginRequestSchema.safeParse(body)
      if (!parsed.success) {
        json(res, 400, { error: 'Enter a username and password.' })
        return
      }
      const user = store.checkCredentials(parsed.data.username, parsed.data.password)
      if (!user) {
        // Same message for "no such user" and "wrong password".
        json(res, 401, { error: 'Username or password is incorrect.' })
        return
      }
      const token = await signToken(user, config.jwtSecret, config.tokenTtl)
      const response: LoginResponse = { token, user, boards: store.boardsFor(user.id) }
      json(res, 200, response)
      return
    }

    json(res, 404, { error: 'Not found' })
  }
}
