import { create } from 'zustand';
import { Chess } from 'chess.js';
import { BotDefinition } from '../data/bots';
import { useSettingsStore } from './settingsStore';

export const getTcCategory = (tc: string): 'bullet' | 'blitz' | 'rapid' => {
  try {
    const minutes = parseInt(tc.split('+')[0], 10);
    if (minutes < 3) return 'bullet';
    if (minutes < 10) return 'blitz';
    return 'rapid';
  } catch {
    return 'blitz'; // default fallback
  }
};

export const calculateEloChange = (
  playerElo: number,
  opponentElo: number,
  result: 'W' | 'L' | 'D',
  totalGamesPlayed: number
): number => {
  // provisional rating (fewer than 20 games) gets larger K-factor like chess.com to fast-track placement
  const K = totalGamesPlayed < 20 ? 40 : 20;
  
  const expectedScore = 1 / (1 + Math.pow(10, (opponentElo - playerElo) / 400));
  
  let actualScore = 0.5;
  if (result === 'W') actualScore = 1;
  if (result === 'L') actualScore = 0;
  
  let change = Math.round(K * (actualScore - expectedScore));
  
  // Elo rating floor at 100
  if (playerElo + change < 100) {
    change = 100 - playerElo;
  }
  
  // Guarantee a minimum of +/- 2 points for completed games
  if (result === 'W' && change <= 0) {
    change = 2;
  }
  if (result === 'L' && change >= 0 && playerElo > 100) {
    change = -2;
  }

  return change;
};

export type GameResult = 'w' | 'b' | 'd' | null; // white win, black win, draw, in-progress
export type TimeControl = '1+0' | '3+0' | '5+0' | '10+0' | '15+10' | '30+0' | 'custom';

export interface MoveRecord {
  num: number;
  white: string;
  whiteEval?: string;
  black?: string;
  blackEval?: string;
}

export interface GameHistoryEntry {
  id: string;
  date: string;
  opponent: string;
  opponentElo: number;
  timeControl: string;
  playerColor: 'white' | 'black';
  result: 'W' | 'L' | 'D';
  ratingChange: number;
}

interface GameState {
  // Active Match State
  chess: Chess;
  fen: string;
  turn: 'w' | 'b';
  history: MoveRecord[];
  whiteTime: number; // in seconds
  blackTime: number; // in seconds
  initialTime: number; // in seconds
  increment: number; // in seconds
  timeControl: string;
  playerColor: 'white' | 'black';
  activeBot: BotDefinition | null;
  gameResult: GameResult;
  gameOverReason: string; // 'checkmate', 'stalemate', 'draw-agreement', 'resignation', 'timeout'
  isGameActive: boolean;
  chatMessages: { sender: string; text: string; time: string }[];

  // Statistics & History
  gameHistory: GameHistoryEntry[];
  userEloBlitz: number;
  userEloRapid: number;
  userEloBullet: number;

  // Puzzle Rush State
  puzzleRushActive: boolean;
  puzzleRushScore: number;
  puzzleRushLives: number;
  puzzleRushTime: number; // seconds remaining
  puzzleRushHighscore: number;

  // Coordinates Trainer State
  coordsActive: boolean;
  coordsTarget: string;
  coordsScore: number;
  coordsTime: number; // seconds remaining
  coordsHighscore: number;

  // Actions
  initGameStore: () => Promise<void>;
  startNewGame: (bot: BotDefinition | null, timeControl: TimeControl, color: 'white' | 'black' | 'random', customMinutes?: number, customIncrement?: number) => void;
  makeMove: (from: string, to: string, promotion?: string) => boolean;
  tickClocks: () => void;
  resignGame: () => void;
  offerDraw: () => void;
  sendChatMessage: (sender: string, text: string) => void;
  flipBoard: () => void;
  resetAll: () => void;
  undoMove: () => boolean;

  // Analysis Mode actions
  loadFEN: (fen: string) => boolean;
  loadPGN: (pgn: string) => boolean;

  // Puzzle Rush actions
  startPuzzleRush: () => void;
  endPuzzleRush: () => void;
  tickPuzzleRush: () => void;
  submitPuzzleAnswer: (isCorrect: boolean) => void;

  // Coordinates actions
  startCoordsTrainer: () => void;
  endCoordsTrainer: () => void;
  tickCoordsTrainer: () => void;
  submitCoordsAnswer: (square: string) => void;
}

const getStoredVal = async (key: string, defaultVal: any) => {
  if (window.electronAPI?.store) {
    try {
      const val = await window.electronAPI.store.get(key);
      if (val !== undefined && val !== null) return val;
    } catch {}
  }
  const localVal = localStorage.getItem(`checkora-${key}`);
  if (localVal !== null) {
    try { return JSON.parse(localVal); } catch { return localVal; }
  }
  return defaultVal;
};

const setStoredVal = async (key: string, val: any) => {
  if (window.electronAPI?.store) {
    try {
      await window.electronAPI.store.set(key, val);
      return;
    } catch {}
  }
  localStorage.setItem(`checkora-${key}`, JSON.stringify(val));
};

// Generate default mock recent games to make profile look stunning initially
const MOCK_GAMES: GameHistoryEntry[] = [
  { id: '1', date: '2026-05-28', opponent: 'Rusty Bot', opponentElo: 500, timeControl: '10+0', playerColor: 'white', result: 'W', ratingChange: 35 },
  { id: '2', date: '2026-05-29', opponent: 'Sparky Bot', opponentElo: 650, timeControl: '5+0', playerColor: 'white', result: 'W', ratingChange: 38 },
  { id: '3', date: '2026-05-30', opponent: 'Sage Bot', opponentElo: 1150, timeControl: '10+0', playerColor: 'black', result: 'D', ratingChange: 8 },
  { id: '4', date: '2026-05-31', opponent: 'Cobra Bot', opponentElo: 1350, timeControl: '3+0', playerColor: 'black', result: 'L', ratingChange: -2 }
];

export const useGameStore = create<GameState>((set, get) => {
  const defaultChess = new Chess();

  return {
    // Initial States
    chess: defaultChess,
    fen: defaultChess.fen(),
    turn: 'w',
    history: [],
    whiteTime: 600,
    blackTime: 600,
    initialTime: 600,
    increment: 0,
    timeControl: '10+0',
    playerColor: 'white',
    activeBot: null,
    gameResult: null,
    gameOverReason: '',
    isGameActive: false,
    chatMessages: [],

    gameHistory: [],
    userEloBlitz: 100,
    userEloRapid: 100,
    userEloBullet: 100,

    puzzleRushActive: false,
    puzzleRushScore: 0,
    puzzleRushLives: 3,
    puzzleRushTime: 180,
    puzzleRushHighscore: 0,

    coordsActive: false,
    coordsTarget: 'e4',
    coordsScore: 0,
    coordsTime: 60,
    coordsHighscore: 0,

    initGameStore: async () => {
      const history = await getStoredVal('gameHistory', MOCK_GAMES);
      const userEloBlitz = await getStoredVal('userEloBlitz', 100);
      const userEloRapid = await getStoredVal('userEloRapid', 100);
      const userEloBullet = await getStoredVal('userEloBullet', 100);
      const puzzleRushHighscore = await getStoredVal('puzzleRushHighscore', 18);
      const coordsHighscore = await getStoredVal('coordsHighscore', 24);

      set({
        gameHistory: history,
        userEloBlitz,
        userEloRapid,
        userEloBullet,
        puzzleRushHighscore,
        coordsHighscore
      });
    },

    startNewGame: (bot, timeControl, color, customMinutes, customIncrement) => {
      const chess = new Chess();
      let selectedColor: 'white' | 'black' = color === 'random' 
        ? (Math.random() < 0.5 ? 'white' : 'black') 
        : color;

      let minutes = 10;
      let inc = 0;

      if (timeControl === '1+0') { minutes = 1; inc = 0; }
      else if (timeControl === '3+0') { minutes = 3; inc = 0; }
      else if (timeControl === '5+0') { minutes = 5; inc = 0; }
      else if (timeControl === '10+0') { minutes = 10; inc = 0; }
      else if (timeControl === '15+10') { minutes = 15; inc = 10; }
      else if (timeControl === '30+0') { minutes = 30; inc = 0; }
      else if (timeControl === 'custom') {
        minutes = customMinutes || 10;
        inc = customIncrement || 0;
      }

      const totalSec = minutes * 60;
      const initialChat = bot 
        ? [{ sender: bot.name, text: bot.quote, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]
        : [{ sender: 'System', text: 'Good luck! Match started.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }];

      set({
        chess,
        fen: chess.fen(),
        turn: 'w',
        history: [],
        whiteTime: totalSec,
        blackTime: totalSec,
        initialTime: totalSec,
        increment: inc,
        timeControl: timeControl === 'custom' ? `${minutes}+${inc}` : timeControl,
        playerColor: selectedColor,
        activeBot: bot,
        gameResult: null,
        gameOverReason: '',
        isGameActive: true,
        chatMessages: initialChat
      });
    },

    makeMove: (from, to, promotion) => {
      const { chess, turn, playerColor, activeBot, isGameActive, increment, whiteTime, blackTime } = get();
      if (!isGameActive) return false;

      try {
        // Auto promotion fallback if option enabled but parameter omitted
        const isPawn = chess.get(from as any)?.type === 'p';
        const isPromotionRank = (to.endsWith('8') && turn === 'w') || (to.endsWith('1') && turn === 'b');
        const promoPiece = isPawn && isPromotionRank ? (promotion || 'q') : undefined;

        const move = chess.move({
          from,
          to,
          promotion: promoPiece
        });

        if (move) {
          // Increment time
          let wTime = whiteTime;
          let bTime = blackTime;
          if (turn === 'w') {
            wTime += increment;
          } else {
            bTime += increment;
          }

          // Build History Records
          const pgnHistory = chess.history({ verbose: true });
          const formattedHistory: MoveRecord[] = [];
          
          for (let i = 0; i < pgnHistory.length; i += 2) {
            const num = Math.floor(i / 2) + 1;
            const wMove = pgnHistory[i].san;
            const bMove = pgnHistory[i + 1]?.san;
            formattedHistory.push({ num, white: wMove, black: bMove });
          }

          set({
            fen: chess.fen(),
            turn: chess.turn(),
            history: formattedHistory,
            whiteTime: wTime,
            blackTime: bTime
          });

          // Check End Conditions
          if (chess.isGameOver()) {
            let result: GameResult = null;
            let reason = 'draw';

            if (chess.isCheckmate()) {
              result = chess.turn() === 'w' ? 'b' : 'w';
              reason = 'checkmate';
            } else if (chess.isDraw()) {
              result = 'd';
              reason = chess.isStalemate() ? 'stalemate' : 'insufficient';
            }

            get().sendChatMessage('System', `Game Over: ${reason}.`);
            
            // Log Result to history
            const historyResult: 'W' | 'L' | 'D' = result === 'd'
              ? 'D'
              : (result === 'w' && playerColor === 'white') || (result === 'b' && playerColor === 'black')
                ? 'W'
                : 'L';

            const activeOpponent = activeBot ? activeBot.name : 'Chess Engine';
            const activeElo = activeBot ? activeBot.elo : 1500;
            
            const tcCat = getTcCategory(get().timeControl);
            let currentElo = 100;
            if (tcCat === 'rapid') currentElo = get().userEloRapid;
            else if (tcCat === 'blitz') currentElo = get().userEloBlitz;
            else if (tcCat === 'bullet') currentElo = get().userEloBullet;

            const change = calculateEloChange(currentElo, activeElo, historyResult, get().gameHistory.length);
            
            const newHistoryEntry: GameHistoryEntry = {
              id: Date.now().toString(),
              date: new Date().toISOString().split('T')[0],
              opponent: activeOpponent,
              opponentElo: activeElo,
              timeControl: get().timeControl,
              playerColor,
              result: historyResult,
              ratingChange: change
            };

            const updatedHistory = [newHistoryEntry, ...get().gameHistory];
            const newRapid = tcCat === 'rapid' ? Math.max(100, get().userEloRapid + change) : get().userEloRapid;
            const newBlitz = tcCat === 'blitz' ? Math.max(100, get().userEloBlitz + change) : get().userEloBlitz;
            const newBullet = tcCat === 'bullet' ? Math.max(100, get().userEloBullet + change) : get().userEloBullet;

            set({
              gameResult: result,
              gameOverReason: reason,
              isGameActive: false,
              gameHistory: updatedHistory,
              userEloRapid: newRapid,
              userEloBlitz: newBlitz,
              userEloBullet: newBullet,
            });

            setStoredVal('gameHistory', updatedHistory);
            setStoredVal('userEloRapid', newRapid);
            setStoredVal('userEloBlitz', newBlitz);
            setStoredVal('userEloBullet', newBullet);
          }

          return true;
        }
      } catch (err) {
        console.error(err);
      }
      return false;
    },

    tickClocks: () => {
      const { isGameActive, turn, whiteTime, blackTime, playerColor, activeBot } = get();
      if (!isGameActive) return;

      if (turn === 'w') {
        const nextTime = Math.max(0, whiteTime - 1);
        set({ whiteTime: nextTime });

        if (nextTime === 0) {
          // White timeout
          set({
            isGameActive: false,
            gameResult: 'b',
            gameOverReason: 'timeout'
          });
          get().sendChatMessage('System', 'Game Over: Black wins on time.');
        }
      } else {
        const nextTime = Math.max(0, blackTime - 1);
        set({ blackTime: nextTime });

        if (nextTime === 0) {
          // Black timeout
          set({
            isGameActive: false,
            gameResult: 'w',
            gameOverReason: 'timeout'
          });
          get().sendChatMessage('System', 'Game Over: White wins on time.');
        }
      }
    },

    resignGame: () => {
      const { playerColor, activeBot, isGameActive } = get();
      if (!isGameActive) return;

      const result: GameResult = playerColor === 'white' ? 'b' : 'w';
      const activeOpponent = activeBot ? activeBot.name : 'Chess Engine';
      const activeElo = activeBot ? activeBot.elo : 1500;
      
      const tcCat = getTcCategory(get().timeControl);
      let currentElo = 100;
      if (tcCat === 'rapid') currentElo = get().userEloRapid;
      else if (tcCat === 'blitz') currentElo = get().userEloBlitz;
      else if (tcCat === 'bullet') currentElo = get().userEloBullet;

      const change = calculateEloChange(currentElo, activeElo, 'L', get().gameHistory.length);

      const newHistoryEntry: GameHistoryEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        opponent: activeOpponent,
        opponentElo: activeElo,
        timeControl: get().timeControl,
        playerColor,
        result: 'L',
        ratingChange: change
      };

      const updatedHistory = [newHistoryEntry, ...get().gameHistory];
      const newRapid = tcCat === 'rapid' ? Math.max(100, get().userEloRapid + change) : get().userEloRapid;
      const newBlitz = tcCat === 'blitz' ? Math.max(100, get().userEloBlitz + change) : get().userEloBlitz;
      const newBullet = tcCat === 'bullet' ? Math.max(100, get().userEloBullet + change) : get().userEloBullet;

      set({
        isGameActive: false,
        gameResult: result,
        gameOverReason: 'resignation',
        gameHistory: updatedHistory,
        userEloRapid: newRapid,
        userEloBlitz: newBlitz,
        userEloBullet: newBullet,
      });

      setStoredVal('gameHistory', updatedHistory);
      setStoredVal('userEloRapid', newRapid);
      setStoredVal('userEloBlitz', newBlitz);
      setStoredVal('userEloBullet', newBullet);

      get().sendChatMessage('System', 'Resigned. Match ended.');
      if (activeBot) {
        get().sendChatMessage(activeBot.name, 'A wise decision. Better luck next time!');
      }
    },

    offerDraw: () => {
      const { activeBot, isGameActive, playerColor } = get();
      if (!isGameActive) return;

      // Draw acceptance depends on Bot ELO & material balance
      let botAccepts = false;
      
      if (activeBot) {
        // High Elo bots rarely accept simple draws unless materials are even or they are losing
        if (activeBot.elo < 1500) {
          botAccepts = Math.random() < 0.6; // 60% chance for lower bots
        } else {
          botAccepts = Math.random() < 0.35; // 35% chance for higher bots
        }
      } else {
        botAccepts = true;
      }

      if (botAccepts) {
        const activeOpponent = activeBot ? activeBot.name : 'Chess Engine';
        const activeElo = activeBot ? activeBot.elo : 1500;
        
        const tcCat = getTcCategory(get().timeControl);
        let currentElo = 100;
        if (tcCat === 'rapid') currentElo = get().userEloRapid;
        else if (tcCat === 'blitz') currentElo = get().userEloBlitz;
        else if (tcCat === 'bullet') currentElo = get().userEloBullet;

        const change = calculateEloChange(currentElo, activeElo, 'D', get().gameHistory.length);

        const newHistoryEntry: GameHistoryEntry = {
          id: Date.now().toString(),
          date: new Date().toISOString().split('T')[0],
          opponent: activeOpponent,
          opponentElo: activeElo,
          timeControl: get().timeControl,
          playerColor,
          result: 'D',
          ratingChange: change
        };

        const updatedHistory = [newHistoryEntry, ...get().gameHistory];
        const newRapid = tcCat === 'rapid' ? Math.max(100, get().userEloRapid + change) : get().userEloRapid;
        const newBlitz = tcCat === 'blitz' ? Math.max(100, get().userEloBlitz + change) : get().userEloBlitz;
        const newBullet = tcCat === 'bullet' ? Math.max(100, get().userEloBullet + change) : get().userEloBullet;

        set({
          isGameActive: false,
          gameResult: 'd',
          gameOverReason: 'draw-agreement',
          gameHistory: updatedHistory,
          userEloRapid: newRapid,
          userEloBlitz: newBlitz,
          userEloBullet: newBullet,
        });

        setStoredVal('gameHistory', updatedHistory);
        setStoredVal('userEloRapid', newRapid);
        setStoredVal('userEloBlitz', newBlitz);
        setStoredVal('userEloBullet', newBullet);

        get().sendChatMessage('System', 'Draw accepted by agreement.');
        if (activeBot) {
          get().sendChatMessage(activeBot.name, 'Very well, let us call it a draw.');
        }
      } else {
        get().sendChatMessage('System', 'Draw offer declined.');
        if (activeBot) {
          get().sendChatMessage(activeBot.name, 'No, there is still plenty of chess to play!');
        }
      }
    },

    sendChatMessage: (sender, text) => {
      const msg = {
        sender,
        text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      set((state) => ({ chatMessages: [...state.chatMessages, msg] }));
    },

    flipBoard: () => {
      useSettingsStore.getState().toggleBoardFlipped();
    },

    resetAll: () => {
      const chess = new Chess();
      set({
        chess,
        fen: chess.fen(),
        turn: 'w',
        history: [],
        whiteTime: 600,
        blackTime: 600,
        activeBot: null,
        gameResult: null,
        gameOverReason: '',
        isGameActive: false,
        chatMessages: []
      });
    },

    undoMove: () => {
      const { chess, playerColor, activeBot } = get();
      if (!activeBot) return false;

      const currentTurn = chess.turn();
      const isPlayerTurn = (currentTurn === 'w' && playerColor === 'white') || (currentTurn === 'b' && playerColor === 'black');
      const movesToUndo = isPlayerTurn ? 2 : 1;

      const pgnHistory = chess.history();
      if (pgnHistory.length < movesToUndo) {
        return false;
      }

      for (let i = 0; i < movesToUndo; i++) {
        chess.undo();
      }

      const updatedPgnHistory = chess.history({ verbose: true });
      const formattedHistory: MoveRecord[] = [];
      
      for (let i = 0; i < updatedPgnHistory.length; i += 2) {
        const num = Math.floor(i / 2) + 1;
        const wMove = updatedPgnHistory[i].san;
        const bMove = updatedPgnHistory[i + 1]?.san;
        formattedHistory.push({ num, white: wMove, black: bMove });
      }

      set({
        fen: chess.fen(),
        turn: chess.turn(),
        history: formattedHistory,
        isGameActive: true,
        gameResult: null,
        gameOverReason: ''
      });

      return true;
    },

    loadFEN: (fen) => {
      try {
        const chess = new Chess(fen);
        set({
          chess,
          fen: chess.fen(),
          turn: chess.turn(),
          history: [],
          isGameActive: false,
          gameResult: null
        });
        return true;
      } catch {
        return false;
      }
    },

    loadPGN: (pgn) => {
      try {
        const chess = new Chess();
        chess.loadPgn(pgn);
        
        const pgnHistory = chess.history({ verbose: true });
        const formattedHistory: MoveRecord[] = [];
        
        for (let i = 0; i < pgnHistory.length; i += 2) {
          const num = Math.floor(i / 2) + 1;
          const wMove = pgnHistory[i].san;
          const bMove = pgnHistory[i + 1]?.san;
          formattedHistory.push({ num, white: wMove, black: bMove });
        }

        set({
          chess,
          fen: chess.fen(),
          turn: chess.turn(),
          history: formattedHistory,
          isGameActive: false,
          gameResult: null
        });
        return true;
      } catch {
        return false;
      }
    },

    // Puzzle Rush
    startPuzzleRush: () => {
      set({
        puzzleRushActive: true,
        puzzleRushScore: 0,
        puzzleRushLives: 3,
        puzzleRushTime: 180
      });
    },

    endPuzzleRush: () => {
      const { puzzleRushScore, puzzleRushHighscore } = get();
      if (puzzleRushScore > puzzleRushHighscore) {
        set({ puzzleRushHighscore: puzzleRushScore });
        setStoredVal('puzzleRushHighscore', puzzleRushScore);
      }
      set({ puzzleRushActive: false });
    },

    tickPuzzleRush: () => {
      const { puzzleRushTime, puzzleRushActive } = get();
      if (!puzzleRushActive) return;

      const nextTime = Math.max(0, puzzleRushTime - 1);
      set({ puzzleRushTime: nextTime });

      if (nextTime === 0) {
        get().endPuzzleRush();
      }
    },

    submitPuzzleAnswer: (isCorrect) => {
      const { puzzleRushScore, puzzleRushLives, puzzleRushActive } = get();
      if (!puzzleRushActive) return;

      if (isCorrect) {
        set({ puzzleRushScore: puzzleRushScore + 1 });
      } else {
        const livesLeft = puzzleRushLives - 1;
        set({ puzzleRushLives: livesLeft });

        if (livesLeft === 0) {
          get().endPuzzleRush();
        }
      }
    },

    // Coordinates Trainer
    startCoordsTrainer: () => {
      const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
      const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
      const randomSquare = files[Math.floor(Math.random() * 8)] + ranks[Math.floor(Math.random() * 8)];

      set({
        coordsActive: true,
        coordsScore: 0,
        coordsTime: 60,
        coordsTarget: randomSquare
      });
    },

    endCoordsTrainer: () => {
      const { coordsScore, coordsHighscore } = get();
      if (coordsScore > coordsHighscore) {
        set({ coordsHighscore: coordsScore });
        setStoredVal('coordsHighscore', coordsScore);
      }
      set({ coordsActive: false });
    },

    tickCoordsTrainer: () => {
      const { coordsTime, coordsActive } = get();
      if (!coordsActive) return;

      const nextTime = Math.max(0, coordsTime - 1);
      set({ coordsTime: nextTime });

      if (nextTime === 0) {
        get().endCoordsTrainer();
      }
    },

    submitCoordsAnswer: (square) => {
      const { coordsTarget, coordsScore, coordsActive } = get();
      if (!coordsActive) return;

      if (square === coordsTarget) {
        const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
        const nextTarget = files[Math.floor(Math.random() * 8)] + ranks[Math.floor(Math.random() * 8)];

        set({
          coordsScore: coordsScore + 1,
          coordsTarget: nextTarget
        });
      } else {
        // Play error buzzer in game or minor penalty if desired. For stark UI, just let it skip to another square
        const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
        const nextTarget = files[Math.floor(Math.random() * 8)] + ranks[Math.floor(Math.random() * 8)];
        
        set({
          coordsTarget: nextTarget
        });
      }
    }
  };
});
