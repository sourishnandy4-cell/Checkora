import { create } from 'zustand';

export type ThemeId = 'mono' | 'forest' | 'ocean' | 'crimson' | 'aurora' | 'wooden' | 'walnut';
export type PieceSetId = 'classic' | 'neo' | 'alpha' | 'maya' | 'bases' | 'wooden-pieces';

interface SettingsState {
  theme: ThemeId;
  pieceSet: PieceSetId;
  showLegalMoves: boolean;
  showCoordinates: boolean;
  soundVolume: number;
  enableSound: boolean;
  confirmMoves: boolean;
  autoPromoteToQueen: boolean;
  boardFlipped: boolean;
  isVoiceEnabled: boolean;
  voiceGender: 'male' | 'female';
  enableAmbientSound: boolean;
  ambientVolume: number;

  // Auth State
  isLoggedIn: boolean;
  isGuest: boolean;
  playerName: string;
  playerEmail: string;
  playerAvatar: string;

  // Actions
  setTheme: (theme: ThemeId) => void;
  setPieceSet: (pieceSet: PieceSetId) => void;
  toggleLegalMoves: () => void;
  toggleCoordinates: () => void;
  setSoundVolume: (volume: number) => void;
  toggleSound: () => void;
  toggleConfirmMoves: () => void;
  toggleAutoPromote: () => void;
  toggleBoardFlipped: () => void;
  toggleVoiceEnabled: () => void;
  setVoiceGender: (gender: 'male' | 'female') => void;
  toggleAmbientSound: () => void;
  setAmbientVolume: (volume: number) => void;
  login: (name: string, isGuest: boolean, email?: string) => void;
  logout: () => void;
  setPlayerAvatar: (avatar: string) => void;
  setPlayerName: (name: string) => void;

  // Initialize
  initSettings: () => Promise<void>;
}

const getStoredVal = async (key: keyof SettingsState, defaultVal: any) => {
  // Electron store (allowlisted keys via preload/main)
  if (window.electronAPI?.store) {
    try {
      const val = await window.electronAPI.store.get(key as any);
      if (val !== undefined && val !== null) return val;
    } catch (e) {
      console.warn(`Failed to fetch key ${String(key)} from Electron Store:`, e);
    }
  }

  // Fallback (dev/non-electron)
  const localVal = localStorage.getItem(`checkora-${String(key)}`);
  if (localVal !== null) {
    try {
      return JSON.parse(localVal);
    } catch {
      return localVal;
    }
  }
  return defaultVal;
};

const setStoredVal = async (key: keyof SettingsState, val: any) => {
  if (window.electronAPI?.store) {
    try {
      await window.electronAPI.store.set(key as any, val);
      return;
    } catch (e) {
      console.warn(`Failed to save key ${String(key)} to Electron Store:`, e);
    }
  }
  localStorage.setItem(`checkora-${String(key)}`, JSON.stringify(val));
};

export const useSettingsStore = create<SettingsState>((set, get) => ({
  theme: 'mono',
  pieceSet: 'classic',
  showLegalMoves: true,
  showCoordinates: true,
  soundVolume: 75,
  enableSound: true,
  confirmMoves: false,
  autoPromoteToQueen: true,
  boardFlipped: false,
  isVoiceEnabled: true,
  voiceGender: 'female',
  enableAmbientSound: false,
  ambientVolume: 50,

  isLoggedIn: false,
  isGuest: false,
  playerName: 'Guest',
  playerEmail: '',
  playerAvatar: './avatars/preset_pawn.png',

  setTheme: async (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    set({ theme });
    await setStoredVal('theme', theme);
  },

  setPieceSet: async (pieceSet) => {
    set({ pieceSet });
    await setStoredVal('pieceSet', pieceSet);
  },

  toggleLegalMoves: async () => {
    const nextVal = !get().showLegalMoves;
    set({ showLegalMoves: nextVal });
    await setStoredVal('showLegalMoves', nextVal);
  },

  toggleCoordinates: async () => {
    const nextVal = !get().showCoordinates;
    set({ showCoordinates: nextVal });
    await setStoredVal('showCoordinates', nextVal);
  },

  setSoundVolume: async (soundVolume) => {
    set({ soundVolume });
    await setStoredVal('soundVolume', soundVolume);
  },

  toggleSound: async () => {
    const nextVal = !get().enableSound;
    set({ enableSound: nextVal });
    await setStoredVal('enableSound', nextVal);
  },

  toggleConfirmMoves: async () => {
    const nextVal = !get().confirmMoves;
    set({ confirmMoves: nextVal });
    await setStoredVal('confirmMoves', nextVal);
  },

  toggleAutoPromote: async () => {
    const nextVal = !get().autoPromoteToQueen;
    set({ autoPromoteToQueen: nextVal });
    await setStoredVal('autoPromoteToQueen', nextVal);
  },

  toggleBoardFlipped: async () => {
    const nextVal = !get().boardFlipped;
    set({ boardFlipped: nextVal });
    await setStoredVal('boardFlipped', nextVal);
  },

  toggleVoiceEnabled: async () => {
    const nextVal = !get().isVoiceEnabled;
    set({ isVoiceEnabled: nextVal });
    await setStoredVal('isVoiceEnabled', nextVal);
  },

  setVoiceGender: async (voiceGender) => {
    set({ voiceGender });
    await setStoredVal('voiceGender', voiceGender);
  },

  toggleAmbientSound: async () => {
    const nextVal = !get().enableAmbientSound;
    set({ enableAmbientSound: nextVal });
    await setStoredVal('enableAmbientSound', nextVal);
  },

  setAmbientVolume: async (ambientVolume) => {
    set({ ambientVolume });
    await setStoredVal('ambientVolume', ambientVolume);
  },

  login: async (name, isGuest, email = '') => {
    set({ isLoggedIn: true, isGuest, playerName: name, playerEmail: email });
    await setStoredVal('isLoggedIn', true);
    await setStoredVal('isGuest', isGuest);
    await setStoredVal('playerName', name);
    await setStoredVal('playerEmail', email);
  },

  logout: async () => {
    set({ isLoggedIn: false, isGuest: false, playerName: 'Guest', playerEmail: '', playerAvatar: './avatars/preset_pawn.png' });
    await setStoredVal('isLoggedIn', false);
    await setStoredVal('isGuest', false);
    await setStoredVal('playerName', 'Guest');
    await setStoredVal('playerEmail', '');
    await setStoredVal('playerAvatar', './avatars/preset_pawn.png');
  },

  setPlayerAvatar: async (avatar) => {
    set({ playerAvatar: avatar });
    await setStoredVal('playerAvatar', avatar);
  },

  setPlayerName: async (name) => {
    set({ playerName: name });
    await setStoredVal('playerName', name);
  },

  initSettings: async () => {
    const theme = await getStoredVal('theme', 'mono');
    const pieceSet = await getStoredVal('pieceSet', 'classic');
    const showLegalMoves = await getStoredVal('showLegalMoves', true);
    const showCoordinates = await getStoredVal('showCoordinates', true);
    const soundVolume = await getStoredVal('soundVolume', 75);
    const enableSound = await getStoredVal('enableSound', true);
    const confirmMoves = await getStoredVal('confirmMoves', false);
    const autoPromoteToQueen = await getStoredVal('autoPromoteToQueen', true);
    const boardFlipped = await getStoredVal('boardFlipped', false);
    const isVoiceEnabled = await getStoredVal('isVoiceEnabled', true);
    const voiceGender = await getStoredVal('voiceGender', 'female');
    const enableAmbientSound = await getStoredVal('enableAmbientSound', false);
    const ambientVolume = await getStoredVal('ambientVolume', 50);

    const isLoggedIn = await getStoredVal('isLoggedIn', false);
    const isGuest = await getStoredVal('isGuest', false);
    const playerName = await getStoredVal('playerName', 'Guest');
    const playerEmail = await getStoredVal('playerEmail', '');
    const playerAvatar = await getStoredVal('playerAvatar', './avatars/preset_pawn.png');

    document.documentElement.setAttribute('data-theme', theme);

    set({
      theme,
      pieceSet,
      showLegalMoves,
      showCoordinates,
      soundVolume,
      enableSound,
      confirmMoves,
      autoPromoteToQueen,
      boardFlipped,
      isVoiceEnabled,
      voiceGender,
      enableAmbientSound,
      ambientVolume,
      isLoggedIn,
      isGuest,
      playerName,
      playerEmail,
      playerAvatar,
    });
  }
}));
