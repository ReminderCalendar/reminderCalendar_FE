/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REACT_APP_REST_API_KEY: string;
  readonly VITE_REACT_APP_REDIRECT_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
