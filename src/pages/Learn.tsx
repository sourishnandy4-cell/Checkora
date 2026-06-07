import React, { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { BookOpen, Compass, ArrowLeft, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { playSound } from '../utils/audio';

interface LessonStep {
  num: number;
  instruction: string;
  expectedMove: string; // e.g. "e2e4" or "g1f3"
  opponentMove?: string; // bot response
}

interface ChessLesson {
  id: string;
  name: string;
  category: 'openings' | 'tactics' | 'strategy' | 'endgames';
  difficulty: string;
  description: string;
  stepsCount: number;
  steps: LessonStep[];
  percentCompleted: number;
  startFen?: string; // Optional custom starting board position
  playerColor?: 'white' | 'black'; // The side the user plays from
}

const LESSON_DATABASE: ChessLesson[] = [
  {
    id: 'l1',
    name: 'Italian Opening',
    category: 'openings',
    difficulty: 'Beginner',
    description: 'Learn the oldest and most classic opening. Target the weak kingside f7 square.',
    stepsCount: 3,
    percentCompleted: 0,
    steps: [
      { num: 1, expectedMove: 'e2e4', instruction: 'Start by playing your pawn to e4. This claims the center e4/d5 squares.' },
      { num: 2, expectedMove: 'g1f3', opponentMove: 'e7e5', instruction: 'Black matched your pawn with e5. Develop your king knight to f3 to attack that pawn.' },
      { num: 3, expectedMove: 'f1c4', opponentMove: 'b8c6', instruction: 'Black defended with knight to c6. Bring your light-squared bishop to c4, targeting f7!' }
    ]
  },
  {
    id: 'l2',
    name: 'Ruy Lopez',
    category: 'openings',
    difficulty: 'Intermediate',
    description: 'Learn the Spanish Opening. Direct pressure on black\'s defending knight.',
    stepsCount: 3,
    percentCompleted: 0,
    steps: [
      { num: 1, expectedMove: 'e2e4', instruction: 'Open the game with pawn to e4 to secure central space.' },
      { num: 2, expectedMove: 'g1f3', opponentMove: 'e7e5', instruction: 'Develop your knight to f3 to exert pressure on black\'s e5 pawn.' },
      { num: 3, expectedMove: 'f1b5', opponentMove: 'b8c6', instruction: 'Instead of the Italian, play bishop to b5. This is the Ruy Lopez, pinning the knight!' }
    ]
  },
  {
    id: 'l3',
    name: 'Queen\'s Gambit',
    category: 'openings',
    difficulty: 'Advanced',
    description: 'Sacrifice a flank pawn to secure absolute control of the center.',
    stepsCount: 2,
    percentCompleted: 0,
    steps: [
      { num: 1, expectedMove: 'd2d4', instruction: 'Play d4 to claim central control of d4/e5 squares.' },
      { num: 2, expectedMove: 'c2c4', opponentMove: 'd7d5', instruction: 'Black matches with d5. Offer your c4 pawn in sacrifice to draw away black\'s center control!' }
    ]
  },
  {
    id: 'l8',
    name: 'Sicilian Defense',
    category: 'openings',
    difficulty: 'Intermediate',
    description: 'The most popular and aggressive response to 1. e4 as Black.',
    stepsCount: 3,
    percentCompleted: 0,
    playerColor: 'black',
    startFen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
    steps: [
      { num: 1, expectedMove: 'c7c5', opponentMove: 'g1f3', instruction: 'White opened with e4. Respond with c5 to fight for the d4 square from the flank!' },
      { num: 2, expectedMove: 'd7d6', opponentMove: 'd2d4', instruction: 'White develops their knight. Play d6 to control squares and prepare development.' },
      { num: 3, expectedMove: 'c5d4', instruction: 'White strikes in the center with d4! Capture it with your c-pawn to eliminate their central pawn.' }
    ]
  },
  {
    id: 'l9',
    name: 'French Defense',
    category: 'openings',
    difficulty: 'Intermediate',
    description: 'A solid, resilient opening for Black that immediately challenges the center.',
    stepsCount: 2,
    percentCompleted: 0,
    playerColor: 'black',
    startFen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
    steps: [
      { num: 1, expectedMove: 'e7e6', opponentMove: 'd2d4', instruction: 'White plays e4. Play e6 to prepare a solid pawn chain and support d5.' },
      { num: 2, expectedMove: 'd7d5', opponentMove: 'e4e5', instruction: 'White claims more space with d4. Strike back immediately in the center with d5!' }
    ]
  },
  {
    id: 'l10',
    name: 'Caro-Kann Defense',
    category: 'openings',
    difficulty: 'Advanced',
    description: 'Similar to the French, but allows your light-squared bishop to remain active.',
    stepsCount: 2,
    percentCompleted: 0,
    playerColor: 'black',
    startFen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
    steps: [
      { num: 1, expectedMove: 'c7c6', opponentMove: 'd2d4', instruction: 'White plays e4. Play c6 to prepare d5 without blocking your light-squared bishop.' },
      { num: 2, expectedMove: 'd7d5', opponentMove: 'b1c3', instruction: 'White plays d4. Challenge the center with d5!' }
    ]
  },
  {
    id: 'l11',
    name: 'London System',
    category: 'openings',
    difficulty: 'Beginner',
    description: 'A solid, systematic opening for White that can be played against almost anything.',
    stepsCount: 3,
    percentCompleted: 0,
    playerColor: 'white',
    steps: [
      { num: 1, expectedMove: 'd2d4', opponentMove: 'd7d5', instruction: 'Start by claiming the center with your d-pawn.' },
      { num: 2, expectedMove: 'c1f4', opponentMove: 'g8f6', instruction: 'Develop your dark-squared bishop to f4 outside the pawn chain. This is the hallmark of the London System.' },
      { num: 3, expectedMove: 'e2e3', opponentMove: 'e7e6', instruction: 'Solidify your center with e3. You now have a very difficult structure to break!' }
    ]
  },
  {
    id: 'l4',
    name: 'King\'s Shield: Castling',
    category: 'strategy',
    difficulty: 'Beginner',
    description: 'Learn the double-move rule that tucks your King into safety and activates your Rook.',
    stepsCount: 4,
    percentCompleted: 0,
    steps: [
      { num: 1, expectedMove: 'e2e4', instruction: 'Open the board with pawn to e4 to free your kingside pieces.' },
      { num: 2, expectedMove: 'g1f3', opponentMove: 'e7e5', instruction: 'Develop your knight to f3, preparing kingside castling.' },
      { num: 3, expectedMove: 'f1c4', opponentMove: 'b8c6', instruction: 'Bring your bishop to c4. Now all squares between your King and Rook are clear!' },
      { num: 4, expectedMove: 'e1g1', opponentMove: 'g8f6', instruction: 'Perform a kingside Castle! Move your King two squares to g1—the Rook will jump over automatically!' }
    ]
  },
  {
    id: 'l5',
    name: 'En Passant Capture',
    category: 'tactics',
    difficulty: 'Intermediate',
    description: 'Master chess\'s most unique pawn rule: capturing a pawn as it bypasses yours.',
    stepsCount: 1,
    percentCompleted: 0,
    startFen: 'rnbqkbnr/ppp1pppp/8/3pP3/8/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 2',
    steps: [
      { num: 1, expectedMove: 'e5d6', instruction: 'Black has just advanced their pawn two squares from d7 to d5, bypassing your pawn on e5. Capture it "in passing" by moving diagonally to d6!' }
    ]
  },
  {
    id: 'l6',
    name: 'Pawn Promotion',
    category: 'tactics',
    difficulty: 'Beginner',
    description: 'March a pawn to the other end of the board to transform it into a powerful Queen.',
    stepsCount: 1,
    percentCompleted: 0,
    startFen: '4k3/7P/8/8/8/8/8/4K3 w - - 0 1',
    steps: [
      { num: 1, expectedMove: 'h7h8', instruction: 'Your pawn is one step away from glory. Push your pawn to h8 to promote it to a Queen!' }
    ]
  },
  {
    id: 'l7',
    name: 'Scholar\'s Mate',
    category: 'tactics',
    difficulty: 'Beginner',
    description: 'Learn the rapid four-move checkmate and understand why f7 is the weakest pawn square.',
    stepsCount: 4,
    percentCompleted: 0,
    steps: [
      { num: 1, expectedMove: 'e2e4', instruction: 'Push your center e4 pawn forward.' },
      { num: 2, expectedMove: 'f1c4', opponentMove: 'e7e5', instruction: 'Bring your bishop to c4, aiming at black\'s weak f7 pawn.' },
      { num: 3, expectedMove: 'd1h5', opponentMove: 'b8c6', instruction: 'Develop your Queen aggressively to h5, multiplying the threat on f7!' },
      { num: 4, expectedMove: 'h5f7', instruction: 'Deliver the final blow! Capture the weak f7 pawn with your Queen. The black King has no escape!' }
    ]
  }
];

export const Learn: React.FC = () => {
  const { completedLessons, markLessonCompleted } = useGameStore();

  // Tabs: 'all' | 'openings' | 'tactics' | 'strategy'
  const [activeTab, setActiveTab] = useState<string>('all');
  
  // Selected Lesson state (null if list mode, lesson object if active)
  const [activeLesson, setActiveLesson] = useState<ChessLesson | null>(null);
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [lessonChess, setLessonChess] = useState<Chess>(new Chess());
  const [lessonFen, setLessonFen] = useState<string>('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  const [feedbackStatus, setFeedbackStatus] = useState<'solving' | 'correct' | 'complete'>('solving');

  useEffect(() => {
    if (activeLesson) {
      const chess = activeLesson.startFen ? new Chess(activeLesson.startFen) : new Chess();
      setLessonChess(chess);
      setLessonFen(chess.fen());
      setActiveStepIdx(0);
      setFeedbackStatus('solving');
    }
  }, [activeLesson]);

  const handleStartLesson = (lesson: ChessLesson) => {
    setActiveLesson(lesson);
  };

  const onPieceDrop = (sourceSquare: string, targetSquare: string): boolean => {
    if (!activeLesson || feedbackStatus !== 'solving') return false;

    const currentStep = activeLesson.steps[activeStepIdx];
    const moveUci = `${sourceSquare}${targetSquare}`;

    if (moveUci.toLowerCase() !== currentStep.expectedMove.toLowerCase()) {
      playSound.play('alarm'); // error pulse
      return false;
    }

    try {
      const tempChess = new Chess(lessonFen);
      const moveResult = tempChess.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q'
      });

      if (moveResult) {
        // Correct move made by player
        playSound.play('move');
        setLessonChess(tempChess);
        setLessonFen(tempChess.fen());

        // Process opponent move (if exists in step)
        if (currentStep.opponentMove) {
          setTimeout(() => {
            const oppFrom = currentStep.opponentMove!.slice(0, 2);
            const oppTo = currentStep.opponentMove!.slice(2, 4);
            
            tempChess.move({ from: oppFrom, to: oppTo });
            
            setLessonChess(new Chess(tempChess.fen()));
            setLessonFen(tempChess.fen());
            
            playSound.play('move');

            // Move to next step if possible
            if (activeStepIdx + 1 < activeLesson.steps.length) {
              setActiveStepIdx(prev => prev + 1);
            } else {
              setFeedbackStatus('complete');
              playSound.play('win');
              markLessonCompleted(activeLesson.id);
            }
          }, 900);
        } else {
          // If no opponent move, check if there are subsequent steps
          if (activeStepIdx + 1 < activeLesson.steps.length) {
            setActiveStepIdx(prev => prev + 1);
          } else {
            // Final step of the lesson
            setFeedbackStatus('complete');
            playSound.play('win');
            markLessonCompleted(activeLesson.id);
          }
        }

        return true;
      }
    } catch (err) {
      console.error(err);
    }

    return false;
  };

  const handleCloseLesson = () => {
    setActiveLesson(null);
  };

  const handleRestartLesson = () => {
    if (activeLesson) {
      const chess = activeLesson.startFen ? new Chess(activeLesson.startFen) : new Chess();
      setLessonChess(chess);
      setLessonFen(chess.fen());
      setActiveStepIdx(0);
      setFeedbackStatus('solving');
    }
  };

  const filteredLessons = LESSON_DATABASE.filter(lesson => {
    if (activeTab === 'all') return true;
    return lesson.category === activeTab;
  });

  const customBoardStyles = {
    customLightSquareStyle: { backgroundColor: 'var(--board-light)' },
    customDarkSquareStyle: { backgroundColor: 'var(--board-dark)' }
  };

  return (
    <div className="w-full h-full flex flex-col p-6 overflow-y-auto custom-scrollbar">
      {/* List / Coach view conditional */}
      {!activeLesson ? (
        <>
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-bg-border pb-4 mb-6 gap-4">
            <div>
              <h1 className="font-serif-header text-3xl font-bold tracking-tight">Chess Academy</h1>
              <p className="text-xs text-text-secondary mt-1">Acquire positional depth and master tactical structures in interactive tutorials.</p>
            </div>

            {/* Category tabs */}
            <div className="flex gap-1 bg-bg-surface p-1 border border-bg-border rounded-sm self-start">
              {[
                { id: 'all', label: 'All' },
                { id: 'openings', label: 'Openings' },
                { id: 'tactics', label: 'Tactics' },
                { id: 'strategy', label: 'Strategy' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1 text-xs uppercase font-mono-clock rounded-sm transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-text-primary text-bg-void font-bold'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Lessons card list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {filteredLessons.map(lesson => (
              <div
                key={lesson.id}
                onClick={() => handleStartLesson(lesson)}
                className="bg-bg-surface border border-bg-border p-6 rounded-sm flex flex-col justify-between hover:bg-bg-elevated hover:shadow-lg transition-all duration-200 cursor-pointer group relative overflow-hidden"
              >
                {/* Neon accent corner glow */}
                <div className="absolute top-0 right-0 w-1 h-1 bg-accent-primary" />
                
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-mono-clock uppercase bg-bg-void border border-bg-border px-2 py-0.5 rounded-sm text-text-muted">
                      {lesson.difficulty}
                    </span>
                    <span className="text-[10px] font-mono-clock text-accent-cyan uppercase tracking-wider font-semibold">
                      {lesson.category}
                    </span>
                  </div>

                  <h3 className="font-serif-header text-lg font-bold text-text-primary group-hover:text-accent-primary transition-colors flex items-center gap-2">
                    {lesson.name}
                    {completedLessons.includes(lesson.id) && <CheckCircle2 size={16} className="text-accent-green" />}
                  </h3>
                  <p className="text-xs text-text-secondary mt-2 leading-relaxed min-h-[40px]">
                    {lesson.description}
                  </p>
                </div>

                <button className="premium-btn py-2 text-xs uppercase font-mono-clock w-full flex items-center justify-center gap-1.5 mt-6 cursor-pointer">
                  Start Lesson <BookOpen size={12} />
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* COACH / INTERACTIVE PLAYER MODE */
        <div className="w-full flex-1 flex flex-col justify-center max-w-5xl mx-auto animate-fade-in">
          {/* Header row */}
          <div className="w-full flex items-center justify-between mb-4 border-b border-bg-border pb-3">
            <button
              onClick={handleCloseLesson}
              className="text-xs uppercase font-mono-clock text-text-secondary hover:text-text-primary flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft size={14} /> Close Lesson
            </button>
            
            <h2 className="font-serif-header text-lg font-bold text-text-primary">
              {activeLesson.name} — Step {activeStepIdx + 1}/{activeLesson.steps.length}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left side: interactive board */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center">
              <div className="w-full max-w-[440px] aspect-square border-4 border-bg-border rounded-sm shadow-xl relative">
                <Chessboard
                  id="CoachBoard"
                  position={lessonFen}
                  onPieceDrop={onPieceDrop}
                  boardWidth={432}
                  boardOrientation={activeLesson.playerColor || 'white'}
                  arePiecesDraggable={feedbackStatus === 'solving'}
                  customLightSquareStyle={customBoardStyles.customLightSquareStyle}
                  customDarkSquareStyle={customBoardStyles.customDarkSquareStyle}
                />

                {/* Lesson success screen */}
                {feedbackStatus === 'complete' && (
                  <div className="absolute inset-0 bg-void/90 flex flex-col items-center justify-center p-6 text-center z-25">
                    <div className="w-14 h-14 bg-accent-green/10 border border-accent-green/45 rounded-full flex items-center justify-center text-accent-green mb-4 animate-bounce">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="font-serif-header text-2xl font-bold mb-2">Lesson Complete!</h3>
                    <p className="text-xs text-text-secondary mb-6 max-w-xs leading-relaxed">
                      Outstanding! You have completed all theoretical steps for the **{activeLesson.name}**. You are ready to apply these rules in real matches!
                    </p>
                    <div className="flex gap-4">
                      <button
                        onClick={handleRestartLesson}
                        className="premium-btn py-2 px-5 text-xs font-mono-clock uppercase bg-bg-border"
                      >
                        Replay
                      </button>
                      <button
                        onClick={handleCloseLesson}
                        className="premium-btn-primary py-2 px-5 text-xs font-mono-clock uppercase"
                      >
                        Exit Class
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right side: Instructions card */}
            <div className="lg:col-span-5 bg-bg-surface border border-bg-border p-6 rounded-sm self-stretch flex flex-col justify-between">
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-1.5">
                  <Compass size={16} className="text-accent-cyan" />
                  <span className="text-[10px] font-mono-clock uppercase text-text-muted tracking-wider">Coach Instructions</span>
                </div>

                <div className="w-full border-t border-bg-border" />

                <p className="text-xs text-text-primary leading-relaxed bg-bg-void/50 border border-bg-border p-4 rounded-sm">
                  {activeLesson.steps[activeStepIdx].instruction}
                </p>

                {/* Progress Dot Indicators */}
                <div className="flex flex-col gap-2 mt-4 select-none">
                  <span className="text-[9px] font-mono-clock text-text-muted uppercase">Lesson Progress</span>
                  <div className="flex gap-2">
                    {activeLesson.steps.map((step, idx) => (
                      <span
                        key={step.num}
                        className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[8px] font-bold ${
                          idx < activeStepIdx
                            ? 'bg-accent-green border-accent-green text-void'
                            : idx === activeStepIdx
                              ? 'bg-bg-elevated border-text-primary text-text-primary animate-pulse'
                              : 'bg-bg-void border-bg-border text-text-muted'
                        }`}
                      >
                        {step.num}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Retry button */}
              <button
                onClick={handleRestartLesson}
                className="premium-btn py-2.5 text-xs uppercase font-mono-clock flex items-center justify-center gap-1.5 mt-8 w-full cursor-pointer"
              >
                <RefreshCw size={12} /> Reset Coach Steps
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Learn;
