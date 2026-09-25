export interface ServerConfig {
  port: number
  /** HMAC secret for signing tokens. At least 32 characters in production. */
  jwtSecret: string
  /** How long a token lasts, in jose's format: '1h', '15m', '30s'. */
  tokenTtl: string
  /** Browser origins allowed to call /login and open a socket. */
  allowedOrigins: string[]
  /** How long a new socket has to send its `auth` message. */
  authTimeoutMs: number
  /** How often the server pings sockets to find dead ones. */
  heartbeatMs: number
}

const DEV_SECRET = 'dev-only-secret-change-me-dev-only-secret'

export function loadConfig(env: NodeJS.ProcessEnv = process.env): ServerConfig {
  const jwtSecret = env.JWT_SECRET ?? DEV_SECRET
  if (env.NODE_ENV === 'production' && (jwtSecret === DEV_SECRET || jwtSecret.length < 32)) {
    throw new Error('Set JWT_SECRET to a random string of at least 32 characters.')
  }
  return {
    port: Number(env.PORT ?? 8787),
    jwtSecret,
    tokenTtl: env.TOKEN_TTL ?? '1h',
    allowedOrigins: (env.ALLOWED_ORIGINS ?? 'http://localhost:5173')
      .split(',')
      .map((o) => o.trim())
      .filter(Boolean),
    authTimeoutMs: 5_000,
    heartbeatMs: 30_000,
  }
}
