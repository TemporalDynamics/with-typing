/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEBUG_GAME_EVENTS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

