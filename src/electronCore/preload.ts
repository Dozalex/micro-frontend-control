import { contextBridge, ipcRenderer, MessageBoxOptions } from 'electron';

import { ACTION } from './constants';

export interface ElectronAPI {
  openFolderDialog: () => Promise<string[]>;
  showAlert: (options: MessageBoxOptions) => Promise<string[]>;
  getFileContent: (path: string) => Promise<string>;
  changeFileContent: (path: string, content: string) => Promise<string>;
  getChildFolderNames: (path: string) => Promise<string[]>;
  runCommand: (options: { path: string; command: string }) => Promise<string>;
}

// Set up a preload script to expose the IPC methods to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  openFolderDialog: () => ipcRenderer.invoke(ACTION.openFolderDialog),
  showAlert: (options: MessageBoxOptions) =>
    ipcRenderer.invoke(ACTION.showAlert, options),
  getFileContent: (path: string) =>
    ipcRenderer.invoke(ACTION.getFileContent, path),
  getChildFolderNames: (path: string) =>
    ipcRenderer.invoke(ACTION.getChildFolderNames, path),
  changeFileContent: (path: string, content: string) =>
    ipcRenderer.invoke(ACTION.changeFileContent, path, content),
  runCommand: (options: { path: string; command: string }) =>
    ipcRenderer.invoke(ACTION.runCommand, options),
});
