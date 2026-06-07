import fs from 'fs';

const filePath = 'c:/Projects/Checkora/src/pages/Play.tsx';
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Inject state
const stateInjection = `
  // Local Move Confirmation states
  const [pendingMove, setPendingMove] = useState<{ from: string; to: string; promotion?: string; fen: string } | null>(null);

  // Custom Bots & Antigravity
  const [customBots, setCustomBots] = useState<any[]>([]);
  const [showAntigravityModal, setShowAntigravityModal] = useState(false);
  const [antigravityEval, setAntigravityEval] = useState<{elo: number, style: string[], bio: string, name: string} | null>(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('checkora_custom_bots');
    if (stored) {
      try { setCustomBots(JSON.parse(stored)); } catch (e) {}
    }
  }, []);

  useEffect(() => {
    if (gameResult && activeBot?.id === 'antigravity') {
      setTimeout(() => {
        const history = chess.history({ verbose: true });
        const movesCount = history.length;
        
        let estElo = 600;
        if (gameResult === 'd') estElo = 2400;
        else if (gameResult === 'w' && playerColor === 'white') estElo = 2800;
        else if (gameResult === 'b' && playerColor === 'black') estElo = 2800;
        else {
          estElo = Math.min(2200, 400 + Math.floor(movesCount * 28.5));
        }
        
        let styleStr = 'Aggressive';
        let style = ['Aggressive', 'Tactical'];
        if (movesCount > 40) { styleStr = 'Positional'; style = ['Positional', 'Solid']; }
        else if (movesCount > 25) { styleStr = 'Classical'; style = ['Classical', 'Tactical']; }

        setAntigravityEval({
          elo: estElo,
          style,
          bio: \`Evaluated by Antigravity AI. A \${styleStr.toLowerCase()} player with an estimated strength of \${estElo} ELO.\`,
          name: ''
        });
        setShowAntigravityModal(true);
      }, 2000);
    }
  }, [gameResult, activeBot, chess, playerColor]);

  const saveCustomBot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !antigravityEval) return;
    
    let sl = 0;
    const elo = antigravityEval.elo;
    if (elo >= 2500) sl = 20;
    else if (elo >= 2000) sl = 15;
    else if (elo >= 1500) sl = 10;
    else if (elo >= 1000) sl = 5;
    else sl = 2;

    const newBot = {
      id: 'custom-' + Date.now(),
      name: userName.trim(),
      avatar: '👤',
      elo: elo,
      skillLevel: sl,
      uciElo: elo,
      tier: 'Casual',
      style: antigravityEval.style as any,
      bio: antigravityEval.bio,
      quote: "I am ready.",
      favoriteOpening: "Unknown",
      weaknesses: "Unknown",
      recommendedTime: "10+0",
      accentColor: "#818CF8",
      chatPools: {
        win: ["A logical outcome.", "Good game."],
        lose: ["I have much to learn.", "Well played."],
        capture: ["A necessary trade.", "Taking that piece."],
        blunder: ["An oversight...", "Oops."]
      }
    };

    const newBots = [...customBots, newBot];
    setCustomBots(newBots);
    localStorage.setItem('checkora_custom_bots', JSON.stringify(newBots));
    setShowAntigravityModal(false);
  };
`;

content = content.replace(
  "  // Local Move Confirmation states\n  const [pendingMove, setPendingMove] = useState<{ from: string; to: string; promotion?: string; fen: string } | null>(null);",
  stateInjection
);

// 2. Replace BOTS.filter
content = content.replace(
  "const filteredBots = BOTS.filter(bot => {",
  `const allBots = [...BOTS, ...customBots];
  const filteredBots = allBots.filter(bot => {`
);

// 3. Inject Modal at the end
const modalInjection = `
      {/* ANTIGRAVITY EVALUATION MODAL */}
      {showAntigravityModal && antigravityEval && (
        <div className="fixed inset-0 bg-void/85 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
          <div className="bg-bg-surface border border-bg-border p-6 rounded-md max-w-md w-full shadow-2xl relative">
            <div className="text-center mb-6">
              <span className="text-4xl mb-2 block">🌌</span>
              <h2 className="font-serif-header text-2xl font-bold text-accent-cyan">Evaluation Complete</h2>
              <p className="text-xs text-text-secondary mt-2">I have analyzed your game and calculated your profile.</p>
            </div>

            <div className="bg-bg-void border border-bg-border p-4 rounded-sm mb-6 flex flex-col gap-3">
              <div className="flex justify-between items-center border-b border-bg-border/50 pb-2">
                <span className="text-[10px] font-mono-clock uppercase text-text-muted">Estimated ELO</span>
                <span className="text-lg font-bold text-accent-amber">{antigravityEval.elo}</span>
              </div>
              <div className="flex justify-between items-center border-b border-bg-border/50 pb-2">
                <span className="text-[10px] font-mono-clock uppercase text-text-muted">Playstyle</span>
                <span className="text-xs font-semibold">{antigravityEval.style.join(', ')}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono-clock uppercase text-text-muted block mb-1">Generated Bio</span>
                <p className="text-xs text-text-secondary italic">"{antigravityEval.bio}"</p>
              </div>
            </div>

            <form onSubmit={saveCustomBot} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-mono-clock text-text-muted uppercase tracking-wider block mb-2">Name Your Bot</label>
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. Hikaru Fan 99"
                  className="w-full px-4 py-2 bg-bg-void border border-bg-border focus:border-accent-cyan focus:outline-none rounded-sm text-sm transition-all"
                />
              </div>
              
              <button
                type="submit"
                className="premium-btn py-3 text-xs uppercase font-mono-clock bg-accent-cyan/10 border border-accent-cyan text-accent-cyan hover:bg-accent-cyan hover:text-bg-void transition-all"
              >
                Save to Casual Tier
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};`;

content = content.replace(
  "    </div>\n  );\n};",
  modalInjection
);

fs.writeFileSync(filePath, content);
console.log('Play.tsx updated!');
