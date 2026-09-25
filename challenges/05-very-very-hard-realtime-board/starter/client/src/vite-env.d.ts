/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Where the TaskBoard server lives, e.g. https://taskboard-api.fly.dev */
  readonly VITE_SERVER_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
