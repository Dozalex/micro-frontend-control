import type { ElectronAPI } from 'electronCore/preload';

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
