// Web Worker bridge for Stockfish WASM
try {
  importScripts('stockfish.js');

  // If STOCKFISH is exposed as a global function (standard Emscripten WASM build)
  if (typeof STOCKFISH === 'function') {
    const engine = STOCKFISH();
    
    engine.onmessage = function(line) {
      postMessage(line);
    };

    onmessage = function(event) {
      engine.postMessage(event.data);
    };
  } else {
    // If stockfish.js is itself a worker script, Emscripten might have auto-bound it.
    // In that case, we can log and let the script handle events, or fallback.
    console.log('Stockfish was auto-initialized by Emscripten script.');
  }
} catch (e) {
  console.error('Stockfish Web Worker initialization failed:', e);
}
