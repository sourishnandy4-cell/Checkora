import { Chess } from 'chess.js';

const c1 = new Chess();
c1.move('e4');
c1.move('e5');
const pgnStr = c1.pgn();
console.log("PGN:", pgnStr);

const c2 = new Chess();
const loaded = c2.loadPgn(pgnStr);
console.log("Loaded:", loaded);
console.log("History:", c2.history());
