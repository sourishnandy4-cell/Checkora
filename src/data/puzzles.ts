export interface TacticalPuzzle {
  id: string;
  fen: string;
  solution: string;
  theme: string;
  difficulty: number;
  playerColor: 'white' | 'black';
  instruction: string;
  successMessage: string;
}

export const LOCAL_PUZZLES: TacticalPuzzle[] = [
  {
    "id": "00008",
    "fen": "r6k/pp2r2p/4Rp1Q/3p4/8/1N1P2b1/PqP3PP/7K w - - 0 25",
    "solution": "e6e7",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "0000D",
    "fen": "5rk1/1p3ppp/pq1Q1b2/8/8/1P3N2/P4PPP/3R2K1 b - - 3 27",
    "solution": "f8d8",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "0008Q",
    "fen": "8/5R2/1p2P3/p4r2/P6p/1P3Pk1/4K3/8 b - - 2 64",
    "solution": "f5e5",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "0009B",
    "fen": "r2qr1k1/b1p2ppp/p5n1/P1p1p3/4P1n1/B2P2Pb/3NBP1P/RN1QR1K1 w - - 0 17",
    "solution": "e2g4",
    "theme": "Advantage",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "000Pw",
    "fen": "6k1/5p1p/4p3/4q3/3n4/2Q3P1/PP1N1P1P/6K1 b - - 3 37",
    "solution": "d4e2",
    "theme": "Crushing",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "000Sa",
    "fen": "2Q2bk1/5p1p/p5p1/2p3P1/4B3/7P/qPr2P2/2K4R w - - 0 33",
    "solution": "e4c2",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "000VW",
    "fen": "r4r2/1p3pkp/p7/3R1p1Q/3P4/8/P1q2P2/3R2K1 w - - 0 26",
    "solution": "d5c5",
    "theme": "Crushing",
    "difficulty": 5,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "000Vc",
    "fen": "8/8/4k1p1/2KpP2P/5P2/8/8/8 b - - 0 53",
    "solution": "g6h5",
    "theme": "Crushing",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "000Zo",
    "fen": "4r3/1k6/pp3P2/1b5p/3R1p2/P1R2P2/1P4PP/6K1 b - - 0 35",
    "solution": "e8e1",
    "theme": "Endgame",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "000aY",
    "fen": "r4rk1/pp2Bppp/2n1b3/q1pp4/8/P1Q2NP1/1PP1PP1P/2KR3R b - - 1 15",
    "solution": "a5c3",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "000h0",
    "fen": "5rk1/p5p1/3bRr1p/1Pp4q/3p4/1P1Q1N2/P4PPP/4R1K1 b - - 0 22",
    "solution": "f6f3",
    "theme": "Advantage",
    "difficulty": 4,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "000hf",
    "fen": "r1bq3r/pp1nbkp1/2p1p2p/8/2BP4/1PN3P1/P3QP1P/3R1RK1 w - - 0 20",
    "solution": "e2e6",
    "theme": "Mate",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "000jr",
    "fen": "6k1/1p4pp/p5n1/5Q2/3BpP2/1P2PP1K/P1q4P/7r w - - 2 34",
    "solution": "f5d5",
    "theme": "Crushing",
    "difficulty": 4,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "000lC",
    "fen": "3r3r/pQNk1ppp/1qnR1n2/1B6/8/8/PPP3PP/5R1K b - - 0 19",
    "solution": "d7d6",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "000mr",
    "fen": "5r1k/5rp1/p7/1b2B2p/1P1P1Pq1/2R3Q1/P3p1P1/2R3K1 b - - 1 41",
    "solution": "f7f4",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "000o3",
    "fen": "8/2p5/3k2p1/1p1P1p2/1P3P2/3K2Pp/7P/8 w - - 2 44",
    "solution": "d3d4",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "000qP",
    "fen": "8/7R/8/5p2/4bk1P/8/2r5/5KR1 b - - 8 51",
    "solution": "f4f3",
    "theme": "Crushing",
    "difficulty": 4,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "000rO",
    "fen": "3R4/8/8/KB2b3/1p6/1P2k3/3p4/8 b - - 0 58",
    "solution": "e5c7",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "000rZ",
    "fen": "2kr1b1r/p1p2pp1/2pqN3/7p/6n1/2NPB3/PPP2PPP/R2Q1RK1 b - - 0 13",
    "solution": "d6h2",
    "theme": "KingsideAttack",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (KingsideAttack)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00143",
    "fen": "r4rk1/5ppp/1np2q2/p1b5/2p1B3/P7/1P3PPP/R1BQ1RK1 w - - 2 18",
    "solution": "d1h5",
    "theme": "Advantage",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "0017R",
    "fen": "r2qk2r/pp2ppbp/1n1p2p1/3P4/2n5/2NBBP1P/PP3P2/R2QK2R w KQkq - 0 13",
    "solution": "d3c4",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "0018P",
    "fen": "5R2/1p6/p1p1k3/2P1r3/2K3p1/2P1p1P1/1P5P/8 w - - 2 45",
    "solution": "f8e8",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "0018S",
    "fen": "2kr3r/p4p2/1p2p2p/1N1p2p1/3Q4/1P1P4/2q2PPP/5RK1 w - - 0 21",
    "solution": "d4a1",
    "theme": "Advantage",
    "difficulty": 5,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "001Fg",
    "fen": "5r1k/pQR3pp/5rp1/3B4/q2n4/7P/P4PP1/5RK1 b - - 4 30",
    "solution": "d4e2",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "001Hi",
    "fen": "6k1/pp1r1pp1/2p1p2p/4P2P/3q1Q2/1P4R1/P1Pr1PP1/R5K1 w - - 5 24",
    "solution": "f4f6",
    "theme": "Advantage",
    "difficulty": 4,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "001KR",
    "fen": "6k1/p1p3pp/4N3/1p6/2q1r1n1/2B5/PP4PP/3R1R1K w - - 0 29",
    "solution": "f1f8",
    "theme": "Mate",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "001Oo",
    "fen": "6k1/4p1bp/6p1/1p1pP3/qPpPp3/2P1P3/Q2B1KPP/8 w - - 3 24",
    "solution": "a2a4",
    "theme": "Crushing",
    "difficulty": 4,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "001Wz",
    "fen": "6k1/5ppp/r1p5/p1n1rP2/8/2P2N1P/2P3P1/3R2K1 w - - 0 22",
    "solution": "d1d8",
    "theme": "BackRankMate",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (BackRankMate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "001XA",
    "fen": "2r2rk1/pbq1bppp/8/8/2p1N3/P1Bn2P1/2Q2PBP/1R3RK1 w - - 4 24",
    "solution": "b1b7",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "001aK",
    "fen": "6k1/5p2/4p3/P1B5/2P4P/4Pnp1/Rb2r3/5K2 w - - 0 34",
    "solution": "f1e2",
    "theme": "Crushing",
    "difficulty": 4,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "001cr",
    "fen": "8/3B2pp/p5k1/6P1/1ppp1K2/8/1P6/8 w - - 0 39",
    "solution": "d7e8",
    "theme": "BishopEndgame",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (BishopEndgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "001gi",
    "fen": "N6r/1p1k1ppp/2np4/b3p3/4P1b1/N1Q5/P4PPP/R3KB1R b KQ - 0 18",
    "solution": "a5c3",
    "theme": "BodenMate",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (BodenMate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "001h8",
    "fen": "2r3k1/2r4p/4p1p1/1p1q1pP1/p2P1P1Q/P6R/4bB2/2R3K1 w - - 6 35",
    "solution": "h4h7",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "001kG",
    "fen": "rnbq3r/1p3kpp/p4n2/2b5/2pNP3/2N5/PPP3PP/R1BQ1RK1 w - - 2 12",
    "solution": "d1h5",
    "theme": "Advantage",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "001m3",
    "fen": "7r/6k1/2b1Rp2/8/P1N3p1/5nP1/5P2/Q4K2 b - - 0 38",
    "solution": "h8h1",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "001om",
    "fen": "5r1k/pp4pp/5p2/1BbQp1r1/7K/7P/1PP3P1/3R3R b - - 3 26",
    "solution": "c5f2",
    "theme": "Mate",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "001pC",
    "fen": "r4rk1/pp3ppp/3b4/2p1pPB1/7N/2PP3n/PP4PP/R2Q2RK b - - 0 18",
    "solution": "h3f2",
    "theme": "Mate",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "001u3",
    "fen": "2r3k1/p4pp1/Qq2p2p/b1Np4/2nP1P2/4P1P1/5K1P/2B1N3 w - - 4 34",
    "solution": "a6c8",
    "theme": "Advantage",
    "difficulty": 4,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "001uD",
    "fen": "6k1/1p4p1/1p3p1p/2r1p3/2n5/r3PN2/2RnNPPP/2R3K1 w - - 0 33",
    "solution": "f3d2",
    "theme": "Advantage",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "001w5",
    "fen": "1rb3k1/q4rP1/4p2p/3p3p/3P1P2/2P5/2QK3P/3R2R1 w - - 1 30",
    "solution": "c2h7",
    "theme": "AdvancedPawn",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (AdvancedPawn)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "001wR",
    "fen": "6nr/p4p1p/k1p5/1p6/1QN5/2P1P3/4KPqP/8 w - - 0 27",
    "solution": "b4a5",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "001wb",
    "fen": "r3k2r/pb1p1ppp/1b4q1/1Q2P3/8/2NP1PP1/PP4P1/R1B2R1K b kq - 0 17",
    "solution": "g6h5",
    "theme": "Mate",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "001wr",
    "fen": "r4rk1/p3ppbp/Pp1q1np1/3PpbB1/2B5/2N2P2/1PPQ2PP/3RR1K1 b - - 0 18",
    "solution": "d6c5",
    "theme": "Advantage",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "001xO",
    "fen": "k1r1b3/p1r1nppp/Bp1qpn2/2Np4/1P1P4/PQR1PN2/5PPP/2R3K1 b - - 1 19",
    "solution": "b6c5",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "001xl",
    "fen": "8/4R3/p4kpp/3B4/5q2/8/5P1P/6K1 w - - 6 41",
    "solution": "e7f7",
    "theme": "Advantage",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "002CP",
    "fen": "r5k1/pp4pp/4p1q1/4p3/3n4/P3Q1P1/1PP4P/2KR1R2 b - - 5 24",
    "solution": "g6c2",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "002Ds",
    "fen": "8/2p5/pp1p4/P2Pk2p/1PP1p2P/2n1K2P/3N4/8 w - - 0 46",
    "solution": "b4b5",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "002GQ",
    "fen": "5rk1/5ppp/4p3/4N3/8/1Pn5/5PPP/2R3K1 b - - 1 28",
    "solution": "c3e2",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "002HE",
    "fen": "1qr2rk1/1p1p1ppp/pB2p1n1/7n/2P1P3/1Q2NP1P/PP2BKPb/3R1R2 b - - 2 20",
    "solution": "b8g3",
    "theme": "Master",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Master)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "002Hv",
    "fen": "8/8/8/6p1/5N2/3p3P/5kP1/3K4 b - - 0 56",
    "solution": "g5f4",
    "theme": "AdvancedPawn",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (AdvancedPawn)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "002IE",
    "fen": "r3brk1/5pp1/p2qpn1p/P2pn3/2pP4/2P1PN2/5PPP/RB1QK2R w KQ - 0 17",
    "solution": "d4e5",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "002KJ",
    "fen": "r3k2r/ppq1bppp/4pn2/2Ppn3/1P4bP/2P2N2/P3BPP1/RNBQ1RK1 w kq - 3 11",
    "solution": "f3e5",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "002LF",
    "fen": "7r/p4pk1/1pp3p1/8/6q1/4Q3/PP1R1P1r/5KN1 w - - 0 39",
    "solution": "e3e5",
    "theme": "Advantage",
    "difficulty": 4,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "002LW",
    "fen": "3r1rk1/1b3pp1/3p4/p3nPPQ/4P3/3q1BN1/8/2R2RK1 w - - 2 29",
    "solution": "f5f6",
    "theme": "Advantage",
    "difficulty": 5,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "002Mm",
    "fen": "rn1qrk2/ppp3pQ/3p1pP1/3Pp3/2P1P3/8/PP3PP1/R1B1K3 w Q - 3 17",
    "solution": "h7h8",
    "theme": "Deflection",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Deflection)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "002O7",
    "fen": "r3qrk1/2p2pp1/p2bpn1p/2ppN3/3P1Pb1/1PP1P1B1/P2N2PP/R2Q1RK1 w - - 1 15",
    "solution": "e5g4",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "002Q2",
    "fen": "7k/p4R1p/3p3B/2pN1n2/2PbB1b1/3P2P1/P3r3/5R1K b - - 0 28",
    "solution": "f5g3",
    "theme": "CornerMate",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (CornerMate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "002Tf",
    "fen": "r3kbnr/ppp1qppp/2n5/1B1pP3/5B2/4PQ2/PPP2PPP/RN2K2R b KQkq - 2 7",
    "solution": "e7b4",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "002Ua",
    "fen": "r4rk1/pp3ppp/3p1q2/P1P1p3/2B5/2B2n2/2P2P1P/R2Q1R1K b - - 1 16",
    "solution": "f6f4",
    "theme": "Crushing",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "002Uy",
    "fen": "8/8/1p6/k7/P7/1KR4r/8/8 b - - 27 64",
    "solution": "h3c3",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "002VP",
    "fen": "8/6p1/2B2n2/3b2k1/3B4/6K1/4P3/8 w - - 5 45",
    "solution": "d4f6",
    "theme": "Crushing",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "002Z9",
    "fen": "4r1k1/1p2R1p1/p2p2Pp/P1pP4/8/1R3p2/1P1q3P/5B1K w - - 0 35",
    "solution": "e7e8",
    "theme": "Endgame",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "002bK",
    "fen": "8/7p/4k3/pb1p1pPB/1n1P3P/N1p1P3/4K3/8 w - - 2 43",
    "solution": "a3b5",
    "theme": "Advantage",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "002e5",
    "fen": "r2q2k1/pp1n2bp/3P2b1/6N1/6Q1/P3P3/6P1/4K2R w K - 2 22",
    "solution": "g4c4",
    "theme": "Crushing",
    "difficulty": 5,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "002e8",
    "fen": "3rnrk1/1b3pp1/4pb2/p3q3/1p1N4/3B2R1/PPPQN2P/1K4R1 w - - 2 24",
    "solution": "d2h6",
    "theme": "Crushing",
    "difficulty": 5,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "002mG",
    "fen": "5r1k/B1p3pp/2Qb1p2/3Pq3/P6P/8/2P2K2/3R1R2 b - - 2 36",
    "solution": "f8e8",
    "theme": "Advantage",
    "difficulty": 4,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "002p5",
    "fen": "r1bqr1k1/pp1nbpp1/2p5/3n2P1/2BP4/P7/1PQNNPP1/R3K2R w KQ - 1 14",
    "solution": "c2h7",
    "theme": "KingsideAttack",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (KingsideAttack)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "002rd",
    "fen": "r6k/q1p2p1p/1b2bPr1/p1ppP2Q/3P2p1/4B3/PP2NRPP/3R2K1 w - - 2 26",
    "solution": "e2f4",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "002uV",
    "fen": "r2r2k1/1p2qppp/2n1p3/5Q2/p2P4/P4N2/BP3PPP/2R1R1K1 b - - 0 20",
    "solution": "e6f5",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "002vV",
    "fen": "8/6k1/1R5p/5p1P/5P1K/6P1/8/r7 b - - 3 58",
    "solution": "a1h1",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "002xh",
    "fen": "2nk4/8/2PBp3/1pK1P1p1/1P4Pn/8/8/8 w - - 3 43",
    "solution": "c5b5",
    "theme": "Crushing",
    "difficulty": 4,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "0030b",
    "fen": "6k1/5ppp/5n2/pp6/4b1rP/5N1Q/Pq2r1P1/3R2RK w - - 5 33",
    "solution": "d1d8",
    "theme": "BackRankMate",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (BackRankMate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00347",
    "fen": "8/2p5/8/2pPk2p/8/3K3P/6P1/8 b - - 2 42",
    "solution": "h5h4",
    "theme": "Crushing",
    "difficulty": 4,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "0039T",
    "fen": "1r5r/p3kp2/4p2p/4P3/R4Pp1/6P1/P1P4P/4K2R b K - 2 25",
    "solution": "b8b1",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "003AX",
    "fen": "2r2rk1/5ppp/bq2p3/p2pP1N1/Pb1p2P1/1P2P2P/2QN4/2R1K2R w K - 0 19",
    "solution": "c2h7",
    "theme": "KingsideAttack",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (KingsideAttack)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "003Ec",
    "fen": "3r4/p4R2/1pb2Pp1/n1p1Qqkp/8/P7/1P4PP/6RK w - - 3 33",
    "solution": "e5e3",
    "theme": "Crushing",
    "difficulty": 4,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "003IM",
    "fen": "8/5kp1/p3pb2/8/6Pp/1P4qP/P2R2Q1/7K b - - 3 34",
    "solution": "g3e1",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "003IX",
    "fen": "8/3pk3/R7/1R2PK1p/2PPn1r1/8/8/8 b - - 0 43",
    "solution": "e4g3",
    "theme": "Endgame",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "003Jb",
    "fen": "6k1/Q2bqr1p/2rpp1pR/p7/Pp2P3/1B3P2/1PP3P1/2KR4 b - - 7 22",
    "solution": "e7g5",
    "theme": "Advantage",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "003S3",
    "fen": "1r3k1r/pNqnppb1/6pn/2p3Np/7P/2P2Q2/PP3PP1/R1B1K2R w KQ - 3 16",
    "solution": "g5e6",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "003Tx",
    "fen": "2r5/pR5p/5p1k/4p3/4R3/B4nPP/PP3P2/1K6 b - - 0 27",
    "solution": "f3d2",
    "theme": "BackRankMate",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (BackRankMate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "003UW",
    "fen": "8/6pk/7p/2pq4/3p4/5PP1/P3QK1P/8 w - - 2 41",
    "solution": "e2e4",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "003YF",
    "fen": "r4rk1/1pp2ppp/p2p4/2bPp3/2P1PB1q/P1N2B2/1P3P2/R2QK1R1 b Q - 0 15",
    "solution": "h4f2",
    "theme": "AttackingF2F7",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (AttackingF2F7)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "003aS",
    "fen": "8/8/5k1p/6pP/1R4P1/1p2KP2/8/1r6 b - - 0 43",
    "solution": "b3b2",
    "theme": "AdvancedPawn",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (AdvancedPawn)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "003cs",
    "fen": "2r1kbnr/pp4pp/4p3/3pq1N1/8/1P2B3/P3Q1PP/nN3RK1 w k - 0 17",
    "solution": "f1f8",
    "theme": "Advantage",
    "difficulty": 4,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "003eP",
    "fen": "6k1/r1b1q3/2p3p1/2Pp4/1P2p1n1/2B1P3/NQ6/2K4R w - - 2 37",
    "solution": "h1h8",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "003if",
    "fen": "8/1q3kpp/1P2p3/4Q3/5P2/4B2P/2r3PK/8 w - - 1 44",
    "solution": "e5h5",
    "theme": "Advantage",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "003jH",
    "fen": "rn3rk1/p5pp/3N4/4np1q/5Q2/1P6/PB1P1KP1/2R4R b - - 1 25",
    "solution": "e5d3",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "003jb",
    "fen": "r3kb1r/p4ppp/b3p3/2pq4/3Q4/4BN2/PPP2PPP/R3K2R w KQkq - 0 12",
    "solution": "d4a4",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "003jv",
    "fen": "7R/1p2k2p/p2n2p1/4K3/8/6P1/P6P/8 b - - 11 37",
    "solution": "d6f7",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "003md",
    "fen": "r1b1k2N/ppp3pp/2n5/2bp4/7q/1B4n1/PPPP1P1P/RNBQR1K1 b q - 1 10",
    "solution": "g3e4",
    "theme": "Crushing",
    "difficulty": 4,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "003mh",
    "fen": "4rk1r/1pp2p2/p2p3p/3N4/3P2q1/8/PPP5/1K2Q1NR w - - 2 24",
    "solution": "e1e8",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "003nQ",
    "fen": "6rk/pp6/2n5/3ppn1p/3p4/2P2P1q/PP3QNB/R5RK b - - 3 29",
    "solution": "f5g3",
    "theme": "Crushing",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "003o0",
    "fen": "r1bqk2r/pp1nbppp/3p4/1B1p4/3P1B2/5N2/PPP2PPP/R2QK2R b KQkq - 3 9",
    "solution": "d8a5",
    "theme": "Advantage",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "003r5",
    "fen": "r2qr1k1/ppp2ppp/4P3/8/1nP2Q2/2N2N1P/PP3KP1/R4R2 b - - 0 15",
    "solution": "b4d3",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "003wQ",
    "fen": "2r2rk1/6pp/3Q1q2/8/3N1B2/6P1/PP1K3P/5R2 b - - 0 24",
    "solution": "f6d6",
    "theme": "Advantage",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "0040n",
    "fen": "r7/p2k1pp1/p1p1pn2/3p4/3P4/P3PQp1/1PP2P1R/2K5 b - - 0 20",
    "solution": "g3h2",
    "theme": "AdvancedPawn",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (AdvancedPawn)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "0042j",
    "fen": "3r2k1/4nppp/pq3b2/1p2p3/2r2P2/2P1NR2/PP1Q2BP/3R2K1 w - - 0 25",
    "solution": "d2d8",
    "theme": "BackRankMate",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (BackRankMate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00465",
    "fen": "5r1k/pp4pp/2p5/6q1/5R2/2P5/P1P2PPP/3rR1K1 w - - 0 28",
    "solution": "f4f8",
    "theme": "BackRankMate",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (BackRankMate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "0047P",
    "fen": "8/1N3k2/6p1/8/2P3P1/pr6/R7/5K2 b - - 2 56",
    "solution": "b3b1",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "0048h",
    "fen": "4r3/p5k1/2R4p/2Pp4/1P1pr1P1/P6P/8/3R3K b - - 0 35",
    "solution": "e4e1",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "004Ao",
    "fen": "4qk2/1b3R2/p7/1p2Q3/4P2P/P2P3K/2r5/3R4 b - - 0 41",
    "solution": "e8f7",
    "theme": "Advantage",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "004Ax",
    "fen": "8/5k2/4R2p/p7/5rPK/8/7P/8 w - - 3 43",
    "solution": "e6h6",
    "theme": "Crushing",
    "difficulty": 4,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "004BW",
    "fen": "r1bk2r1/ppq2NQp/3bpn2/1Bpn4/5P2/1P6/PBPP2PP/RN2K2R b KQ - 0 13",
    "solution": "d8e7",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "004JD",
    "fen": "3r4/R7/2p5/p1P2p2/1p4k1/nP2K3/P3NP2/8 b - - 4 41",
    "solution": "a3c2",
    "theme": "CornerMate",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (CornerMate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "004LZ",
    "fen": "8/7R/5p2/p7/7P/2p5/3k2N1/1K6 b - - 0 48",
    "solution": "c3c2",
    "theme": "AdvancedPawn",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (AdvancedPawn)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "004Lu",
    "fen": "8/p1p1k2p/4P3/2PP1p1P/1r3r2/5B2/P3RK2/8 w - - 4 39",
    "solution": "d5d6",
    "theme": "AdvancedPawn",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (AdvancedPawn)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "004Op",
    "fen": "2kr2r1/1bp4n/1pq1p2p/p1P5/1P3B2/P6P/5RP1/RB3QK1 b - - 4 26",
    "solution": "d8d1",
    "theme": "Crushing",
    "difficulty": 4,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "004RF",
    "fen": "5rk1/5ppp/1p6/1q3P1Q/2pp3P/6R1/6PK/8 w - - 0 31",
    "solution": "g3g7",
    "theme": "Attraction",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Attraction)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "004Ud",
    "fen": "r1bqk2r/p3nppp/3p4/1pp5/4P3/4Q3/PPP2PPP/2KR1B1R w kq - 0 12",
    "solution": "f1b5",
    "theme": "Advantage",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "004WZ",
    "fen": "r6k/1b3pp1/p1q1pn1p/2p5/P1B5/1PN4Q/2P1RP1P/R5K1 b - - 0 26",
    "solution": "c6h1",
    "theme": "Mate",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "004X6",
    "fen": "1r4k1/p4ppp/2Q5/3pq3/8/P6P/2PR1PP1/1R4K1 b - - 0 26",
    "solution": "b8b1",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "004XI",
    "fen": "8/3k1p2/4p3/p2p4/3P1P2/q3P1rP/7r/1QR2K2 w - - 2 35",
    "solution": "b1b7",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "004Ys",
    "fen": "r4rk1/5pbp/p1n1p1p1/2p3NP/1p1q1B2/3P3Q/PPP3P1/R3R1K1 w - - 3 20",
    "solution": "f4e3",
    "theme": "Advantage",
    "difficulty": 4,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "004b0",
    "fen": "5k2/4bB2/4P3/2p2P2/2b5/8/p7/B6K b - - 5 48",
    "solution": "e7g5",
    "theme": "AdvancedPawn",
    "difficulty": 4,
    "playerColor": "black",
    "instruction": "Find the best move. (AdvancedPawn)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "004d8",
    "fen": "8/4kr2/R2p4/1p1Pp3/5pp1/3K1P2/PPP5/8 w - - 0 40",
    "solution": "a6a7",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "004iZ",
    "fen": "r2r2k1/2q1bpp1/3p3p/1ppn4/1P1BP3/P5Q1/4RPPP/R5K1 w - - 0 21",
    "solution": "g3g7",
    "theme": "KingsideAttack",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (KingsideAttack)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "004kB",
    "fen": "4rr1k/p1Qn2pp/3p1q2/8/8/2P5/PP3PPP/RN3RK1 b - - 0 16",
    "solution": "f6f2",
    "theme": "KingsideAttack",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (KingsideAttack)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "004mT",
    "fen": "5Q2/8/1bk1p1p1/5p2/3p4/5qPK/7P/8 w - - 2 52",
    "solution": "f8a8",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "004nd",
    "fen": "3q2k1/3r4/pp3p1Q/2b1n3/P3N3/2P5/1P4PP/R6K w - - 1 25",
    "solution": "e4f6",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "004sY",
    "fen": "8/2k3n1/K2p2p1/2pP2Pp/2P4P/7B/8/8 b - - 1 57",
    "solution": "c7d8",
    "theme": "Crushing",
    "difficulty": 4,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "004sg",
    "fen": "6k1/p3b2p/1p1pP3/2P3P1/2np3B/P6P/3Q3K/8 b - - 0 38",
    "solution": "c4d2",
    "theme": "Advantage",
    "difficulty": 4,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "004u0",
    "fen": "4r1k1/ppq3pp/2p2p2/4r3/4p1Q1/P5RP/1P3PP1/3R2K1 w - - 4 35",
    "solution": "d1d7",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "004yJ",
    "fen": "r4rk1/1bp2ppp/p1q1pn2/2P1N3/8/3B4/P1P1QPPP/R4RK1 b - - 1 16",
    "solution": "c6g2",
    "theme": "KingsideAttack",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (KingsideAttack)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "004zI",
    "fen": "2q3k1/4br2/6pQ/1p1n2p1/7P/1P4P1/1B2PP2/6K1 w - - 0 28",
    "solution": "h6h8",
    "theme": "Endgame",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "004zh",
    "fen": "4b1k1/4Pr2/3R2pp/1ppBP2q/8/PP4P1/2P4P/3R3K w - - 3 39",
    "solution": "d1f1",
    "theme": "AdvancedPawn",
    "difficulty": 5,
    "playerColor": "white",
    "instruction": "Find the best move. (AdvancedPawn)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "0050w",
    "fen": "5rk1/1p2p2p/p2p4/2pPb2R/2P1P3/1P1BKPrR/8/8 w - - 5 31",
    "solution": "h3g3",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "0054a",
    "fen": "r1b2rk1/ppq2p1p/6p1/4b2Q/4R3/3B4/PP3PPP/R1B3K1 w - - 0 16",
    "solution": "h5e5",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "0055Y",
    "fen": "r1b2rk1/p3pp2/2B5/2Qpq3/3N2pp/4b3/2P2PPP/1R2K2R w K - 0 24",
    "solution": "f2e3",
    "theme": "Advantage",
    "difficulty": 4,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "005Bm",
    "fen": "4rk2/p4q2/1p3Q1b/8/1p5N/2P1p3/P3P3/2K5 w - - 1 44",
    "solution": "h4g6",
    "theme": "Endgame",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "005Ep",
    "fen": "5kr1/ppR3p1/3R3p/1n6/1r6/8/1P3PPP/2K5 w - - 5 32",
    "solution": "d6d8",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "005HG",
    "fen": "r2q1rk1/p1p2pp1/3bbn1p/4N3/8/1P4P1/PBQPPP1P/RN2K2R b KQ - 2 12",
    "solution": "d6e5",
    "theme": "Advantage",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "005N7",
    "fen": "r6k/2q3pp/8/2p5/R1np4/7P/2PB1PP1/6K1 w - - 0 33",
    "solution": "a4a8",
    "theme": "BackRankMate",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (BackRankMate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "005YM",
    "fen": "5k2/p4pp1/1qn3r1/3pP2p/3N1P2/2PQ4/Pr3RPP/R5K1 b - - 6 24",
    "solution": "b2f2",
    "theme": "Advantage",
    "difficulty": 5,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "005YX",
    "fen": "2rr4/5pk1/p1Q1N1pp/1p4q1/3pP3/1B1P4/PPP3PP/6RK b - - 0 25",
    "solution": "f7e6",
    "theme": "DefensiveMove",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (DefensiveMove)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "005do",
    "fen": "5r2/pp1k4/4p1b1/3pP1Np/3P1P1K/8/P7/2R5 w - - 8 43",
    "solution": "c1c7",
    "theme": "Attraction",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Attraction)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "005f3",
    "fen": "r5k1/2p1pp2/pp4p1/1q5r/5P2/2QP2R1/PP6/1K4R1 w - - 1 33",
    "solution": "g3g6",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "005jJ",
    "fen": "r1b1qrk1/pp1n1pbp/2pp1np1/4P3/2P2B2/2NBPN1P/PP3PP1/R2Q1RK1 b - - 0 10",
    "solution": "d6e5",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "005jR",
    "fen": "8/5p1k/1P4pp/3Qn3/4BP2/6P1/1p2PK1P/2q5 b - - 2 34",
    "solution": "b2b1q",
    "theme": "AdvancedPawn",
    "difficulty": 5,
    "playerColor": "black",
    "instruction": "Find the best move. (AdvancedPawn)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "005nD",
    "fen": "3rk2r/2qn2p1/p1Q1p3/3n3p/8/8/PP4PP/5R1K w k - 0 24",
    "solution": "c6e6",
    "theme": "Fork",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Fork)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "005qG",
    "fen": "8/8/1p1k1p1p/3np3/2B2p2/PP1K1PP1/7P/8 w - - 0 37",
    "solution": "c4d5",
    "theme": "Crushing",
    "difficulty": 4,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "005wJ",
    "fen": "r3kb1r/ppqN1ppp/4pn2/1Q3b2/3P4/8/PP2PPPP/RNB1KB1R b KQkq - 0 9",
    "solution": "c7c1",
    "theme": "HangingPiece",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (HangingPiece)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "005ws",
    "fen": "8/8/4Kpp1/7p/3N2kP/8/8/8 b - - 3 62",
    "solution": "g6g5",
    "theme": "Crushing",
    "difficulty": 4,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "005wy",
    "fen": "1r6/pp2kppQ/2n1p1n1/3p2P1/5P2/2PqP3/PP1N4/2KR3R b - - 4 27",
    "solution": "c6b4",
    "theme": "Long",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (Long)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "005x9",
    "fen": "r1b1kb1Q/ppp4p/6pB/3P4/2pn4/8/PPP1qPPP/RNK4R b q - 3 13",
    "solution": "e2c2",
    "theme": "Mate",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "005xu",
    "fen": "6r1/3k4/1K1P4/2P5/R7/5b2/8/8 w - - 1 69",
    "solution": "a4a7",
    "theme": "AdvancedPawn",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (AdvancedPawn)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "005yO",
    "fen": "r1r2k2/ppq3bQ/4p2p/4n3/3p4/2P5/PBB2PPP/4R1K1 w - - 3 25",
    "solution": "b2a3",
    "theme": "Advantage",
    "difficulty": 5,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "0061g",
    "fen": "6k1/pp3pp1/2p1q1Pp/3b4/8/6Q1/PB3Pp1/3r1NK1 w - - 0 28",
    "solution": "g3b8",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00656",
    "fen": "7r/ppp2kp1/2nb1pp1/3p3r/3P2P1/2PQB3/PP3PP1/R3R1K1 b - - 0 18",
    "solution": "h5h1",
    "theme": "Mate",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "0068B",
    "fen": "r1q3k1/3nbppp/pp2p3/4B3/8/2N2Q2/PPPR1PPP/6K1 w - - 1 19",
    "solution": "d2d7",
    "theme": "Crushing",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "0068D",
    "fen": "7r/pppk4/2pN1r2/8/3P2p1/2P5/PP2RPP1/4R1K1 b - - 0 26",
    "solution": "f6h6",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "006E1",
    "fen": "5rk1/R4pp1/1p5p/3Q4/1PPp2q1/3P2P1/5P2/4K3 b - - 0 34",
    "solution": "f8e8",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "006GK",
    "fen": "2kr1br1/ppBb1ppp/8/3P2Q1/6n1/5n2/PP3qPP/RN2R2K w - - 0 17",
    "solution": "g5d8",
    "theme": "Mate",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "006HV",
    "fen": "1r6/5k2/2Q1pNp1/p5Pp/1p2P2P/2P4R/KP3P2/3q4 b - - 0 31",
    "solution": "b4b3",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "006NL",
    "fen": "1r6/k2qn1b1/p1N1p1p1/2PpPpN1/2n2P1P/p4B2/1PP2Q2/1K1R3R b - - 0 32",
    "solution": "e7c6",
    "theme": "AdvancedPawn",
    "difficulty": 5,
    "playerColor": "black",
    "instruction": "Find the best move. (AdvancedPawn)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "006OI",
    "fen": "6R1/p7/5k2/P7/6KP/8/8/5r2 b - - 6 53",
    "solution": "f1g1",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "006RM",
    "fen": "1k1r3r/8/pp1n2p1/2q5/1Q6/3R2P1/PPP2P1P/3R2K1 w - - 5 30",
    "solution": "b4c5",
    "theme": "Crushing",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "006XF",
    "fen": "r5kr/pp1qb1p1/2p4p/3pP2Q/3Pb3/2P1B3/PP4PP/R4RK1 w - - 2 18",
    "solution": "h5f7",
    "theme": "Advantage",
    "difficulty": 4,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "006cZ",
    "fen": "3r1r1k/1p4p1/p1p3Qp/2q5/8/3n1N1P/PP1R2P1/5R1K w - - 8 29",
    "solution": "d2d3",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "006fF",
    "fen": "r1b4r/pp1k2p1/2nb2qp/1B1p2B1/3p3Q/8/PPP2PPP/3RR1K1 w - - 0 18",
    "solution": "h4g4",
    "theme": "Advantage",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "006i7",
    "fen": "r4rk1/3nqpp1/2N1bn1p/3p4/1p1P4/2NQP2P/1PB2PP1/R4RK1 b - - 0 18",
    "solution": "e7d6",
    "theme": "Advantage",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "006ia",
    "fen": "1r4k1/4bpp1/1rp2n1B/3p4/3P4/2N3P1/Pq2QPKP/2R1R3 b - - 0 24",
    "solution": "b2e2",
    "theme": "Advantage",
    "difficulty": 4,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "006of",
    "fen": "r2qr2k/1pp2Qp1/1b4np/pP2P3/P4n2/B1N2N1P/5PP1/R3R1K1 b - - 0 20",
    "solution": "d8d3",
    "theme": "Advantage",
    "difficulty": 5,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "006om",
    "fen": "1r3k2/5p1p/2p1pp2/P2n4/r3N3/P4PK1/2R2P1P/2R5 w - - 10 30",
    "solution": "e4c5",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "006pe",
    "fen": "r4r2/2q1Nb2/5Qpk/2n4p/pp5P/8/1PP2PP1/2KR3R w - - 0 29",
    "solution": "e7f5",
    "theme": "Master",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Master)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "006wz",
    "fen": "2r5/4ppkp/6p1/1p6/1P6/P3B3/1br2PPP/1R1R2K1 w - - 3 23",
    "solution": "b1b2",
    "theme": "Attraction",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Attraction)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "006yP",
    "fen": "6R1/8/Kpk1p3/1p1pP3/6P1/PPr5/8/8 w - - 0 41",
    "solution": "g8c8",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "0071K",
    "fen": "3N1r2/R7/kp6/p2pPp1Q/2pP2P1/2q5/2P5/2K5 b - - 1 38",
    "solution": "a6a7",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "0071N",
    "fen": "6k1/p4pp1/1p5p/4b3/4B3/4P1P1/P1R2PKP/1q1r4 w - - 0 31",
    "solution": "c2c8",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "0072T",
    "fen": "3q1nk1/1bN2rpp/pp1P4/8/3Nn2b/8/PPP2PPP/R1BQ1RK1 b - - 2 16",
    "solution": "h4f2",
    "theme": "Advantage",
    "difficulty": 4,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00734",
    "fen": "r4bk1/2rqp2p/n1p3p1/3p1p2/3P1P1B/pP1BP3/P1Q2PRP/1KR5 w - - 1 27",
    "solution": "d3f5",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00761",
    "fen": "3r2k1/1b4bR/p2P2p1/3p2N1/2p5/2P2N2/PP6/2K5 w - - 0 29",
    "solution": "h7g7",
    "theme": "Attraction",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Attraction)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "0078T",
    "fen": "rk5r/1b3R2/pp2p2q/4P2p/B6B/4p2P/PP4P1/5Q1K w - - 0 28",
    "solution": "f7b7",
    "theme": "Attraction",
    "difficulty": 4,
    "playerColor": "white",
    "instruction": "Find the best move. (Attraction)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00798",
    "fen": "8/4k1K1/4P3/6pp/6rP/4R1P1/8/8 b - - 1 60",
    "solution": "g5h4",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "007AH",
    "fen": "3r1n2/1bp1bkpp/p1q2n2/1p6/3P4/P1N3B1/1PP1QPPP/R3R1K1 b - - 6 18",
    "solution": "c6g2",
    "theme": "KingsideAttack",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (KingsideAttack)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "007AS",
    "fen": "1r2kb1r/3nnpp1/4p1bp/1NppP3/3P4/6N1/P2BBPPP/R3K2R w KQk - 1 18",
    "solution": "b5d6",
    "theme": "Crushing",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "007HB",
    "fen": "rn2q1k1/pp3ppp/2pb4/3p1B2/2PN4/1Q6/PP3PPP/R1B4K b - - 0 15",
    "solution": "e8e1",
    "theme": "Mate",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "007QU",
    "fen": "2rq1rk1/1b5p/p3p3/1p1pBpp1/2nP2N1/1RP1PP2/P1Q3PP/3R2K1 w - - 0 23",
    "solution": "g4h6",
    "theme": "Mate",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "007Rn",
    "fen": "4r1k1/p4p1p/1p6/6B1/3P2n1/P4Q2/1P4P1/7K b - - 0 34",
    "solution": "e8e1",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "007XE",
    "fen": "2kr3r/p1p1Rpp1/2p2n1p/8/8/1P6/P1P2PPP/RNB3K1 b - - 0 16",
    "solution": "d8d1",
    "theme": "BackRankMate",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (BackRankMate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "007bH",
    "fen": "r2q1rk1/2p3pn/2pbp2p/p2p1p2/P4PQ1/1P1PP3/1BPN2PP/4RR1K w - - 0 16",
    "solution": "g4g7",
    "theme": "KingsideAttack",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (KingsideAttack)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "007c6",
    "fen": "2kr3r/p2n2pp/2pB1bp1/5q2/2B5/8/PPP2PPP/3R1RK1 w - - 0 18",
    "solution": "c4a6",
    "theme": "BodenMate",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (BodenMate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "007eS",
    "fen": "6k1/p4p2/1p5p/4r3/P3B3/1P2KP2/2P3PP/8 b - - 1 29",
    "solution": "f7f5",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "007en",
    "fen": "rn3rk1/4pp1p/3p2pB/2q4P/3QP1b1/Pp6/1P2B3/1K1R2NR b - - 0 20",
    "solution": "c5c2",
    "theme": "Long",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (Long)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "007fJ",
    "fen": "1Q6/5ppp/8/8/8/2pk3P/3p2P1/3K4 b - - 0 52",
    "solution": "c3c2",
    "theme": "AdvancedPawn",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (AdvancedPawn)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "007gO",
    "fen": "2r3rk/5p2/4p2p/4q3/1Q6/8/1P3PPP/2R2RK1 b - - 1 31",
    "solution": "e5g5",
    "theme": "Crushing",
    "difficulty": 4,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "007ku",
    "fen": "r1bq3Q/1np3p1/p5k1/1p1Pp3/1Pn2BP1/2b2P2/P3K3/R4N2 w - - 0 36",
    "solution": "h8h5",
    "theme": "Mate",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "007mr",
    "fen": "5k2/p2r3p/1p4pP/3r1q2/4R3/2P5/PP3PQ1/K3R3 b - - 0 33",
    "solution": "d5d1",
    "theme": "BackRankMate",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (BackRankMate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "007tv",
    "fen": "r3k1nr/1pp2ppp/1pnp4/4p1q1/2B1P3/3P1Q1P/PPP2PP1/R4RK1 w kq - 0 12",
    "solution": "f3f7",
    "theme": "Advantage",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "0082f",
    "fen": "r4rk1/2q2ppp/3pp3/4Pb1N/1p6/1p4Q1/PPP3PP/1K1RR3 w - - 0 22",
    "solution": "g3g7",
    "theme": "KingsideAttack",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (KingsideAttack)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "0088O",
    "fen": "7Q/2p5/1p2prp1/p4k1p/q4p1P/8/6RK/8 w - - 0 38",
    "solution": "g2g5",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "008D5",
    "fen": "r1bqk2r/pp3ppp/4p3/3pPn2/1b1P1P2/2N5/PP4PP/R1BQKB1R w KQkq - 3 10",
    "solution": "d1a4",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "008EC",
    "fen": "6k1/4rRp1/p6p/7P/q1pP4/2Pb2Q1/P4RP1/6K1 b - - 0 31",
    "solution": "e7f7",
    "theme": "Advantage",
    "difficulty": 4,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "008GK",
    "fen": "1k6/ppp3p1/8/1P5p/8/P3n2P/2P1r1P1/B2rNRK1 w - - 5 32",
    "solution": "f1f8",
    "theme": "BackRankMate",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (BackRankMate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "008LD",
    "fen": "8/6pp/6k1/5pN1/5P2/5rPb/4R2P/6K1 b - - 1 35",
    "solution": "f3f1",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "008LT",
    "fen": "r4r1k/6p1/b3p1nN/p1pp4/1p3P1q/3P1Q1B/PPP2PK1/R6R w - - 1 27",
    "solution": "h6f7",
    "theme": "Crushing",
    "difficulty": 4,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "008Nz",
    "fen": "6k1/2p2ppp/pnp5/B7/2P3PP/1P2PPR1/r3b2r/3R2K1 w - - 2 30",
    "solution": "d1d8",
    "theme": "BackRankMate",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (BackRankMate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "008P4",
    "fen": "8/4k3/1p1p4/rP2p1p1/P2nP1P1/3B4/3K4/R7 b - - 1 35",
    "solution": "d4b3",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "008Sk",
    "fen": "8/6pp/3Bp2k/p2pP2P/P3p1PK/8/r4b2/5R2 w - - 3 38",
    "solution": "f1f2",
    "theme": "Crushing",
    "difficulty": 4,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "008Y3",
    "fen": "r5k1/1p1r1pp1/p3pnp1/2qN4/8/1Q5P/PP3PP1/3RR1K1 w - - 0 25",
    "solution": "d5f6",
    "theme": "Advantage",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "008cl",
    "fen": "r3k2r/ppp2p1p/2n1pp2/7q/2PN2P1/2BP2b1/PP2B1P1/R2Q1RK1 b kq - 0 16",
    "solution": "h5h2",
    "theme": "Mate",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "008lc",
    "fen": "7k/pb1qn1rn/1p2R2Q/2p2p2/2Pp4/3B4/PP3P1P/4RK2 w - - 2 28",
    "solution": "h6g7",
    "theme": "Attraction",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Attraction)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "008nF",
    "fen": "2rq1rk1/7p/1n4pb/1R2Q3/pPpP1P2/P1B5/3N2PP/2R3K1 b - - 0 31",
    "solution": "f8e8",
    "theme": "Crushing",
    "difficulty": 4,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "008o6",
    "fen": "Q4rk1/p1p3p1/6P1/8/3P4/7P/q3r3/B4RK1 w - - 2 35",
    "solution": "a8f8",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "008oX",
    "fen": "6k1/2R3pp/2p4q/1p1p4/3P4/P7/1PP2R2/1K1Nr3 w - - 4 33",
    "solution": "c7c8",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "008qL",
    "fen": "r7/6pk/p2Q4/2p1p1qp/1pP1PrP1/1P3P1P/1P4K1/R4R2 b - - 0 25",
    "solution": "a8d8",
    "theme": "Advantage",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "008rw",
    "fen": "rn2kb1r/pp2pp1p/2p2np1/4q3/8/2N4Q/PPPPBPPP/R1B1K2R w KQkq - 0 9",
    "solution": "h3c8",
    "theme": "Mate",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "008tL",
    "fen": "8/7k/R6p/3p4/5r2/2P1p2P/P5P1/6K1 b - - 0 40",
    "solution": "e3e2",
    "theme": "AdvancedPawn",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (AdvancedPawn)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "0091A",
    "fen": "5rk1/q4ppp/p3Pb2/3nN3/P2P4/7Q/1r4PP/1R3RK1 w - - 0 25",
    "solution": "e6f7",
    "theme": "AdvancedPawn",
    "difficulty": 4,
    "playerColor": "white",
    "instruction": "Find the best move. (AdvancedPawn)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "0092V",
    "fen": "r2qk1nr/ppp3pp/2n5/1B1p4/1b1Pp3/5Q1P/PP1B1PP1/RN2K2R w KQkq - 0 12",
    "solution": "b5c6",
    "theme": "Crushing",
    "difficulty": 4,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "0092z",
    "fen": "2r3k1/3R1ppp/p1q5/2p2Q2/P7/7P/5PP1/6K1 w - - 4 27",
    "solution": "f5f7",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "0095W",
    "fen": "8/pp1r2kp/q2P1ppb/4N3/4P3/1Q5P/PPR2PP1/6K1 b - - 0 32",
    "solution": "f6e5",
    "theme": "Advantage",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "009BH",
    "fen": "3r3k/6p1/4Q3/4B3/1p3P2/4PKP1/3q4/8 w - - 18 52",
    "solution": "e6h6",
    "theme": "Endgame",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "009FP",
    "fen": "r1b1k1nr/ppp2pbp/3p1qp1/4p3/2BnP3/N2P2QP/PPP2PP1/R1B1K2R w KQkq - 0 10",
    "solution": "c1g5",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "009FS",
    "fen": "r2qr1k1/p5bp/1pp1N1p1/8/2Q2p2/2P1n2P/PP3PP1/R1B1RNK1 b - - 0 18",
    "solution": "e3c4",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "009IO",
    "fen": "3r4/4kp1r/p2Np1p1/3bP3/P2n4/8/1P3RPP/5RK1 w - - 5 26",
    "solution": "f2f7",
    "theme": "HookMate",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (HookMate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "009J1",
    "fen": "rn3k1r/pp2bp1p/2p1pNp1/6B1/5P2/7P/PPP4P/2K1RR2 w - - 4 18",
    "solution": "g5h6",
    "theme": "Mate",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "009L0",
    "fen": "6k1/pb2r1pN/1n4Bp/3p4/1P2pR2/P7/5PPP/2rR2K1 b - - 3 30",
    "solution": "c1d1",
    "theme": "BackRankMate",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (BackRankMate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "009Os",
    "fen": "r2b2k1/1p3q1p/p2p4/3P2p1/2P1PR1r/6Q1/P2B3P/2R4K b - - 2 29",
    "solution": "h4f4",
    "theme": "Crushing",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "009Wc",
    "fen": "1r3rk1/1pqN1pbp/p1p1pnp1/2N5/3P4/1QP5/PP3PPP/3RR1K1 b - - 3 19",
    "solution": "f6d7",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "009XT",
    "fen": "rn1qk2r/pp3ppp/3bp1N1/3p4/3Pn3/3BB3/PPP2PPP/RN1Q1RK1 b kq - 0 10",
    "solution": "d6h2",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "009YT",
    "fen": "rqnr2k1/5ppp/p7/4p3/8/1P5P/PBP2PP1/R2R2K1 w - - 0 24",
    "solution": "d1d8",
    "theme": "BackRankMate",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (BackRankMate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "009aD",
    "fen": "r4k1r/pp3pp1/4p3/3pP1np/6Pq/1PP5/P3B1PP/RN1Q1RK1 b - - 0 14",
    "solution": "h5g4",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "009bR",
    "fen": "4r2k/3q3r/1p4pQ/p1pP4/2P4P/1N4p1/PP3RK1/8 w - - 2 38",
    "solution": "f2f8",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "009bn",
    "fen": "2kr2r1/ppb2ppp/3qNn2/3p2B1/P7/2P2Q1P/1PB2PP1/R4RK1 b - - 0 18",
    "solution": "d6h2",
    "theme": "Mate",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "009eX",
    "fen": "2r3k1/7p/6q1/p1Np4/Qp2pr2/P4P2/1PR2P1K/6R1 b - - 1 36",
    "solution": "f4h4",
    "theme": "Mate",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "009f8",
    "fen": "8/1p4p1/pb2pp1p/3n1k2/3P4/P3BN1P/1P2KPP1/8 w - - 1 27",
    "solution": "f3h4",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "009fH",
    "fen": "rn2kb1r/pQ2pppp/2p2n2/8/3q2b1/8/PPP2PPP/RNB1KBNR b KQkq - 0 7",
    "solution": "d4d1",
    "theme": "Mate",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "009hH",
    "fen": "k3r3/p3q3/1pp5/3pnB2/1P1Q4/1KPP4/P3R3/8 b - - 1 41",
    "solution": "e5f3",
    "theme": "Advantage",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "009lk",
    "fen": "1R6/6pk/2p4p/3bP2r/5B1P/2P1RqP1/P4P1Q/6K1 b - - 3 40",
    "solution": "f3d1",
    "theme": "Mate",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "009oc",
    "fen": "5Q2/pbp3np/1p1pq1pk/1P6/P6P/6K1/8/8 w - - 0 33",
    "solution": "f8f4",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "009tE",
    "fen": "6k1/6pp/p1N5/1pP2bp1/5P2/8/PPP5/3K4 w - - 0 29",
    "solution": "c6e7",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "009uB",
    "fen": "3br1kr/7p/4p1pQ/P5P1/1B5P/P6q/5R2/6K1 w - - 2 36",
    "solution": "f2f8",
    "theme": "Mate",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "009wR",
    "fen": "1R2R3/p7/1p1k3p/1Pb5/P5p1/6P1/5r1P/7K b - - 7 41",
    "solution": "f2f1",
    "theme": "Endgame",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "009zR",
    "fen": "3Q4/p1p2ppp/4k3/8/5P2/4P3/Prqn2PP/3R1RK1 b - - 0 22",
    "solution": "d2f3",
    "theme": "DiscoveredAttack",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (DiscoveredAttack)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "009zS",
    "fen": "r3r1k1/1p3p1p/p1p3p1/8/6bP/Q3b1P1/PP2B3/R3K2R b KQ - 0 20",
    "solution": "g4e2",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00A1H",
    "fen": "2r3k1/4brp1/2p3b1/2Pp1qNp/3B3P/2P5/PP3P1K/R2Q2R1 b - - 2 31",
    "solution": "f5f4",
    "theme": "Crushing",
    "difficulty": 4,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00A5m",
    "fen": "8/1p6/p1p2p2/P3b3/1PK3P1/2PB4/3k4/8 w - - 4 61",
    "solution": "d3f5",
    "theme": "BishopEndgame",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (BishopEndgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00A5v",
    "fen": "4r1k1/pp1qr1p1/7p/2pPR3/2P2p2/1P3P2/P2Q2PP/4R1K1 b - - 4 33",
    "solution": "e7e5",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00A9Q",
    "fen": "2rq1rk1/1p3p1p/p1pn2p1/P1Np4/1P1PnP2/4P3/5PBP/R1Q3RK b - - 3 22",
    "solution": "e4f2",
    "theme": "KingsideAttack",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (KingsideAttack)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00AB1",
    "fen": "8/7Q/3p1kp1/1p6/2b5/2q4P/5PPK/8 w - - 0 37",
    "solution": "h7h8",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00AFG",
    "fen": "r4rk1/5ppp/p3bp2/2q2N1Q/Ppp5/8/1PP2PPP/R2R2K1 w - - 0 22",
    "solution": "f5h6",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00AGs",
    "fen": "rn5Q/4kp2/2p1p1r1/1q4p1/8/8/4NPPP/3R1K1R w - - 6 24",
    "solution": "h8d8",
    "theme": "Mate",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00AHY",
    "fen": "r6k/3NR1p1/4n2p/5b1P/p7/6R1/8/6K1 b - - 0 43",
    "solution": "a4a3",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00AOH",
    "fen": "6k1/8/1R2p1pp/4P3/p1N2P2/6PK/7P/1r6 b - - 0 48",
    "solution": "b1b6",
    "theme": "AdvancedPawn",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (AdvancedPawn)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00APl",
    "fen": "5k2/1p4r1/pb2qp1Q/8/8/3B1bP1/PP3P1P/2R3K1 w - - 1 30",
    "solution": "d3c4",
    "theme": "Advantage",
    "difficulty": 4,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00AVR",
    "fen": "br1qkb1r/p1p2ppp/4pn2/6B1/3Qn3/5NP1/P3PPBP/RN1R2K1 w k - 0 16",
    "solution": "d4a4",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00AXb",
    "fen": "5kr1/pp3p1p/1q2pBb1/1B1p4/P7/5P2/1P5P/2Q1K1rR w K - 1 22",
    "solution": "h1g1",
    "theme": "Advantage",
    "difficulty": 4,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Aae",
    "fen": "1R6/1P6/4pkp1/5p2/3P4/3KP2p/8/1r6 w - - 0 44",
    "solution": "b8f8",
    "theme": "AdvancedPawn",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (AdvancedPawn)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Aas",
    "fen": "3r1rk1/1p2q1pp/5p2/8/1P1n4/6Q1/PPBB1PPP/R4RK1 b - - 0 20",
    "solution": "d4e2",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00AbP",
    "fen": "6k1/pp3pp1/2p5/7b/4r2P/2P2N2/PP4K1/3R4 w - - 0 25",
    "solution": "d1d8",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Ac7",
    "fen": "8/2p1pk1p/Pp4p1/8/2P2P2/p2r2P1/3PR2P/3K4 w - - 0 34",
    "solution": "a6a7",
    "theme": "AdvancedPawn",
    "difficulty": 4,
    "playerColor": "white",
    "instruction": "Find the best move. (AdvancedPawn)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00AcQ",
    "fen": "8/1bpp2k1/1p5r/1P2P3/3P1P2/2P1n1K1/Q5P1/8 b - - 1 30",
    "solution": "h6g6",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00AdI",
    "fen": "3r4/4kp1p/1PQ1p1p1/p3b3/1p2P2P/1P5K/6P1/8 b - - 2 36",
    "solution": "d8d3",
    "theme": "Crushing",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Af3",
    "fen": "8/8/2B2p1p/P4Pp1/3p2P1/1b1Pb1kP/8/4K3 w - - 1 51",
    "solution": "a5a6",
    "theme": "AdvancedPawn",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (AdvancedPawn)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00AfZ",
    "fen": "2r3kq/Q7/8/1brpN3/5Pp1/4P1P1/6K1/1B6 w - - 0 44",
    "solution": "a7f7",
    "theme": "Master",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Master)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00AhO",
    "fen": "Q1b2rk1/2q2p1p/1p2pbp1/pP6/2P5/P2B1N2/5PPP/3R1RK1 b - - 0 20",
    "solution": "c8b7",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Ahb",
    "fen": "1k5r/pp1r1ppp/4p2n/1Nb2q2/2Pp4/6P1/PP3P1P/R1BQR1K1 w - - 3 15",
    "solution": "c1f4",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Al5",
    "fen": "2r3k1/p2B1pbp/1p2pnp1/n2p4/3P4/1Pr1P2P/P1QB1PP1/2R2RK1 b - - 0 19",
    "solution": "c3c2",
    "theme": "Advantage",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00AoZ",
    "fen": "8/1R6/p1pk4/2q3bp/1QP5/P7/KP6/3r4 w - - 3 45",
    "solution": "b7d7",
    "theme": "Advantage",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Aok",
    "fen": "5rk1/Q2B1R1p/4p1p1/3p4/3N2b1/2q5/Pr4PP/5RK1 b - - 0 23",
    "solution": "c3e3",
    "theme": "Crushing",
    "difficulty": 4,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Aq4",
    "fen": "2k1r3/pppn1pp1/3b2b1/3B2Pp/5P2/3P3P/PPPR4/2K3NR b - - 0 18",
    "solution": "e8e1",
    "theme": "BackRankMate",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (BackRankMate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Ar2",
    "fen": "r2q1r2/1n4pk/p6p/1ppN1pb1/3n1B2/P2PN2P/1PPQ1PP1/R3R1K1 b - - 1 21",
    "solution": "g5f4",
    "theme": "Advantage",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Au2",
    "fen": "r5r1/pp1k1p2/2p5/3pQ3/3P4/2NB4/PPP2q2/1K6 w - - 2 29",
    "solution": "d3f5",
    "theme": "Advantage",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00AuR",
    "fen": "8/4bkp1/R6P/4p3/Pp2P3/1P2r3/6P1/6K1 w - - 0 34",
    "solution": "h6h7",
    "theme": "AdvancedPawn",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (AdvancedPawn)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Aul",
    "fen": "4r3/1p3R1p/1pb2R1B/8/6k1/8/r6P/6K1 w - - 0 34",
    "solution": "f7g7",
    "theme": "Crushing",
    "difficulty": 5,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00B2k",
    "fen": "r4rk1/pbp3pp/1p1pp3/6B1/2PPp2q/3BP2P/PP3P2/R2QK1R1 b Q - 0 16",
    "solution": "h4f2",
    "theme": "AttackingF2F7",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (AttackingF2F7)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00B3B",
    "fen": "2KQ4/8/5b2/p1B5/P7/3k4/6p1/8 b - - 0 77",
    "solution": "f6d8",
    "theme": "Crushing",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00B7G",
    "fen": "1rb2r1k/4q2p/p2p4/3B1p2/1pPb4/1P2NQ2/P5PP/2R2R1K b - - 2 24",
    "solution": "e7e3",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00B8m",
    "fen": "3b4/3P4/pp2Pk2/5Q2/P6p/8/8/7K b - - 0 43",
    "solution": "f6f5",
    "theme": "Crushing",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00BCa",
    "fen": "1r6/p2kp1P1/3p4/2pP4/2P2B2/1N6/p4PK1/8 w - - 0 42",
    "solution": "b3c5",
    "theme": "AdvancedPawn",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (AdvancedPawn)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00BJm",
    "fen": "r4rk1/1Q2bppp/p1N1p3/1p1q4/2pP1n2/2P5/PP3PPP/R4RK1 w - - 2 19",
    "solution": "c6e7",
    "theme": "Advantage",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00BKa",
    "fen": "2r3k1/p1Rb1ppp/2n1pn2/8/8/2P3P1/q4PBP/1rNQK2R w K - 3 17",
    "solution": "c7c8",
    "theme": "Advantage",
    "difficulty": 5,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00BM8",
    "fen": "3r1rk1/pp2bppp/2ppnn2/8/N1P1P3/q1P4P/P2N2PB/R2Q1R1K w - - 1 17",
    "solution": "d2b1",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00BNd",
    "fen": "1rr3k1/4ppbp/3p1np1/1b1N4/P2BP3/5P2/P2R2PP/R5K1 w - - 0 22",
    "solution": "d5e7",
    "theme": "Advantage",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00BPh",
    "fen": "r4rk1/3p1p1p/p2NpQpq/1p1b4/3R4/P7/1P3PPP/3R2K1 w - - 10 24",
    "solution": "d4d5",
    "theme": "Advantage",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00BQD",
    "fen": "4r3/3R1pkp/6p1/1P6/1b6/5B2/1P1R1PPP/6K1 b - - 0 36",
    "solution": "e8e1",
    "theme": "BackRankMate",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (BackRankMate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00BSo",
    "fen": "2r3k1/4R1pp/p1p2p2/2N5/2P5/1Pb4P/P4PP1/6K1 b - - 0 25",
    "solution": "c3b4",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00BZ6",
    "fen": "1r1r1bk1/3n1p1p/1qp3p1/2N1p3/PpQ1P3/4BP2/4N1PP/1RR3K1 b - - 1 24",
    "solution": "f8c5",
    "theme": "Advantage",
    "difficulty": 4,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Bex",
    "fen": "1r2qrk1/6bp/2npb3/2pNpp2/2P5/3P1B2/1B3PPP/1R1QR1K1 w - - 1 23",
    "solution": "d5c7",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Bg0",
    "fen": "8/3k4/3P1K2/p4R2/5r2/5P2/8/8 b - - 2 57",
    "solution": "f4f5",
    "theme": "AdvancedPawn",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (AdvancedPawn)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Bg4",
    "fen": "3r2k1/1q3ppp/p3p3/Qp1r4/7P/P4P2/1PP3P1/1K1R3R w - - 0 22",
    "solution": "a5d8",
    "theme": "BackRankMate",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (BackRankMate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Bm8",
    "fen": "8/6kp/4b1q1/1p6/1PpPN2Q/2P1P3/r5P1/5RK1 b - - 0 34",
    "solution": "g6g2",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Bn0",
    "fen": "r1bqkb1r/pp1pnppp/2n5/1N2p3/5B2/8/PPP1PPPP/R2QKBNR w KQkq - 0 7",
    "solution": "b5d6",
    "theme": "Mate",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Bn4",
    "fen": "1k6/pp6/4nNp1/P3r2p/3p4/7P/3R1PPK/8 w - - 1 41",
    "solution": "f6d7",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00BnG",
    "fen": "4Q3/ppkr1pp1/2p3n1/2PP3p/1P6/4K3/P5P1/8 b - - 0 33",
    "solution": "d7e7",
    "theme": "Crushing",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Bot",
    "fen": "8/5p2/p3kr2/8/8/R1P5/4P3/4K3 w - - 0 53",
    "solution": "a3a6",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Bp0",
    "fen": "1r2kr2/pp3p1p/2b1p3/4N3/2P1n3/1N1B4/P3KP1P/6R1 w - - 5 22",
    "solution": "e5c6",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Bpq",
    "fen": "7k/pb1r2p1/1pq2n1p/2p1RP2/2P5/1NP1Q1BP/P7/5BK1 b - - 2 37",
    "solution": "c6h1",
    "theme": "Advantage",
    "difficulty": 4,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00BrZ",
    "fen": "r6r/pp2kb2/3p1p2/1N1Pp3/3bP3/P2B2P1/1P1Q2PP/7K b - - 7 28",
    "solution": "h8h2",
    "theme": "Attraction",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Attraction)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Bse",
    "fen": "8/5p2/1R6/6pk/8/3r2PP/5K2/8 w - - 4 41",
    "solution": "g3g4",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Bul",
    "fen": "rnbqk2r/pp3ppp/5n2/4N3/2p5/2P5/P1PPQPPP/R1B1K2R w KQkq - 0 9",
    "solution": "e5c6",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00C3O",
    "fen": "r2qkbnr/pp4pp/2p2p2/4n2b/2B1P3/2N2N2/PPP1Q1PP/R1B2RK1 b kq - 1 10",
    "solution": "h5f3",
    "theme": "Crushing",
    "difficulty": 4,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00C7m",
    "fen": "8/5k2/1P4RK/6P1/1r6/8/8/8 b - - 2 58",
    "solution": "b4h4",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00C8Y",
    "fen": "rnb2rk1/pp3p1p/3p2Pb/4p1q1/3pQ3/5N2/PPP1PPP1/RN2KB1R b KQ - 2 12",
    "solution": "g5c1",
    "theme": "Mate",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00C8e",
    "fen": "8/5p1k/5Ppb/2p3P1/qp6/8/KB5Q/8 w - - 5 59",
    "solution": "a2b1",
    "theme": "Endgame",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00CBU",
    "fen": "8/2pR3p/pb4pk/8/5p1P/B6K/P1r5/6r1 w - - 4 40",
    "solution": "a3f8",
    "theme": "Deflection",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Deflection)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00CFp",
    "fen": "rn1q3k/pp4pp/1b2B3/4N3/5Q2/2p5/PP4PP/RN5K b - - 0 16",
    "solution": "d8d1",
    "theme": "KingsideAttack",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (KingsideAttack)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00CMj",
    "fen": "7R/8/8/6p1/2p1p1k1/2Pb3p/P4K2/8 b - - 5 71",
    "solution": "e4e3",
    "theme": "Crushing",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00CNA",
    "fen": "rnbq1r1k/pp1n2b1/3pB1p1/4P1N1/5P2/2p5/PPP3P1/R1BQK3 w Q - 2 14",
    "solution": "d1d3",
    "theme": "Crushing",
    "difficulty": 5,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00CWE",
    "fen": "3r4/1p4p1/2pB1bBp/p1Pk4/3rp3/P7/1PK2P2/4R3 w - - 2 32",
    "solution": "g6f7",
    "theme": "Endgame",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00CXr",
    "fen": "r2k2nr/p3qBb1/1p1p3p/Q5p1/3n1B2/2N2R2/PPP3P1/R5K1 w - - 0 19",
    "solution": "a5d5",
    "theme": "Advantage",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00CYP",
    "fen": "3r1k1r/p1p2pp1/1p6/2pQ1b2/2Pn1P2/8/PP1P1KBq/R1B1R3 w - - 4 26",
    "solution": "d5d8",
    "theme": "HangingPiece",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (HangingPiece)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00CbV",
    "fen": "2r3k1/5p2/p3p1nQ/3pPP2/2qN4/6BP/7K/4b3 w - - 0 34",
    "solution": "f5f6",
    "theme": "Crushing",
    "difficulty": 4,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00CcK",
    "fen": "8/8/3p4/4kp2/1pP3pP/2RK2P1/8/8 b - - 0 42",
    "solution": "b4c3",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Cfq",
    "fen": "6k1/ppR2pp1/4p1p1/4P1N1/3r2P1/1P4K1/P3r3/8 w - - 6 31",
    "solution": "c7c8",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00CiZ",
    "fen": "5r1k/6b1/3p3p/1P1q2pQ/r5P1/3p1N1P/3R2P1/3R3K b - - 3 34",
    "solution": "f8f3",
    "theme": "Crushing",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00CpR",
    "fen": "6k1/B7/2p2pK1/3nr2p/8/1Q3PP1/P6r/8 w - - 1 32",
    "solution": "b3b8",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Cqg",
    "fen": "3r2k1/pp4bp/4qpp1/3Pp3/8/4Q2P/4B1P1/2rR3K w - - 0 27",
    "solution": "d5e6",
    "theme": "Advantage",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Cs4",
    "fen": "2r1q1k1/8/b2b1r1p/Pp1pNpp1/P2Pn3/1RPQ3P/2B1NPP1/4R1K1 b - - 0 28",
    "solution": "b5a4",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00CtS",
    "fen": "Q7/5qk1/p2p4/b1p1pr2/P7/6P1/4KP1R/8 w - - 4 39",
    "solution": "a8h8",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Cwz",
    "fen": "1r5r/5pk1/4p3/3p2PP/N1nP4/n1P5/P3B3/K1R4R b - - 0 34",
    "solution": "b8b1",
    "theme": "Mate",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00D12",
    "fen": "8/6pp/8/3kP3/1p1P2P1/1rpK3P/4R3/8 w - - 0 40",
    "solution": "e5e6",
    "theme": "Crushing",
    "difficulty": 4,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00D77",
    "fen": "5rk1/bpp3pp/p1npb3/4p3/1P2Nr2/P1PP3q/1B1QBPR1/2K3R1 w - - 0 22",
    "solution": "g2g7",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00DAs",
    "fen": "r6r/ppp1n1p1/3bBk1p/4nP2/3p4/8/PPPN1P1P/R1B1K2R w KQ - 2 16",
    "solution": "d2e4",
    "theme": "Mate",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00DBP",
    "fen": "5kr1/pp1b1p2/4p2p/2KpP2B/5P2/P5R1/7P/8 w - - 5 35",
    "solution": "g3g8",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00DBg",
    "fen": "rn2kbnr/pp6/2p2p2/4P3/4P1pq/2N3N1/PPPB1KB1/R2Q1R2 b kq - 2 17",
    "solution": "f8c5",
    "theme": "Advantage",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00DEc",
    "fen": "8/p5pk/1p3b1p/3r3P/6P1/3nBN2/P4PK1/3R4 b - - 4 30",
    "solution": "d3f4",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00DII",
    "fen": "2rr2k1/p5p1/1p5p/2pq1p1P/8/P4QR1/5PP1/4R1K1 w - - 0 32",
    "solution": "e1e8",
    "theme": "Advantage",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00DKr",
    "fen": "3r1k2/2p1R3/p2p2n1/1p6/1P1P2Q1/7P/5qPK/4R3 b - - 3 42",
    "solution": "g6e7",
    "theme": "Advantage",
    "difficulty": 4,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00DPI",
    "fen": "3r2k1/1B3p1p/6p1/3N4/3p2r1/8/5KP1/3R4 w - - 0 36",
    "solution": "d5f6",
    "theme": "Advantage",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00DPQ",
    "fen": "2k4r/pp3pp1/4pn2/2np2p1/8/1B1P1Pq1/PPPN3R/R2Q3K b - - 7 20",
    "solution": "g3h2",
    "theme": "KingsideAttack",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (KingsideAttack)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00DU5",
    "fen": "r2q1rk1/1b3ppp/p2p1b2/1p1Pn3/1P2Q3/P1NB3P/1B3PP1/R4RK1 w - - 3 18",
    "solution": "e4h7",
    "theme": "KingsideAttack",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (KingsideAttack)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00DUp",
    "fen": "8/8/1p2k1p1/4P2p/P2K1p1P/5P2/8/8 b - - 0 66",
    "solution": "g6g5",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00DWo",
    "fen": "b4b1r/3k1ppp/p2p4/1p2p3/3Pq3/N3B3/PP3PPP/R2Q1RK1 b - - 0 16",
    "solution": "e4g2",
    "theme": "KingsideAttack",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (KingsideAttack)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00DYf",
    "fen": "1R6/6kp/3p1pp1/2r1p3/PP6/8/2r2PPP/1R4K1 b - - 0 30",
    "solution": "c2c1",
    "theme": "BackRankMate",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (BackRankMate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00DZe",
    "fen": "8/5k2/7p/p1P1bPpP/Pp2P3/1P1p1K2/5B2/8 b - - 2 47",
    "solution": "g5g4",
    "theme": "BishopEndgame",
    "difficulty": 4,
    "playerColor": "black",
    "instruction": "Find the best move. (BishopEndgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00DcC",
    "fen": "5k2/6p1/p1b3Pp/2N2P1r/p7/8/1KP5/5R2 w - - 0 37",
    "solution": "c5e6",
    "theme": "Crushing",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00DdW",
    "fen": "5rk1/5ppp/4b3/1p1pPpPP/2pP4/b1P5/rqNQKP2/2RRN3 w - - 6 24",
    "solution": "c1b1",
    "theme": "Advantage",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00DkJ",
    "fen": "3r1bnr/2p2ppp/2bk4/R7/5P2/2N5/4N1PP/1R4K1 w - - 4 22",
    "solution": "b1d1",
    "theme": "Crushing",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Dke",
    "fen": "5bk1/2Q2p1p/5qp1/p7/P1Bp4/1P5P/2r2PP1/3R2K1 w - - 6 28",
    "solution": "c4f7",
    "theme": "Crushing",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Dlt",
    "fen": "r3kb1r/p4pp1/b1p4p/n3pQ2/4N3/2Nq4/PP1P1PPP/R1B2RK1 b kq - 1 14",
    "solution": "d3f1",
    "theme": "KingsideAttack",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (KingsideAttack)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Dt6",
    "fen": "5rk1/p4p1p/4p1p1/5nq1/8/5QPP/5PK1/1R1R4 b - - 7 35",
    "solution": "f5h4",
    "theme": "Crushing",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Dxh",
    "fen": "8/8/8/6R1/2pk2P1/1r5P/6K1/8 b - - 1 48",
    "solution": "c4c3",
    "theme": "AdvancedPawn",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (AdvancedPawn)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00DzI",
    "fen": "8/2p5/2P2k1p/2K1p3/3p2P1/3B1p2/7P/8 b - - 0 42",
    "solution": "f6g5",
    "theme": "BishopEndgame",
    "difficulty": 5,
    "playerColor": "black",
    "instruction": "Find the best move. (BishopEndgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00E29",
    "fen": "r1b2rk1/4bppp/p1n5/3q4/Pp6/3B1N2/1B3PPP/R2Q1RK1 w - - 0 18",
    "solution": "d3h7",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00E4Z",
    "fen": "1r4k1/p4p1p/6p1/3rb3/K7/2PpB3/1P1R1PPP/3R4 b - - 2 25",
    "solution": "d5d6",
    "theme": "Advantage",
    "difficulty": 4,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00EBZ",
    "fen": "3rr1k1/p4pp1/1pp4p/3pPQ2/1P3P2/2P2RqP/P2R2P1/6K1 b - - 2 24",
    "solution": "g3e1",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00EDN",
    "fen": "rnbq1rk1/p4ppp/1p2p3/2p5/2QPn3/B1P1PN2/P3BPPP/R4RK1 b - - 1 11",
    "solution": "c8a6",
    "theme": "Advantage",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00EDa",
    "fen": "r1bk3r/ppp1np1p/3P2pP/1N4q1/2BP1n2/8/PPP3P1/R1BQ2KR b - - 0 14",
    "solution": "g5g2",
    "theme": "KingsideAttack",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (KingsideAttack)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00EEp",
    "fen": "3k2q1/p2p3p/1p1P4/2p5/2P2Q1K/8/P5b1/5R2 w - - 3 37",
    "solution": "f4f8",
    "theme": "Endgame",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00EJb",
    "fen": "6k1/5pp1/2R1p2p/8/P1B5/1P4P1/1q3QKP/3r4 b - - 2 35",
    "solution": "d1d2",
    "theme": "Advantage",
    "difficulty": 4,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00ERL",
    "fen": "4r1k1/2Q4p/pp6/2p2n2/P2P1P1q/2P4P/2PB2b1/4R1K1 w - - 0 30",
    "solution": "e1e8",
    "theme": "Mate",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00EUB",
    "fen": "3r1k1r/5p1p/b2q1p2/P3p3/Bp2P3/2N2P2/3Q2PP/1R2K2R b K - 0 24",
    "solution": "d6d2",
    "theme": "Mate",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00EUu",
    "fen": "8/5P1P/1p4Kr/8/6P1/8/2p5/k7 w - - 1 63",
    "solution": "g6h6",
    "theme": "Crushing",
    "difficulty": 5,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00EWi",
    "fen": "8/8/5pkp/1RP5/1P3PKP/r7/8/8 b - - 0 48",
    "solution": "f6f5",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00EXM",
    "fen": "r1n3k1/3R1ppp/2p5/5P2/8/1P2r3/P7/5RK1 w - - 0 34",
    "solution": "d7d8",
    "theme": "BackRankMate",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (BackRankMate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00EXP",
    "fen": "2n3k1/p4ppp/2p1p3/P1NrP3/1N1r4/8/5PPP/1R1R2K1 b - - 0 29",
    "solution": "d4d1",
    "theme": "BackRankMate",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (BackRankMate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00EXS",
    "fen": "r3r1k1/p2Q1p1p/1p2p1p1/8/1P1P4/P3P3/1B2Nb1q/2KR3R b - - 1 19",
    "solution": "f2e3",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Ea3",
    "fen": "3r4/p5k1/1p1qpr1p/1Q1pn1p1/3P1pP1/1PP5/P5PP/4RRK1 w - - 0 30",
    "solution": "d4e5",
    "theme": "Crushing",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00EbJ",
    "fen": "r2q1rk1/ppp2ppp/2nbb3/6N1/6n1/2NPB3/PPP1BPPP/R2QK2R b KQ - 6 9",
    "solution": "g4e3",
    "theme": "CapturingDefender",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (CapturingDefender)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Ec4",
    "fen": "3q1r1k/p1r3pp/8/1p1BpPb1/2Pp2Q1/P2P2R1/6PP/R5K1 w - - 4 26",
    "solution": "g4g5",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00EdH",
    "fen": "r4rk1/pb3ppp/1p2p3/3q4/3N4/2P4P/PPQ2PP1/R4RK1 b - - 2 18",
    "solution": "d5g2",
    "theme": "KingsideAttack",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (KingsideAttack)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00EgR",
    "fen": "N2k3r/1b1n1Bpp/p3P3/1pb5/6P1/4p3/PPP4P/1K1R3R b - - 0 20",
    "solution": "b7h1",
    "theme": "Advantage",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Elq",
    "fen": "rn3q1r/4pk2/2pp1npp/p5Q1/1p1PPNP1/5P2/PPP5/R4KNR w - - 0 18",
    "solution": "g5g6",
    "theme": "Mate",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Enl",
    "fen": "2kr4/1pp5/p1b4R/2PpP3/3B2p1/2P1Q1Pp/PPq4P/5RK1 b - - 0 27",
    "solution": "c2g2",
    "theme": "Mate",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00EoE",
    "fen": "r1b5/ppr2k1p/5p2/5p2/8/2P3P1/P4PP1/4RK1R w - - 2 24",
    "solution": "h1h7",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Er4",
    "fen": "r3k2r/p1bN2pp/2p1Rp2/3p3b/3P1q2/2N4P/PPPQ1PP1/R5K1 b kq - 0 16",
    "solution": "e8d7",
    "theme": "Crushing",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Erm",
    "fen": "3r4/6k1/1p1pr1p1/p1p2p2/P1P1p1P1/1P1n4/3R1PBP/4R1K1 w - - 1 30",
    "solution": "d2d3",
    "theme": "Crushing",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Evs",
    "fen": "5qk1/pQ3p2/7p/b2N1bp1/P3r3/5K2/7P/R4B2 w - - 0 25",
    "solution": "d5f6",
    "theme": "Advantage",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Ezc",
    "fen": "rnb1k2r/ppp2q1p/3b2p1/3P1pBQ/4p2N/2N5/PPP2PPP/R3R1K1 w kq - 2 14",
    "solution": "c3e4",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00F1l",
    "fen": "8/2k1b3/5p2/RBpK1Pp1/P2p2P1/1p1P4/2r5/8 w - - 0 46",
    "solution": "a5a7",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00F2o",
    "fen": "6k1/4qpp1/3p3p/8/2BP4/1PQ5/3n1PPP/6K1 b - - 0 29",
    "solution": "e7e1",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00F3S",
    "fen": "3r1rk1/5ppp/p7/1p1P4/2Ppq3/P6Q/B4PPP/2R3K1 w - - 0 30",
    "solution": "a2b1",
    "theme": "Crushing",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00F5G",
    "fen": "2rqrbk1/pp3ppp/8/3p1N2/3NnnQ1/2P4P/PP3PP1/R4RK1 w - - 0 23",
    "solution": "f5h6",
    "theme": "Crushing",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00F6y",
    "fen": "2k3r1/pppb1prp/1q6/8/Q7/2P1R1P1/P4P1P/4R1K1 w - - 4 24",
    "solution": "e3e8",
    "theme": "Long",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Long)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00FAe",
    "fen": "5Rbk/6pp/8/p3P3/Pp1pq3/1Q6/1P4PP/6K1 b - - 2 35",
    "solution": "e4e1",
    "theme": "Crushing",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00FF5",
    "fen": "r3k3/ppp2p2/1b1p3p/4p2r/2B1P1bq/P1PP1P2/1P4PQ/RN3R1K w q - 3 19",
    "solution": "c4f7",
    "theme": "AttackingF2F7",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (AttackingF2F7)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00FGc",
    "fen": "1r4k1/5p2/2q3bp/4R3/p1r5/P1N5/KPP1Q2P/2R5 b - - 3 33",
    "solution": "c4c3",
    "theme": "Advantage",
    "difficulty": 5,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00FH6",
    "fen": "r6r/1q2bpk1/7p/p1p1pPpn/Pp2P1nP/1P1B1N2/1BP3P1/3RR1QK b - - 8 30",
    "solution": "h5g3",
    "theme": "Mate",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00FHO",
    "fen": "8/1pp5/p2p3p/3P1Pk1/P5P1/1P3K1R/8/2r5 b - - 2 39",
    "solution": "c1c3",
    "theme": "Crushing",
    "difficulty": 4,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00FHX",
    "fen": "2r3k1/5p1p/4pP2/3p3P/8/5P2/p5P1/1bR3K1 w - - 1 31",
    "solution": "c1c8",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00FND",
    "fen": "8/1P6/8/7p/3P4/3k1p1P/4p3/4K3 b - - 1 49",
    "solution": "d3e3",
    "theme": "AdvancedPawn",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (AdvancedPawn)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00FOM",
    "fen": "8/5k2/8/3pPPB1/1p4K1/8/8/3b4 w - - 1 46",
    "solution": "g4h4",
    "theme": "BishopEndgame",
    "difficulty": 5,
    "playerColor": "white",
    "instruction": "Find the best move. (BishopEndgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00FON",
    "fen": "1k6/8/8/6p1/1pp4P/p4PP1/N1P5/7K b - - 0 38",
    "solution": "b4b3",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00FPo",
    "fen": "7R/1K3p2/6k1/PP6/6p1/6rp/8/8 w - - 0 48",
    "solution": "a5a6",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00FaB",
    "fen": "2k2bn1/ppp2Nrp/2b1p3/3q2BQ/8/2N5/PP3PPP/R4RK1 b - - 6 18",
    "solution": "d5g2",
    "theme": "KingsideAttack",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (KingsideAttack)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Feu",
    "fen": "4Rrk1/p6p/1pp2rp1/8/5B1q/4QP1P/P1P2PK1/8 w - - 3 29",
    "solution": "f4g5",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00FjB",
    "fen": "rnbk1r2/pppp1Bpp/8/5p2/4p3/2PP4/P1P2PPP/R1B1K2R w KQ - 1 14",
    "solution": "c1g5",
    "theme": "DoubleBishopMate",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (DoubleBishopMate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Flp",
    "fen": "r2q1rk1/ppp2ppp/2n5/3p2N1/3P4/1B5P/P1Q2PP1/R1B2bK1 w - - 0 17",
    "solution": "c2h7",
    "theme": "KingsideAttack",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (KingsideAttack)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00G0z",
    "fen": "Q4n1k/p2b2pp/3b4/2p5/4Nq2/2Pn3P/PP2BPP1/R1B2RK1 b - - 0 23",
    "solution": "f4h2",
    "theme": "Mate",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00G1l",
    "fen": "5k2/1R6/3pp1P1/2p5/1p2PK2/5P2/8/2r5 w - - 1 61",
    "solution": "f4g5",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00G7g",
    "fen": "3r1rk1/p4pp1/b1p4p/8/BPP5/P2P3P/2Q3P1/qNB4K w - - 0 28",
    "solution": "c1b2",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00G81",
    "fen": "3r4/5k2/p4Pp1/2K3Pp/2R5/P7/8/8 b - - 0 51",
    "solution": "d8c8",
    "theme": "Crushing",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00GAf",
    "fen": "r5k1/5pp1/1p1rb1qp/3pR3/p1pP4/P1P3Q1/5PPN/4R1K1 w - - 2 31",
    "solution": "g3g6",
    "theme": "Crushing",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00GBV",
    "fen": "3r1rk1/pp2n1pp/3q4/8/N7/1PB5/P3QPPP/4R1K1 w - - 2 26",
    "solution": "e2e7",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00GBX",
    "fen": "r6k/pp2n1pp/2nN4/4p1r1/1PB5/2P4b/P3Nb1P/R2R3K w - - 0 23",
    "solution": "d6f7",
    "theme": "Advantage",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00GHw",
    "fen": "r1bq1r2/1p4kp/4p1p1/1NpPp1P1/2P1P3/pPQ4B/P7/2KR3n w - - 0 22",
    "solution": "c3e5",
    "theme": "Advantage",
    "difficulty": 5,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00GRa",
    "fen": "1r3rk1/2p1qppb/p2n4/1p2p1Pp/4Qn1P/2P1N3/PPB2P1K/3R2R1 w - - 0 29",
    "solution": "e4h7",
    "theme": "KingsideAttack",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (KingsideAttack)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00GVf",
    "fen": "5k2/3b2q1/pn4p1/1rp2p2/8/8/1P2Q1P1/1K2R2R w - - 4 33",
    "solution": "h1h8",
    "theme": "Crushing",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00GWg",
    "fen": "1r1r2k1/pN4pp/2n1b3/2R2p2/2P1p3/8/P4PPP/3BR1K1 b - - 0 26",
    "solution": "b8b7",
    "theme": "Crushing",
    "difficulty": 4,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00GY4",
    "fen": "3k2r1/pR5R/3r4/4p3/7q/3Pn1PP/PP5K/8 w - - 0 28",
    "solution": "b7b8",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00GYk",
    "fen": "1r4k1/p3p1bp/1n4p1/4q1B1/6Q1/1P4pP/P5B1/3R3K w - - 1 30",
    "solution": "g5f4",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Gc5",
    "fen": "8/p1r2p2/4r3/2P1PK2/1P4R1/3R2pk/8/8 b - - 3 46",
    "solution": "e6e5",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00GiQ",
    "fen": "5r2/5p1k/6pp/ppqp1P2/7Q/5N2/6PP/5N1K w - - 0 32",
    "solution": "f3g5",
    "theme": "Attraction",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Attraction)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Go6",
    "fen": "2k5/1pp2pp1/p3p1p1/3pP2r/Q7/2P1N1P1/PP4P1/2Kn3r w - - 0 21",
    "solution": "a4e8",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00GoO",
    "fen": "r1b2rk1/ppb5/2p4p/2Ppqpp1/1P6/2NBP3/P4PPP/2RQ1RK1 b - - 1 16",
    "solution": "e5h2",
    "theme": "KingsideAttack",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (KingsideAttack)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Gt0",
    "fen": "R7/4k3/5p2/3p2p1/4b2p/2K1PP1P/6P1/8 b - - 0 47",
    "solution": "d5d4",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00GuD",
    "fen": "1n5k/6p1/p2q1rPp/1ppB4/8/3P4/PPP1rPQ1/2K4R w - - 0 26",
    "solution": "h1h6",
    "theme": "AdvancedPawn",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (AdvancedPawn)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00GuG",
    "fen": "8/7p/1KR3k1/8/5p2/5n2/8/8 b - - 1 63",
    "solution": "g6f5",
    "theme": "Advantage",
    "difficulty": 5,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Gv1",
    "fen": "3R4/1pp1r1kp/4r1p1/p1P5/5Q2/P4PPq/1P5P/3R2K1 b - - 3 32",
    "solution": "e6e1",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Gvp",
    "fen": "8/2kn1p2/8/3P4/R7/2PKN3/1r6/8 b - - 14 70",
    "solution": "d7c5",
    "theme": "Advantage",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Gvr",
    "fen": "8/1b4p1/1k3pPp/4K2P/4PP2/8/8/8 w - - 0 47",
    "solution": "e5e6",
    "theme": "Advantage",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Gyu",
    "fen": "r1b1k1nr/1pp2p2/p7/1q5p/6p1/4PP2/PPPQ1P2/2KR3R w kq - 0 18",
    "solution": "d2d8",
    "theme": "Mate",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Gz6",
    "fen": "r7/p4kp1/1p4p1/2qNn3/Q7/4PP2/PP3K2/6R1 w - - 1 26",
    "solution": "a4f4",
    "theme": "Crushing",
    "difficulty": 4,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00H1C",
    "fen": "r3r3/1kpR1qpp/p1n2p2/Qp2P2P/1N6/4Pb2/PPP3P1/2K2R2 w - - 1 23",
    "solution": "a5c7",
    "theme": "Mate",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00H2I",
    "fen": "4rrk1/ppp2pp1/7p/3n4/3P3q/1P2p2P/PB4P1/R2QRBK1 b - - 3 23",
    "solution": "h4f2",
    "theme": "Crushing",
    "difficulty": 4,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00H2L",
    "fen": "8/8/2p2p2/p4P1p/Pk5P/3K2P1/8/8 b - - 2 39",
    "solution": "c6c5",
    "theme": "Crushing",
    "difficulty": 4,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00H5n",
    "fen": "8/5Rpk/3p3p/p1qPp3/P7/5N1P/1Q3nPK/2r5 w - - 0 36",
    "solution": "b2b7",
    "theme": "Advantage",
    "difficulty": 5,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00H87",
    "fen": "6k1/4pp2/p5pB/2p4n/3pP1Q1/P2P2qP/1r4P1/5RK1 w - - 2 31",
    "solution": "g4c8",
    "theme": "Attraction",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Attraction)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00H8a",
    "fen": "5bk1/2R4p/6p1/8/4NP1P/3bP1K1/r7/8 w - - 3 46",
    "solution": "e4f6",
    "theme": "ArabianMate",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (ArabianMate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00H9n",
    "fen": "7k/6p1/8/4p3/Pp1Q4/1P3b1q/6P1/5RK1 b - - 0 45",
    "solution": "h3g2",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00HAM",
    "fen": "q4r1k/1p3Qpp/1n6/3P2pP/2PP2P1/1P6/2K5/5R2 w - - 0 30",
    "solution": "f7f8",
    "theme": "BackRankMate",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (BackRankMate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00HDS",
    "fen": "6k1/pp2R3/6pp/8/2r5/P4BbP/1P4P1/6K1 w - - 4 39",
    "solution": "f3d5",
    "theme": "Crushing",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00HEh",
    "fen": "3r2k1/pp3ppp/2p3b1/2n3P1/2B2q1P/5N2/PPP1QP2/4R1K1 w - - 0 24",
    "solution": "e2e8",
    "theme": "KingsideAttack",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (KingsideAttack)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00HEx",
    "fen": "R7/5pk1/4pn1p/8/3NP3/5P2/6PP/2rB2K1 b - - 0 31",
    "solution": "c1d1",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00HGG",
    "fen": "8/pp6/2p1kpp1/3p2P1/3P1P1p/1P3K2/P1P4P/8 b - - 0 31",
    "solution": "f6g5",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00HHN",
    "fen": "4r2k/p4R1p/1p6/2p5/2P5/1P4R1/r5PP/2K5 b - - 1 32",
    "solution": "e8e1",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00HIV",
    "fen": "8/8/1p1k1n2/4p2p/1PP2pp1/3K4/3N1PPP/8 w - - 0 38",
    "solution": "d2e4",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00HJd",
    "fen": "r1bqkb1r/pp2pppp/2p2n2/2P1N3/2BP1n2/8/PP3PPP/RN1QR1K1 w kq - 0 13",
    "solution": "c4f7",
    "theme": "AttackingF2F7",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (AttackingF2F7)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00HLP",
    "fen": "r4rk1/3nqpp1/4p2p/1p2P3/2pn1Q2/P6N/1P3PPP/1B1R1RK1 b - - 1 24",
    "solution": "d4e2",
    "theme": "Crushing",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00HPz",
    "fen": "6r1/7p/2pk1p2/P2p4/P2KbP2/2N1P3/5R1P/8 b - - 2 35",
    "solution": "c6c5",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00HZC",
    "fen": "4r1k1/pp1qn3/2p4R/6p1/3P2r1/3Q2P1/PP3P1P/6K1 w - - 0 32",
    "solution": "d3h7",
    "theme": "Endgame",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00HZa",
    "fen": "6k1/6pp/1p6/p1n5/4q3/1P2pN2/P4PPP/3Q2K1 w - - 0 29",
    "solution": "d1d8",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00HeG",
    "fen": "8/1p5k/p3p1q1/3pP3/2p3PQ/2P5/PP6/2K5 b - - 4 33",
    "solution": "g6h6",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Hfa",
    "fen": "6k1/5ppp/5Bq1/8/p3R3/P6P/5rB1/R5K1 w - - 0 30",
    "solution": "e4e8",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Hk4",
    "fen": "5rk1/p4ppp/4p3/1Q6/1P1BN1b1/8/Pq3PPP/2R1KB1R b K - 0 18",
    "solution": "b2c1",
    "theme": "Mate",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00HnR",
    "fen": "q5kr/p4p2/4b1p1/4B2p/5n2/2P5/P1Q2PPP/3R1RK1 b - - 0 21",
    "solution": "a8g2",
    "theme": "Master",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Master)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00HoG",
    "fen": "5r1k/8/2b2rQp/1p1p2p1/1q4P1/8/8/1B3R1K w - - 0 37",
    "solution": "g6h7",
    "theme": "Mate",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Hpe",
    "fen": "1rr3k1/4Qppp/q3p3/p2pn3/3N4/4P2P/5PP1/RR4K1 w - - 0 30",
    "solution": "b1b8",
    "theme": "Advantage",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00HqY",
    "fen": "8/6p1/8/8/4P2k/5KpP/8/8 w - - 4 47",
    "solution": "f3g2",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Htd",
    "fen": "rnbqk2r/1p3ppp/p4b2/2PQ4/8/2N2N2/PP2PPPP/R3KB1R b KQkq - 0 9",
    "solution": "f6c3",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Hut",
    "fen": "r4rk1/4p1bp/3p2p1/q1pP1P2/4QP2/4B3/1pK4P/1B1R3R b - - 1 22",
    "solution": "a5c3",
    "theme": "Mate",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Huv",
    "fen": "3r1q2/5prk/p3pQpp/1p2P3/2p4R/2P2P1P/PPB2P2/6K1 w - - 3 30",
    "solution": "h4h6",
    "theme": "Clearance",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Clearance)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Hxb",
    "fen": "1rb2k2/p4ppp/2B5/2pr1NP1/2P5/P7/7P/4R1K1 w - - 0 28",
    "solution": "e1e8",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00HzH",
    "fen": "5rk1/p2q2p1/1p2p1Np/3p3P/3Pb1P1/2P5/PP3R2/6K1 w - - 0 34",
    "solution": "f2f8",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00HzR",
    "fen": "8/8/p2k4/1pp5/7P/1PKP1RP1/7r/8 b - - 1 46",
    "solution": "b5b4",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00HzX",
    "fen": "4r1k1/5pp1/7R/1p6/8/1PP3QP/2q2PP1/6K1 b - - 0 29",
    "solution": "c2c1",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00I8g",
    "fen": "4rk2/3Rnrp1/8/4Q1P1/8/6K1/8/8 b - - 0 50",
    "solution": "e7f5",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00ICz",
    "fen": "2k3r1/1p1q3p/1p2p3/1NbpQr2/P1p2P2/6P1/6KP/R4R2 w - - 1 32",
    "solution": "b5a7",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00IDw",
    "fen": "4r3/pN3kpp/2N1b3/2R5/5b2/P5P1/1P3P1P/7K b - - 0 30",
    "solution": "e6h3",
    "theme": "Advantage",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00IDz",
    "fen": "8/5P2/2p5/K2b3p/7N/P1k5/8/8 b - - 0 63",
    "solution": "d5f7",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00IEW",
    "fen": "2r3k1/6p1/R6p/3P1N2/8/3K4/5b2/8 w - - 6 58",
    "solution": "f5e7",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00IF1",
    "fen": "1k6/p1p5/P2p4/3P4/1PK2r1p/4P3/8/4B3 w - - 0 58",
    "solution": "e3f4",
    "theme": "Crushing",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00IF7",
    "fen": "b3k2r/4bpp1/2q1p2p/1p1nP3/1Pp1N3/2P1B3/2B2PPP/3QR1K1 b k - 1 19",
    "solution": "d5c3",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00IFk",
    "fen": "r1b4r/ppk2ppp/2p5/6B1/2P5/2n3P1/P1P1B2P/2KR3R w - - 1 17",
    "solution": "g5f4",
    "theme": "Attraction",
    "difficulty": 4,
    "playerColor": "white",
    "instruction": "Find the best move. (Attraction)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00IHi",
    "fen": "8/8/1k6/8/p7/1p1N2P1/5KP1/r3R3 b - - 1 55",
    "solution": "a1e1",
    "theme": "AdvancedPawn",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (AdvancedPawn)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00IKw",
    "fen": "3r2k1/pp1P1p1p/6p1/2R1P2r/5P2/6Pq/3Q3P/3R2K1 b - - 2 33",
    "solution": "d8d7",
    "theme": "Advantage",
    "difficulty": 5,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00IMS",
    "fen": "1r4k1/r5q1/p2p1pP1/4pn2/2p1P2Q/2Pb1BK1/P6R/2R5 w - - 0 36",
    "solution": "e4f5",
    "theme": "Clearance",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Clearance)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00IPp",
    "fen": "4Q3/6pk/p3p2p/5P2/1p1P4/4q2P/2B1n2B/7K b - - 0 35",
    "solution": "e3f3",
    "theme": "Endgame",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00ISm",
    "fen": "5r2/5p1k/2ppq1p1/4p1b1/4N2P/3P4/1P1R1P2/4K1R1 w - - 0 30",
    "solution": "e4g5",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00ITc",
    "fen": "3r1rk1/5pp1/7p/8/b2Qp1n1/1P6/PB1q1PP1/R5K1 w - - 0 26",
    "solution": "d4g7",
    "theme": "Mate",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00IUT",
    "fen": "1r2r1k1/ppp1q1pp/4b3/4P3/1Q1R1P2/8/P5PP/R1B3K1 b - - 0 19",
    "solution": "c7c5",
    "theme": "Crushing",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00IUW",
    "fen": "8/2p1r1kp/5pp1/3P3r/4P3/2N1QbPq/PPP2R1P/5RK1 b - - 4 23",
    "solution": "h3g3",
    "theme": "Clearance",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (Clearance)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00IYg",
    "fen": "r1b2r2/pp2n1p1/1qn1ppk1/3pP1N1/3P3P/P7/1P1Q1PP1/RN2K2R w KQ - 0 14",
    "solution": "h4h5",
    "theme": "Advantage",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00IaZ",
    "fen": "4R3/4R3/1k1K2p1/1P6/1P6/2rp3r/8/8 w - - 4 46",
    "solution": "e8b8",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00IbM",
    "fen": "6k1/5rp1/Q2B3p/P1Pp4/1P6/2q1P2P/6P1/6K1 b - - 0 34",
    "solution": "c3e1",
    "theme": "Advantage",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00IiM",
    "fen": "r5k1/pp4p1/1n6/3pB3/3P2pb/2N2Q2/PP6/2K3R1 b - - 0 24",
    "solution": "g4f3",
    "theme": "Advantage",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00InW",
    "fen": "8/2p5/pp1p4/3P1N2/PPP1Pp2/5n1p/5K1k/8 w - - 0 47",
    "solution": "f2f3",
    "theme": "Crushing",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00IpT",
    "fen": "r1b4r/pppkn2p/3pNQ2/8/2BpP2p/8/PPPq2PP/R5K1 w - - 3 22",
    "solution": "f6h8",
    "theme": "Crushing",
    "difficulty": 4,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00IqI",
    "fen": "r5k1/pp3ppp/2p5/4pb2/2n2q2/P1P2P2/1P1Q3P/3R1R1K w - - 0 23",
    "solution": "d2d8",
    "theme": "BackRankMate",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (BackRankMate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00Ivf",
    "fen": "8/2p4r/1p3k2/p2PR1p1/P1P2pP1/1P3P1r/4R1K1/8 b - - 0 46",
    "solution": "h3h2",
    "theme": "Endgame",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00J1Y",
    "fen": "1q3r2/p5k1/1p2pbpp/2p5/2P1p3/2P2PQP/PP3P2/6RK w - - 0 30",
    "solution": "g3g6",
    "theme": "Deflection",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Deflection)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00J1t",
    "fen": "r1qr3k/pp3pb1/1np1p3/8/3P3P/2N2PR1/PP1Q2P1/2KR4 w - - 0 23",
    "solution": "d2g5",
    "theme": "ExposedKing",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (ExposedKing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00J5q",
    "fen": "8/5Qpk/4p3/1p6/8/pq1bB2P/5PP1/6K1 w - - 0 33",
    "solution": "e3d4",
    "theme": "Crushing",
    "difficulty": 4,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00J5r",
    "fen": "r4rk1/1p4p1/p1p1n1PR/q3p3/4P3/2N1QP2/PPP5/2KR4 b - - 0 21",
    "solution": "g7h6",
    "theme": "Crushing",
    "difficulty": 4,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00J7i",
    "fen": "3r2k1/pQ4pp/4p1n1/2q5/2P5/2B3P1/P4PBP/6K1 w - - 0 25",
    "solution": "b7g7",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00JAo",
    "fen": "8/5r2/7k/6pp/7P/5PK1/R7/8 w - - 0 59",
    "solution": "a2a6",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00JET",
    "fen": "6k1/5ppp/3rp3/8/8/8/1P3PPP/2R3K1 w - - 0 35",
    "solution": "c1c8",
    "theme": "BackRankMate",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (BackRankMate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00JFF",
    "fen": "4r1k1/ppqb4/6p1/3pb2Q/8/2P5/PP1B2PP/5RK1 w - - 0 21",
    "solution": "h5g6",
    "theme": "Crushing",
    "difficulty": 4,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00JH5",
    "fen": "8/2Q2pk1/8/3pp2P/2q5/2P5/KP6/8 w - - 2 37",
    "solution": "c7c4",
    "theme": "Crushing",
    "difficulty": 4,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00JMV",
    "fen": "8/1p4pk/pPp4b/P1P1P3/3pq1b1/8/6PP/2B1QRK1 b - - 1 32",
    "solution": "e4e1",
    "theme": "Advantage",
    "difficulty": 4,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00JO7",
    "fen": "5rk1/pp4pR/4p1r1/2qp4/8/2P4Q/PP3RPP/6K1 w - - 1 23",
    "solution": "h7h8",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00JQS",
    "fen": "7k/pb3rpp/2p5/5p2/3P4/8/PPP2PPP/4R1K1 w - - 0 22",
    "solution": "e1e8",
    "theme": "BackRankMate",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (BackRankMate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00JR7",
    "fen": "r5k1/pp2q1p1/2p1p2p/3nP1pP/3P2P1/2PQ1r2/PPB5/R5K1 w - - 0 24",
    "solution": "d3h7",
    "theme": "KingsideAttack",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (KingsideAttack)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00JS1",
    "fen": "2r5/1p2k1pp/4p3/1N3p2/5P2/P2nP3/3R2PP/6K1 b - - 1 24",
    "solution": "c8c1",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00JYV",
    "fen": "r2q1rk1/p1p1bppp/2pp2b1/4p3/4n1PN/2NP3P/PPP2PK1/R1BQ1R2 w - - 0 12",
    "solution": "h4g6",
    "theme": "Advantage",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00JZk",
    "fen": "7k/5q1p/3Q2p1/8/P3p3/1p2B2P/1br3P1/R5K1 w - - 1 33",
    "solution": "a1f1",
    "theme": "Crushing",
    "difficulty": 4,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00JaW",
    "fen": "8/8/rk5p/3R2p1/4p1P1/4P3/3K4/8 w - - 0 49",
    "solution": "d5d6",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00JfN",
    "fen": "r6r/1bpnk3/1p1pB3/pP1P4/P3PQP1/2b2N1q/2P2P2/R3R1K1 w - - 0 25",
    "solution": "f4f7",
    "theme": "Mate",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00JqT",
    "fen": "2r2rk1/pp2R3/5p2/3p1q2/3P2P1/4QP1p/PP3R1P/6K1 b - - 0 30",
    "solution": "f5b1",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00JsQ",
    "fen": "r1b1k1nr/pp2p2p/2q1Npp1/2n1p3/2B5/2N3B1/PPPR1PPP/2K4R w kq - 0 15",
    "solution": "d2d8",
    "theme": "Mate",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Mate)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00JtR",
    "fen": "1rbk3r/3qp1b1/p3P1Bp/1N4p1/8/P5P1/1P2Q1P1/R3K2R b KQ - 0 23",
    "solution": "d7b5",
    "theme": "Crushing",
    "difficulty": 4,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00JzT",
    "fen": "8/7K/6p1/5p2/4p3/1k4P1/5P1P/8 b - - 0 44",
    "solution": "g6g5",
    "theme": "Crushing",
    "difficulty": 3,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00K0G",
    "fen": "8/8/8/2Pk4/pK4p1/3N4/4bP2/8 w - - 8 60",
    "solution": "d3f4",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00K48",
    "fen": "6k1/6pp/p2B4/2pP4/P1q5/6P1/2P1p2P/5RK1 w - - 0 27",
    "solution": "f1f8",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00K7b",
    "fen": "7k/1p4p1/pP1r4/4qp2/P2Nn3/1Q5P/2N5/3R1K2 b - - 5 48",
    "solution": "e5f4",
    "theme": "Advantage",
    "difficulty": 4,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00K8j",
    "fen": "r2q2kr/p1B2pp1/4b2p/n1Qn4/8/4P3/PP3PPP/2KR1BNR b - - 2 14",
    "solution": "d8c7",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00KHR",
    "fen": "8/6pk/1Q1p2n1/4p3/2P3P1/P2PPK1P/1B6/4q3 b - - 2 35",
    "solution": "g6h4",
    "theme": "Endgame",
    "difficulty": 2,
    "playerColor": "black",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00KMV",
    "fen": "1r3k2/1p1q1p2/p2p2p1/2pP2bp/2P1n1n1/1PQ3P1/P3N1K1/3N1R1R w - - 0 29",
    "solution": "c3h8",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00KNB",
    "fen": "3r2k1/2r2p2/4p2p/4N1pQ/1p3P2/4P3/np3P1P/2q2BRK w - - 2 33",
    "solution": "h5h6",
    "theme": "Crushing",
    "difficulty": 5,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00KNK",
    "fen": "r3r1k1/p1p4p/3b4/6qN/4p3/1P1b1Q2/P2P1PP1/B5KR w - - 0 23",
    "solution": "h5f6",
    "theme": "Advantage",
    "difficulty": 3,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00KO5",
    "fen": "2r2rk1/3p1ppp/p3p3/1p6/6P1/3Q4/PP5q/1K2RR2 w - - 0 23",
    "solution": "f1h1",
    "theme": "Advantage",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Advantage)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00KOz",
    "fen": "8/r4k2/7R/3n1PK1/8/8/8/8 w - - 4 57",
    "solution": "h6h7",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00KSB",
    "fen": "7r/4kpRp/2p2p1P/p1P1n3/Pp6/1B6/5PP1/6K1 w - - 3 36",
    "solution": "f2f4",
    "theme": "Crushing",
    "difficulty": 2,
    "playerColor": "white",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00KVF",
    "fen": "4r1k1/p4ppp/bqp2n2/3p4/3P4/2Q5/PP3PPP/RNB1N1K1 b - - 2 16",
    "solution": "b6b5",
    "theme": "Crushing",
    "difficulty": 4,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00KVO",
    "fen": "4r3/R5p1/4r2p/3k1n2/3p4/P5B1/1P4PP/4R1K1 b - - 0 28",
    "solution": "e6e1",
    "theme": "Crushing",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Crushing)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00KVb",
    "fen": "2k2r2/pp5p/3p4/3Nb1p1/8/1P1P3P/P1PR4/1K3R2 b - - 0 28",
    "solution": "f8f1",
    "theme": "Endgame",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (Endgame)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00KYC",
    "fen": "5rk1/pR5p/2r1pBp1/4P3/2b5/3p4/P4PPP/4R1K1 b - - 1 27",
    "solution": "f8f6",
    "theme": "AdvancedPawn",
    "difficulty": 4,
    "playerColor": "black",
    "instruction": "Find the best move. (AdvancedPawn)",
    "successMessage": "Excellent! You found the solution."
  },
  {
    "id": "00KYE",
    "fen": "r1b2k1r/pp4p1/2pq2p1/3p4/3Q4/1N6/PPP2PPP/R4RK1 b - - 0 17",
    "solution": "d6h2",
    "theme": "KingsideAttack",
    "difficulty": 1,
    "playerColor": "black",
    "instruction": "Find the best move. (KingsideAttack)",
    "successMessage": "Excellent! You found the solution."
  }
];
