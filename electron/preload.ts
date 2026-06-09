import { contextBridge, ipcRenderer } from 'electron';

type SettingsKey =
  | 'theme'
  | 'pieceSet'
  | 'showLegalMoves'
  | 'showCoordinates'
  | 'soundVolume'
  | 'enableSound'
  | 'confirmMoves'
  | 'autoPromoteToQueen'
  | 'boardFlipped'
  | 'isVoiceEnabled'
  | 'voiceGender'
  | 'enableAmbientSound'
  | 'ambientVolume'
  | 'isLoggedIn'
  | 'isGuest'
  | 'playerName'
  | 'playerEmail'
  | 'playerAvatar';

type SettingsValue = any;

/**
 * Expose safe, structured APIs to the React renderer.
 * Important: no generic arbitrary key-value persistence.
 */
contextBridge.exposeInMainWorld('electronAPI', {
  windowControls: {
    minimize: () => ipcRenderer.send('window-minimize'),
    maximize: () => ipcRenderer.send('window-maximize'),
    close: () => ipcRenderer.send('window-close')
  },
  store: {
    get: (key: SettingsKey) => ipcRenderer.invoke('settings-get', key),
    set: (key: SettingsKey, value: SettingsValue) => ipcRenderer.invoke('settings-set', key, value),
    delete: (key: SettingsKey) => ipcRenderer.invoke('settings-delete', key)
  }
});
