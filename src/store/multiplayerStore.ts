import { create } from 'zustand';
import Peer, { DataConnection } from 'peerjs';
import { useGameStore } from './gameStore';

interface MultiplayerMessage {
  type: 'move' | 'chat' | 'resign' | 'draw_offer' | 'draw_accept' | 'draw_decline' | 'ping';
  payload?: any;
}

interface MultiplayerState {
  peer: Peer | null;
  connection: DataConnection | null;
  peerId: string | null;
  isHost: boolean;
  isConnected: boolean;
  isConnecting: boolean;
  initPeer: () => void;
  hostGame: () => Promise<string>;
  joinGame: (hostId: string) => Promise<boolean>;
  sendMessage: (msg: MultiplayerMessage) => void;
  disconnect: () => void;
}

function handleIncomingMessage(data: MultiplayerMessage) {
  const gameStore = useGameStore.getState();

  switch(data.type) {
    case 'move':
      gameStore.makeMove(data.payload.from, data.payload.to, data.payload.promotion, true);
      break;
    case 'chat':
      gameStore.sendChatMessage('Opponent', data.payload.text);
      break;
    case 'resign':
      gameStore.resignGame(); // Ensure resign logic handles opponent resignation
      break;
    case 'draw_offer':
      gameStore.sendChatMessage('System', 'Opponent offered a draw.');
      // Currently auto-accepted or handled manually. Let's just log it.
      break;
    case 'ping':
      // keeping connection alive
      break;
  }
}

export const useMultiplayerStore = create<MultiplayerState>((set, get) => ({
  peer: null,
  connection: null,
  peerId: null,
  isHost: false,
  isConnected: false,
  isConnecting: false,

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
        
        // Host has connected! Automatically start the game in multiplayer mode as White
        useGameStore.getState().startNewGame(null, '10+0', 'white', undefined, undefined, undefined, 'multiplayer');
      });

      conn.on('data', (data: any) => {
        handleIncomingMessage(data);
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
        
        // Joiner starts as Black
        useGameStore.getState().startNewGame(null, '10+0', 'black', undefined, undefined, undefined, 'multiplayer');

        conn.on('data', (data: any) => {
          handleIncomingMessage(data);
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
    set({ connection: null, peer: null, peerId: null, isConnected: false, isHost: false });
  }
}));
