/** The HTTP origin of the server, for POST /login. */
export const SERVER_URL = (import.meta.env.VITE_SERVER_URL ?? 'http://localhost:8787').replace(/\/$/, '')

/** The WebSocket URL: same host, ws:// or wss:// instead of http:// or https://. */
export const WS_URL = `${SERVER_URL.replace(/^http/, 'ws')}/ws`
