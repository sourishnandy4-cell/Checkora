import { create } from 'zustand';
import Peer, { DataConnection } from 'peerjs';
import { useGameStore } from './gameStore';
import { useSettingsStore } from './settingsStore';

type MultiplayerMessageType = 'move' | 'chat' | 'resign' | 'draw_offer' | 'draw_accept' | 'draw_decline' | 'ping' | 'identity' | 'play_again_request' | 'play_again_accept' | 'play_again_decline';

interface MultiplayerMessage {
  type: MultiplayerMessageType;
  payload?: any;
}

interface MultiplayerState {
  peer: Peer | null;
  connection: DataConnection | null;
  peerId: string | null;
  isHost: boolean;
  isConnected: boolean;
  isConnecting: boolean;
  remotePlayerName: string;
  remotePlayerAvatar: string;
  playAgainReceived: boolean;
  playAgainSent: boolean;
  initPeer: () => void;
  hostGame: () => Promise<string>;
  joinGame: (hostId: string) => Promise<boolean>;
  sendMessage: (msg: MultiplayerMessage) => void;
  disconnect: () => void;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

const SQUARE_RE = /^[a-h][1-8]$/;
const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null;

function normalizeAndValidateIncoming(raw: unknown): MultiplayerMessage | null {
  if (!isRecord(raw)) return null;
  const type = raw.type as unknown;

  const allowedTypes: Set<string> = new Set([
    'move',
    'chat',
    'resign',
    'draw_offer',
    'draw_accept',
    'draw_decline',
    'ping',
    'identity',
    'play_again_request',
    'play_again_accept',
    'play_again_decline'
  ]);

  if (typeof type !== 'string' || !allowedTypes.has(type)) return null;

  const msg: MultiplayerMessage = { type: type as MultiplayerMessageType };

  const payload = (raw as any).payload;
  if (payload === undefined) return msg;

  switch (msg.type) {
    case 'move': {
      if (!isRecord(payload)) return null;
      const from = payload.from;
      const to = payload.to;
      const promotion = payload.promotion;

      if (typeof from !== 'string' || typeof to !== 'string') return null;
      if (!SQUARE_RE.test(from) || !SQUARE_RE.test(to)) return null;

      // promotion is optional; if present, must be one of common PGN promotion codes
      if (promotion !== undefined) {
        if (typeof promotion !== 'string') return null;
        const ok = ['q', 'r', 'b', 'n', 'Q', 'R', 'B', 'N'].includes(promotion);
        if (!ok) return null;
      }

      msg.payload = { from, to, promotion };
      return msg;
    }

    case 'chat': {
      if (!isRecord(payload)) return null;
      const text = payload.text;
      if (typeof text !== 'string') return null;

      // Basic sanity: avoid huge payload spam
      if (text.length > 500) return null;

      msg.payload = { text };
      return msg;
    }

    case 'resign':
    case 'draw_offer':
    case 'draw_accept':
    case 'draw_decline':
    case 'ping':
    case 'play_again_request':
    case 'play_again_accept':
    case 'play_again_decline':
      // these are control messages; payload must be absent or a harmless object
      if (payload !== undefined && !isRecord(payload)) return null;
      msg.payload = payload;
      return msg;

    case 'identity': {
      if (!isRecord(payload)) return null;
      const name = payload.name;
      const avatar = payload.avatar;
      if (typeof name !== 'string' || name.length > 50) return null;
      if (avatar !== undefined && typeof avatar !== 'string') return null;
      msg.payload = { name, avatar: avatar || '👤' };
      return msg;
    }

    default:
      return null;
  }
}

function handleIncomingMessage(data: MultiplayerMessage) {
  const gameStore = useGameStore.getState();

  switch (data.type) {
    case 'move': {
      if (!gameStore.isGameActive || gameStore.gameResult) return;
      const payload = data.payload as any;
      if (!payload) return;
      gameStore.makeMove(payload.from, payload.to, payload.promotion, true);
      return;
    }

    case 'chat': {
      const payload = data.payload as any;
      if (!payload || typeof payload.text !== 'string') return;

      // Store as plain text (React will escape)
      gameStore.sendChatMessage('Opponent', payload.text);
      return;
    }

    case 'resign': {
      // Opponent resigned: they lose, local player wins — don't call resignGame()
      const gs = useGameStore.getState();
      if (!gs.isGameActive || gs.gameResult) return;

      // The LOCAL player wins: if we are white → result is 'w'; if black → 'b'
      const localWinResult = gs.playerColor === 'white' ? 'w' : 'b';
      gs.sendChatMessage('System', 'Opponent resigned. You win!');

      useGameStore.setState({
        isGameActive: false,
        gameResult: localWinResult,
        gameOverReason: 'resignation'
      });
      return;
    }

    case 'draw_offer': {
      if (!gameStore.isGameActive || gameStore.gameResult) return;
      gameStore.sendChatMessage('System', 'Opponent offered a draw.');
      gameStore.setDrawOfferReceived(true);
      return;
    }

    case 'draw_accept': {
      if (!gameStore.isGameActive || gameStore.gameResult) return;
      // Accept only if an offer was received
      if (!gameStore.drawOfferReceived) return;
      gameStore.sendChatMessage('System', 'Opponent accepted the draw offer.');
      gameStore.acceptDraw();
      return;
    }

    case 'draw_decline': {
      if (!gameStore.isGameActive || gameStore.gameResult) return;
      gameStore.sendChatMessage('System', 'Opponent declined the draw offer.');
      gameStore.setDrawOfferReceived(false);
      return;
    }

    case 'ping':
      // keeping connection alive
      return;

    case 'identity': {
      const payload = data.payload as any;
      if (!payload || typeof payload.name !== 'string') return;
      useMultiplayerStore.setState({
        remotePlayerName: payload.name,
        remotePlayerAvatar: payload.avatar || '👤'
      });
      return;
    }

    case 'play_again_request': {
      const gs = useGameStore.getState();
      gs.sendChatMessage('System', 'Opponent wants a rematch! Accept or decline below.');
      useMultiplayerStore.setState({ playAgainReceived: true });
      return;
    }

    case 'play_again_accept': {
      useMultiplayerStore.setState({ playAgainSent: false, playAgainReceived: false });
      const gs = useGameStore.getState();
      const tc = (gs.timeControl as any) || '10+0';
      // Swap colors: requester keeps their color preference, accepter gets the opposite
      const newColor = gs.playerColor === 'white' ? 'black' : 'white';
      gs.startNewGame(null, tc, newColor, undefined, undefined, undefined, 'multiplayer');
      gs.sendChatMessage('System', 'Rematch started! Good luck!');
      return;
    }

    case 'play_again_decline': {
      useMultiplayerStore.setState({ playAgainSent: false });
      const gs = useGameStore.getState();
      gs.sendChatMessage('System', 'Opponent declined the rematch.');
      return;
    }
  }
}

export const useMultiplayerStore = create<MultiplayerState>((set, get) => ({
  peer: null,
  connection: null,
  peerId: null,
  isHost: false,
  isConnected: false,
  isConnecting: false,
  showModal: false,
  remotePlayerName: '',
  remotePlayerAvatar: '👤',
  playAgainReceived: false,
  playAgainSent: false,

  setShowModal: (show) => set({ showModal: show }),

  initPeer: () => {
    if (get().peer) return; // already initialized

    // Generate a random 5-6 digit alphanumeric ID for easy sharing
    const id = Math.random().toString(36).substring(2, 8).toUpperCase();
    const peer = new Peer(id);

    peer.on('open', (id) => {
      set({ peer, peerId: id });
    });

    peer.on('connection', (conn) => {
      // Incoming connection (we are the host)
      conn.on('open', () => {
        set({ connection: conn, isConnected: true, isHost: true });

        // Send our identity to the joiner
        const { playerName, playerAvatar } = useSettingsStore.getState();
        conn.send({ type: 'identity', payload: { name: playerName, avatar: playerAvatar || '👤' } });

        // Host starts as White; time control is whatever the host selected in the UI.
        // Use the current gameStore timeControl so it honours the host's picker choice.
        const tc = (useGameStore.getState().timeControl as any) || '10+0';
        useGameStore.getState().startNewGame(null, tc, 'white', undefined, undefined, undefined, 'multiplayer');
      });

      conn.on('data', (data: any) => {
        const msg = normalizeAndValidateIncoming(data);
        if (msg) handleIncomingMessage(msg);
      });

      conn.on('close', () => {
        set({ isConnected: false, connection: null });
        useGameStore.getState().sendChatMessage('System', 'Opponent disconnected.');
      });
    });

    peer.on('error', (err) => {
      console.error('PeerJS error:', err);
      set({ isConnecting: false });
    });
  },

  hostGame: async () => {
    const { peerId, peer, initPeer } = get();
    if (!peer || !peerId) {
      initPeer();
      // wait a bit for open
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    return get().peerId || '';
  },

  joinGame: async (hostId: string) => {
    const { peer, initPeer } = get();

    if (!peer) {
      initPeer();
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    const currentPeer = get().peer;
    if (!currentPeer) return false;

    set({ isConnecting: true });

    return new Promise((resolve) => {
      const conn = currentPeer.connect(hostId.toUpperCase());

      conn.on('open', () => {
        set({ connection: conn, isConnected: true, isHost: false, isConnecting: false });

        // Send our identity to the host
        const { playerName, playerAvatar } = useSettingsStore.getState();
        conn.send({ type: 'identity', payload: { name: playerName, avatar: playerAvatar || '👤' } });

        // Joiner is Black; use same time control as host (already set by host's startNewGame)
        const tc = (useGameStore.getState().timeControl as any) || '10+0';
        useGameStore.getState().startNewGame(null, tc, 'black', undefined, undefined, undefined, 'multiplayer');

        conn.on('data', (data: any) => {
          const msg = normalizeAndValidateIncoming(data);
          if (msg) handleIncomingMessage(msg);
        });

        conn.on('close', () => {
          set({ isConnected: false, connection: null });
          useGameStore.getState().sendChatMessage('System', 'Host disconnected.');
        });

        resolve(true);
      });

      conn.on('error', () => {
        set({ isConnecting: false });
        resolve(false);
      });
    });
  },

  sendMessage: (msg: MultiplayerMessage) => {
    const { connection } = get();
    if (connection && connection.open) {
      connection.send(msg);
    }
  },

  disconnect: () => {
    const { connection, peer } = get();
    if (connection) connection.close();
    if (peer) peer.destroy();
    set({ connection: null, peer: null, peerId: null, isConnected: false, isHost: false, remotePlayerName: '', remotePlayerAvatar: '👤', playAgainReceived: false, playAgainSent: false });
  }
}));
