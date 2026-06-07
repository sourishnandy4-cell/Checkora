import { Chess } from 'chess.js';

const chess = new Chess('r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4');
const moves = chess.moves({ square: 'c2', verbose: true });
console.log("Legal moves for c2:", moves);
