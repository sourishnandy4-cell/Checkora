import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Users, Copy, X } from 'lucide-react';
import { useMultiplayerStore } from '../store/multiplayerStore';

export const MultiplayerModal: React.FC = () => {
  const navigate = useNavigate();
  const [joinCode, setJoinCode] = React.useState('');
  
  const { 
    peerId, 
    isConnected, 
    isConnecting, 
    hostGame, 
    joinGame, 
    disconnect, 
    showModal, 
    setShowModal 
  } = useMultiplayerStore();

  React.useEffect(() => {
    if (isConnected) {
      setShowModal(false);
      navigate('/play');
    }
  }, [isConnected, navigate, setShowModal]);

  if (!showModal) return null;

  const handleHost = async () => {
    await hostGame();
  };

  const handleJoin = async () => {
    if (!joinCode) return;
    const success = await joinGame(joinCode);
    if (!success) alert("Failed to connect to host. Check the code.");
  };

  return (
    <div className="fixed inset-0 bg-void/90 flex items-center justify-center z-50 p-4">
      <div className="bg-bg-surface border border-bg-border p-6 rounded-md max-w-sm w-full relative shadow-lg shadow-black/50 popover-reveal">
        <button
          onClick={() => {
            setShowModal(false);
            disconnect(); // stop hosting if we cancel
          }}
          className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors"
        >
          <X size={20} />
        </button>
        <h3 className="font-serif-header text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
          <Users size={20} className="text-accent-cyan" /> Multiplayer Lobby
        </h3>

        {!peerId && !isConnecting && (
          <div className="flex flex-col gap-4">
            <button
              onClick={handleHost}
              className="premium-btn w-full py-3 text-xs uppercase font-mono-clock"
            >
              Host Game
            </button>
            <div className="text-center text-xs text-text-muted font-mono-clock">OR</div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="ENTER CODE"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                className="flex-1 bg-void border border-bg-border text-text-primary p-3 rounded-sm text-center font-mono-clock uppercase outline-none focus:border-accent-cyan transition-colors"
              />
              <button
                onClick={handleJoin}
                disabled={!joinCode || isConnecting}
                className="premium-btn px-6 text-xs uppercase font-mono-clock disabled:opacity-50"
              >
                Join
              </button>
            </div>
          </div>
        )}

        {isConnecting && (
          <div className="text-center py-6">
            <div className="inline-block animate-spin text-accent-cyan mb-4"><Play size={24} /></div>
            <p className="text-xs font-mono-clock text-text-primary uppercase">Connecting to Peer...</p>
          </div>
        )}

        {peerId && !isConnected && !isConnecting && (
          <div className="text-center flex flex-col items-center">
            <p className="text-xs text-text-secondary mb-2">Share this code with your friend:</p>
            <div className="bg-void border border-bg-border py-3 px-6 rounded-sm flex items-center justify-center gap-4 w-full mb-6">
              <span className="font-mono-clock text-2xl tracking-[0.2em] font-bold text-text-primary">{peerId}</span>
              <button 
                onClick={() => navigator.clipboard.writeText(peerId)}
                className="text-text-muted hover:text-accent-primary transition-colors"
                title="Copy Code"
              >
                <Copy size={18} />
              </button>
            </div>
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan"></span>
              </span>
              Waiting for opponent to connect...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
