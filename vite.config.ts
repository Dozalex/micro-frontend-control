import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { rmSync } from 'node:fs';
import path from 'node:path';
import { defineConfig, UserConfigFnObject } from 'vite';
import electron from 'vite-plugin-electron/simple';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

import pkg from './package.json';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig((({ command }) => {
  rmSync('dist-electron', { recursive: true, force: true });

  const isServe = command === 'serve';
  const isBuild = command === 'build';
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG;

  return {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src'),
      },
    },
    plugins: [
      tsconfigPaths(),
      react(),
      svgr({
        include: '**/*.svg',
      }),
      electron({
        main: {
          // Shortcut of `build.lib.entry`
          entry: 'src/electronCore/main.ts',
          vite: {
            build: {
              sourcemap,
              minify: isBuild,
              outDir: 'dist-electron/main',
              rollupOptions: {
                external: Object.keys(
                  'dependencies' in pkg ? pkg.dependencies : {},
                ),
              },
            },
          },
        },
        preload: {
          // Shortcut of `build.rollupOptions.input`.
          // Preload scripts may contain Web assets,
          // so use the `build.rollupOptions.input` instead `build.lib.entry`.
          input: 'src/electronCore/preload.ts',
          vite: {
            build: {
              sourcemap: sourcemap ? 'inline' : undefined, // #332
              minify: isBuild,
              outDir: 'dist-electron/preload',
              rollupOptions: {
                external: Object.keys(
                  'dependencies' in pkg ? pkg.dependencies : {},
                ),
              },
            },
          },
        },
        // Polyfill the Electron and Node.js API for Renderer process.
        // If you want use Node.js in Renderer process,
        // the `nodeIntegration` needs to be enabled in the Main process.
        // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
        renderer: {},
      }),
    ],
    server: (() => {
      const url = new URL(process.env.VITE_DEV_SERVER_URL);
      return {
        host: url.hostname,
        port: +url.port,
      };
    })(),
    clearScreen: false,
  };
}) as UserConfigFnObject);
