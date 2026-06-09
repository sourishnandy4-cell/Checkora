export interface EngineEvaluation {
  depth: number;
  score: number; // in centipawns
  mateIn?: number; // moves to mate if detected
  bestMove?: string;
}

export class StockfishEngine {
  private worker: Worker | null = null;
  private onEvalCallback: ((evaluation: EngineEvaluation) => void) | null = null;
  private onBestMoveCallback: ((bestMove: string) => void) | null = null;
  private isReady = false;

  // Throttle eval updates to avoid UI flooding
  private lastEvalEmittedAtMs = 0;
  private readonly evalEmitMinIntervalMs = 100; // max 10 updates/sec

  constructor() {
    this.initWorker();
  }

  private initWorker() {
    try {
      // In Vite, we can spawn a web worker loading from a static path
      // placing the worker in the public folder ensures it can load stockfish.js via importScripts
      this.worker = new Worker('./stockfish.worker.js');

      this.worker.onmessage = (e: MessageEvent) => {
        const line = e.data;
        this.parseLine(line);
      };

      // Initialize UCI
      this.send('uci');
      this.send('isready');
    } catch (e) {
      console.error('Failed to initialize Stockfish Web Worker:', e);
    }
  }

  private send(command: string) {
    if (this.worker) {
      this.worker.postMessage(command);
    }
  }

  setDifficulty(skillLevel: number, elo?: number) {
    // Set skill level (0 - 20)
    this.send(`setoption name Skill Level value ${skillLevel}`);

    // If ELO is set and less than 2850, limit strength using UCI_Elo
    if (elo && elo < 2800) {
      this.send('setoption name UCI_LimitStrength value true');
      this.send(`setoption name UCI_Elo value ${elo}`);
    } else {
      this.send('setoption name UCI_LimitStrength value false');
    }
  }

  evaluatePosition(fen: string, depth: number, onEval: (evaluation: EngineEvaluation) => void) {
    // Stop any in-flight search before starting a new one
    this.send('stop');
    this.onBestMoveCallback = null; // clear so it doesn't fire spuriously
    this.onEvalCallback = onEval;
    this.lastEvalEmittedAtMs = 0;
    this.send(`position fen ${fen}`);
    this.send(`go depth ${depth}`);
  }

  getBestMove(fen: string, depth: number, skillLevel: number, elo: number, onBestMove: (bestMove: string) => void) {
    // Stop any in-flight search before starting a new one
    this.send('stop');
    this.onEvalCallback = null; // clear eval listener during bot thinking
    this.onBestMoveCallback = onBestMove;
    this.lastEvalEmittedAtMs = 0;
    this.setDifficulty(skillLevel, elo);
    this.send(`position fen ${fen}`);
    this.send(`go depth ${depth}`);
  }

  stop() {
    this.send('stop');
  }

  terminate() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }

  private parseLine(line: string) {
    // Parse UCI info lines for score, mate, depth
    if (line.startsWith('readyok')) {
      this.isReady = true;
    }

    if (line.startsWith('info depth') && this.onEvalCallback) {
      const now = Date.now();
      if (now - this.lastEvalEmittedAtMs < this.evalEmitMinIntervalMs) {
        return;
      }

      const parts = line.split(' ');
      const depthIndex = parts.indexOf('depth');
      const scoreIndex = parts.indexOf('score');
      const pvIndex = parts.indexOf('pv');

      let depth = 1;
      let score = 0;
      let mateIn: number | undefined;
      let bestMove: string | undefined;

      if (depthIndex !== -1 && parts.length > depthIndex + 1) {
        const d = parseInt(parts[depthIndex + 1], 10);
        if (Number.isFinite(d)) depth = d;
      }

      if (scoreIndex !== -1 && parts.length > scoreIndex + 2) {
        const scoreType = parts[scoreIndex + 1]; // 'cp' or 'mate'
        const scoreVal = parseInt(parts[scoreIndex + 2], 10);

        if (Number.isFinite(scoreVal)) {
          if (scoreType === 'cp') {
            score = scoreVal / 100; // convert centipawns to pawn advantage
          } else if (scoreType === 'mate') {
            mateIn = scoreVal;
          }
        }
      }

      if (pvIndex !== -1 && parts.length > pvIndex + 1) {
        bestMove = parts[pvIndex + 1];
      }

      this.lastEvalEmittedAtMs = now;
      this.onEvalCallback({
        depth,
        score,
        mateIn,
        bestMove
      });
    }

    if (line.startsWith('bestmove') && this.onBestMoveCallback) {
      const parts = line.split(' ');
      const bestMove = parts[1]; // e.g. "e2e4"
      if (!bestMove) return;

      // Prevent callbacks triggering repeatedly if engine is stopped
      const cb = this.onBestMoveCallback;
      this.onBestMoveCallback = null;
      cb(bestMove);
    }
  }
}
