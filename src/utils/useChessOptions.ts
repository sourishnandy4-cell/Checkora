import { useState } from 'react';
import { Chess } from 'chess.js';

export function useChessOptions(
  chessInstance: Chess,
  onValidMove: (from: string, to: string) => boolean,
  isSolvingOrPlaying: boolean = true,
  showLegalMoves: boolean = true
) {
  const [optionSquares, setOptionSquares] = useState<Record<string, any>>({});
  const [moveFrom, setMoveFrom] = useState<string | null>(null);

  function getMoveOptions(square: string) {
    if (!showLegalMoves) return false;
    
    const moves = chessInstance.moves({
      square: square as any,
      verbose: true
    });
    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }

    const newSquares: Record<string, any> = {};
    moves.forEach((move) => {
      newSquares[move.to] = {
        background:
          chessInstance.get(move.to as any) && chessInstance.get(move.to as any)?.color !== chessInstance.get(square as any)?.color
            ? 'radial-gradient(circle, rgba(0,0,0,.35) 85%, transparent 85%)' // Capture circle
            : 'radial-gradient(circle, rgba(0,0,0,.25) 25%, transparent 25%)', // Empty square dot
        borderRadius: '50%'
      };
    });
    newSquares[square] = {
      backgroundColor: 'rgba(255, 255, 0, 0.4)' // Highlight clicked square
    };
    setOptionSquares(newSquares);
    return true;
  }

  function onSquareClick(square: string) {
    if (!isSolvingOrPlaying) return;
    
    // First click on a piece
    if (!moveFrom) {
      const hasMoveOptions = getMoveOptions(square);
      if (hasMoveOptions) setMoveFrom(square);
      return;
    }

    // Second click - attempting to move
    const isValid = onValidMove(moveFrom, square);
    
    if (!isValid) {
      // If move failed, maybe they clicked a different piece of theirs
      const hasMoveOptions = getMoveOptions(square);
      setMoveFrom(hasMoveOptions ? square : null);
    } else {
      // Move succeeded, clear options
      setMoveFrom(null);
      setOptionSquares({});
    }
  }

  function onPieceDragBegin(piece: string, sourceSquare: string) {
    if (!isSolvingOrPlaying) return;
    getMoveOptions(sourceSquare);
  }

  function onPieceDragEnd() {
    setOptionSquares({});
    setMoveFrom(null);
  }

  function clearOptions() {
    setOptionSquares({});
    setMoveFrom(null);
  }

  return {
    optionSquares,
    onSquareClick,
    onPieceDragBegin,
    onPieceDragEnd,
    clearOptions
  };
}
