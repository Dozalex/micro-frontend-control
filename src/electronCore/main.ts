import {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  dialog,
  MessageBoxOptions,
} from 'electron';
import fixPath from 'fix-path';
import { exec } from 'node:child_process';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { ACTION } from './constants';

fixPath();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬ dist-electron
// │ ├──  main.js    > Electron-Main
// │ └── preload.js  > Electron-Preload
// ├─┬ dist
// │ └── index.html  > Electron-Renderer
//
const APP_ROOT = path.join(__dirname, '../..');

const { VITE_DEV_SERVER_URL } = process.env;

const RENDERER_DIST = path.join(APP_ROOT, 'dist');

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

let mainWindow: BrowserWindow | null = null;
const preload = path.join(__dirname, '../preload/preload.mjs');
const indexHtml = path.join(RENDERER_DIST, 'index.html');

async function createWindow() {
  mainWindow = new BrowserWindow({
    title: 'Micro-frontend control',
    width: 1200,
    height: 900,
    webPreferences: {
      preload,
    },
  });

  if (VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL);
    // Open devTool if the app is not packaged
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(indexHtml);
  }

  // Test actively push message to the Electron-Renderer
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow?.webContents.send(
      'main-process-message',
      new Date().toLocaleString(),
    );
  });

  // Make all links open with the browser, not with the application
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  mainWindow = null;
  if (process.platform !== 'darwin') app.quit();
});

app.on('second-instance', () => {
  if (mainWindow) {
    // Focus on the main window if the user tried to open another
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

/* ipc actions */

ipcMain.handle(ACTION.openFolderDialog, async () => {
  if (!mainWindow) return new Error('no window');

  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory'],
  });

  return result.filePaths;
});

ipcMain.handle(ACTION.showAlert, (_event, options: MessageBoxOptions) => {
  if (!mainWindow) return new Error('no window');

  return dialog.showMessageBox(mainWindow, options);
});

ipcMain.handle(ACTION.readFile, async (_event, path: string) => {
  try {
    return await fs.readFile(path, 'utf8');
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
});

ipcMain.handle(
  ACTION.writeFile,
  async (_event, path: string, content: string) => {
    try {
      return await fs.writeFile(path, content, 'utf8');
    } catch (error) {
      console.error('Error writing file:', error);
      throw error;
    }
  },
);

ipcMain.handle(ACTION.deleteFile, async (_event, path: string) => {
  try {
    await fs.unlink(path);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
});

ipcMain.handle(ACTION.getChildFolderNames, async (_event, path: string) => {
  try {
    const files = await fs.readdir(path, { withFileTypes: true });
    return files.filter(file => file.isDirectory()).map(folder => folder.name);
  } catch (error) {
    console.error('Error reading directory:', error);
    throw error;
  }
});

ipcMain.handle(
  ACTION.runCommand,
  async (
    _event,
    {
      path,
      command,
    }: {
      path: string;
      command: string;
    },
  ) =>
    new Promise((resolve, reject) => {
      exec(command, { cwd: path }, (error, stdout, stderr) => {
        if (error) {
          console.error('error', error);

          reject(new Error(`Command failed: ${command}\n${stderr}`));
          return;
        }

        console.info(`Command succeeded: ${command}\n${stdout}`);

        resolve(stdout);
      });
    }),
);

ipcMain.handle(ACTION.getUserDataPath, () => app.getPath('userData'));
