declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    VITE_DEV_SERVER_URL: string;
  }
}
