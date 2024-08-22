/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REACT_APP_REST_API_KEY: string;
  readonly VITE_REACT_APP_KAKAO_REDIRECT_URL: string;
  readonly VITE_REACT_APP_GOOGLE_REDIRECT_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
