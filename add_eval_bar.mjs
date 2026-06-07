import fs from 'fs';

const playPath = 'c:/Projects/Checkora/src/pages/Play.tsx';
let content = fs.readFileSync(playPath, 'utf-8');

// 1. Add useNavigate and EngineEvaluation imports
if (!content.includes('useNavigate')) {
  content = content.replace(
    "import { useGameStore, TimeControl, getTcCategory } from '../store/gameStore';",
    "import { useNavigate } from 'react-router-dom';\nimport { useGameStore, TimeControl, getTcCategory } from '../store/gameStore';"
  );
}
if (!content.includes('EngineEvaluation')) {
  content = content.replace(
    "import { StockfishEngine } from '../engine/stockfish';",
    "import { StockfishEngine, EngineEvaluation } from '../engine/stockfish';"
  );
}

// 2. Add useNavigate hook and Eval state inside Play component
if (!content.includes('const navigate = useNavigate();')) {
  content = content.replace(
    "export const Play: React.FC = () => {",
    "export const Play: React.FC = () => {\n  const navigate = useNavigate();"
  );
}

// 3. Inject Eval states and effects
const evalStatesStr = `
  // Engine evaluation states for the real-time Eval Bar
  const evalEngineRef = useRef<StockfishEngine | null>(null);
  const [evalData, setEvalData] = useState<EngineEvaluation>({ depth: 0, score: 0 });

  useEffect(() => {
    evalEngineRef.current = new StockfishEngine();
    return () => {
      if (evalEngineRef.current) evalEngineRef.current.terminate();
    };
  }, []);

  useEffect(() => {
    if (!isGameActive || !evalEngineRef.current) return;
    evalEngineRef.current.stop();
    evalEngineRef.current.evaluatePosition(fen, 14, (evaluation) => {
      setEvalData(evaluation);
    });
  }, [fen, isGameActive]);

  const getEvalBarPercentage = () => {
    if (evalData.mateIn) {
      return evalData.mateIn > 0 ? 100 : 0;
    }
    const score = evalData.score;
    const percentage = 50 + (score * 10);
    return Math.min(100, Math.max(0, percentage));
  };
  const whitePercent = getEvalBarPercentage();
  const formatEvalText = () => {
    if (evalData.mateIn) {
      return \`M\${Math.abs(evalData.mateIn)}\`;
    }
    const val = evalData.score;
    return val >= 0 ? \`+\${val.toFixed(1)}\` : val.toFixed(1);
  };
`;

if (!content.includes('const evalEngineRef = useRef')) {
  content = content.replace(
    "  const botThinkingRef = useRef(false);",
    "  const botThinkingRef = useRef(false);\n" + evalStatesStr
  );
}

// 4. Wrap board in Flex layout and add Eval Bar
const evalBarJSX = `
            {/* EVAL BAR + BOARD WRAPPER */}
            <div className="flex w-full gap-2 lg:gap-4 relative">
              {/* EVAL BAR */}
              <div className="w-4 lg:w-6 rounded-sm bg-bg-surface border border-bg-border relative flex flex-col items-center justify-center select-none shrink-0 overflow-hidden shadow-xl hidden md:flex">
                <div className="absolute inset-0 bg-zinc-900" />
                <div 
                  style={{ height: \`\${whitePercent}%\` }}
                  className="absolute bottom-0 left-0 right-0 bg-zinc-100 transition-all duration-500 ease-out" 
                />
                <span className="z-10 font-mono-clock text-[9px] font-bold px-1 py-0.5 rounded-sm mix-blend-difference text-white absolute top-2">
                  {formatEvalText()}
                </span>
              </div>
              
              {/* INTERACTIVE CHESS BOARD */}
              <div ref={boardContainerRef} data-pieces={pieceSet} className="flex-1 aspect-square border-4 border-bg-border bg-bg-void rounded-sm shadow-2xl relative">
`;

if (!content.includes('EVAL BAR')) {
  content = content.replace(
    "{/* INTERACTIVE CHESS BOARD */}\n            <div ref={boardContainerRef} className=\"w-full aspect-square border-4 border-bg-border bg-bg-void rounded-sm shadow-2xl relative\">",
    evalBarJSX
  );
  content = content.replace(
    "{/* INTERACTIVE CHESS BOARD */}\r\n            <div ref={boardContainerRef} className=\"w-full aspect-square border-4 border-bg-border bg-bg-void rounded-sm shadow-2xl relative\">",
    evalBarJSX
  );

  content = content.replace(
    "              />\n            </div>\n\n            {/* OPPONENT BAR (BOTTOM) */}",
    "              />\n              </div>\n            </div>\n\n            {/* OPPONENT BAR (BOTTOM) */}"
  );
  content = content.replace(
    "              />\r\n            </div>\r\n\r\n            {/* OPPONENT BAR (BOTTOM) */}",
    "              />\r\n              </div>\r\n            </div>\r\n\r\n            {/* OPPONENT BAR (BOTTOM) */}"
  );
}

// 5. Add "Review Game" button to the Game Over Modal
const reviewBtnJSX = `
            <button
              onClick={() => {
                useGameStore.getState().resetAll();
              }}
              className="w-full premium-btn border-bg-border text-xs py-2 uppercase font-mono-clock"
            >
              Play Again
            </button>
            <button
              onClick={() => {
                const currentPgn = chess.pgn();
                useGameStore.getState().loadPGN(currentPgn);
                navigate('/analysis');
              }}
              className="w-full premium-btn border-bg-border text-xs py-2 uppercase font-mono-clock mt-2 bg-bg-surface hover:text-accent-cyan transition-colors"
            >
              Review Game
            </button>
`;

if (!content.includes('Review Game')) {
  content = content.replace(
    /<button[\s\S]*?onClick=\{\(\) => \{\s*useGameStore\.getState\(\)\.resetAll\(\);\s*\}\}[\s\S]*?className="w-full premium-btn border-bg-border text-xs py-2 uppercase font-mono-clock"[\s\S]*?>\s*Play Again\s*<\/button>/,
    reviewBtnJSX
  );
}

fs.writeFileSync(playPath, content);
console.log('Eval bar and Review Game button injected successfully!');
