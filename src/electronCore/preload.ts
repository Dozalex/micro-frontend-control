import {
  contextBridge,
  ipcRenderer,
  MessageBoxOptions,
  OpenDialogOptions,
} from 'electron';

import { ACTION } from './constants';
import { RunCommandOptions } from './types';

export interface ElectronAPI {
  getProcessPlatform: () => string;
  openFolderDialog: () => Promise<string[]>;
  openFileDialog: (options?: OpenDialogOptions) => Promise<string[]>;
  showAlert: (options: MessageBoxOptions) => Promise<string[]>;
  readFile: (path: string) => Promise<string>;
  writeFile: (path: string, content: string) => Promise<string>;
  deleteFile: (path: string) => Promise<string>;
  getChildFolderNames: (path: string) => Promise<string[]>;
  runCommand: (options: RunCommandOptions) => Promise<string>;
  getUserDataPath: () => Promise<string>;
}

// Set up a preload script to expose the IPC methods to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  getProcessPlatform: () => ipcRenderer.invoke(ACTION.getProcessPlatform),
  openFolderDialog: () => ipcRenderer.invoke(ACTION.openFolderDialog),
  openFileDialog: (options?: OpenDialogOptions) =>
    ipcRenderer.invoke(ACTION.openFileDialog, options),
  showAlert: (options: MessageBoxOptions) =>
    ipcRenderer.invoke(ACTION.showAlert, options),
  readFile: (path: string) => ipcRenderer.invoke(ACTION.readFile, path),
  writeFile: (path: string, content: string) =>
    ipcRenderer.invoke(ACTION.writeFile, path, content),
  deleteFile: (path: string) => ipcRenderer.invoke(ACTION.deleteFile, path),
  getChildFolderNames: (path: string) =>
    ipcRenderer.invoke(ACTION.getChildFolderNames, path),
  runCommand: (options: RunCommandOptions) =>
    ipcRenderer.invoke(ACTION.runCommand, options),
  getUserDataPath: () => ipcRenderer.invoke(ACTION.getUserDataPath),
});
