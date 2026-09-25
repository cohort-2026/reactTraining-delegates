import { startServer } from './app'
import { loadConfig } from './config'
import { createSeededStore } from './store'

const config = loadConfig()
const server = await startServer(config, createSeededStore())

console.log(`TaskBoard server on http://localhost:${server.port}`)
console.log(`  POST /login   WebSocket /ws   allowed origins: ${config.allowedOrigins.join(', ')}`)

async function shutdown() {
  await server.close()
  process.exit(0)
}
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
