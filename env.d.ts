/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_HASURA_HTTP: string
	readonly VITE_HASURA_WS: string
	readonly VITE_HASURA_ROLE: string
	readonly VITE_HASURA_ADMIN_SECRET?: string
	readonly VITE_HASURA_ACCESS_KEY?: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
