import React, { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { BookOpen, Compass, ArrowLeft, ArrowRight, RefreshCw, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { playSound } from '../utils/audio';
import { useChessOptions } from '../utils/useChessOptions';
import { StockfishEngine } from '../engine/stockfish';
import { speechSynth } from '../utils/speech';

import { ChessLesson, LESSON_DATABASE } from '../data/lessons';

export const Learn: React.FC = () => {
  const { completedLessons, markLessonCompleted } = useGameStore();

  const [activeTab, setActiveTab] = useState<string>('all');
  
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const activeLesson = LESSON_DATABASE.find(l => l.id === activeLessonId) || null;

  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [lessonChess, setLessonChess] = useState<Chess>(new Chess());
  const [lessonFen, setLessonFen] = useState<string>('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  const [feedbackStatus, setFeedbackStatus] = useState<'solving' | 'correct' | 'complete'>('solving');
  const [pendingOpponentMove, setPendingOpponentMove] = useState<string | null>(null);
  
  const engineRef = React.useRef<StockfishEngine | null>(null);
  const [coachMessage, setCoachMessage] = useState<string | null>(null);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [voiceGender, setVoiceGender] = useState<'male' | 'female'>('female');
  const [isVoiceLoading, setIsVoiceLoading] = useState(false);

  useEffect(() => {
    speechSynth.setGender(voiceGender);
  }, [voiceGender]);

  useEffect(() => {
    speechSynth.onLoadingStateChange = (loading) => {
      setIsVoiceLoading(loading);
    };
    return () => {
      speechSynth.onLoadingStateChange = null;
    };
  }, []);

  // Stop speech immediately when voice is disabled
  useEffect(() => {
    if (!isVoiceEnabled) {
      speechSynth.stop();
    }
  }, [isVoiceEnabled]);

  // Initialize analysis engine
  useEffect(() => {
    engineRef.current = new StockfishEngine();
    return () => {
      if (engineRef.current) engineRef.current.terminate();
      speechSynth.stop();
    };
  }, []);

  useEffect(() => {
    if (activeLesson) {
      const chess = activeLesson.startFen ? new Chess(activeLesson.startFen) : new Chess();
      setLessonChess(chess);
      setLessonFen(chess.fen());
      setActiveStepIdx(0);
      setFeedbackStatus('solving');
      setPendingOpponentMove(null);
      setCoachMessage(null);
      speechSynth.stop();
      
      if (isVoiceEnabled && activeLesson.steps.length > 0) {
        setTimeout(() => speechSynth.speak(activeLesson.steps[0].instruction), 500);
      }
    }
  }, [activeLesson]); // Re-run if activeLesson changes, intentionally left out isVoiceEnabled to avoid re-speaking on toggle

  const onPieceDrop = (sourceSquare: string, targetSquare: string): boolean => {
    if (!activeLesson || feedbackStatus !== 'solving' || pendingOpponentMove) return false;

    const currentStep = activeLesson.steps[activeStepIdx];
    const moveUci = `${sourceSquare}${targetSquare}`;

    if (moveUci.toLowerCase() !== currentStep.expectedMove.toLowerCase()) {
      playSound.play('alarm'); 
      
      try {
        const tempChess = new Chess(lessonFen);
        const moveResult = tempChess.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: 'q'
        });

        if (moveResult && engineRef.current) {
          setCoachMessage('Analyzing your move...');
          
          engineRef.current.stop();
          // Give Stockfish depth 10 to evaluate quickly
          engineRef.current.evaluatePosition(tempChess.fen(), 10, (evaluation) => {
            if (evaluation.depth >= 10 || evaluation.mateIn) {
              engineRef.current?.stop();
              
              const evalText = evaluation.mateIn 
                ? `Mate in ${Math.abs(evaluation.mateIn)}` 
                : `${evaluation.score > 0 ? '+' : ''}${evaluation.score.toFixed(1)}`;
                
              const msg = `You played ${moveResult.san}. Stockfish evaluates this at ${evalText}. This is incorrect! The expected move was ${currentStep.expectedMove.slice(0, 2)} to ${currentStep.expectedMove.slice(2, 4)}.`;
              
              setCoachMessage(msg);
              if (isVoiceEnabled) {
                speechSynth.speak(`You played ${moveResult.san}. This is incorrect. ${currentStep.instruction}`);
              }
            }
          });
        }
      } catch (err) {
        setCoachMessage("That is an illegal move.");
        if (isVoiceEnabled) speechSynth.speak("That is an illegal move.");
      }

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
        playSound.play('move');
        setLessonChess(tempChess);
        setLessonFen(tempChess.fen());
        setCoachMessage(null);
        speechSynth.stop();

        if (currentStep.opponentMove) {
          setPendingOpponentMove(currentStep.opponentMove);
        } else {
          if (activeStepIdx + 1 < activeLesson.steps.length) {
            setActiveStepIdx(prev => prev + 1);
            if (isVoiceEnabled) {
              speechSynth.speak(activeLesson.steps[activeStepIdx + 1].instruction);
            }
          } else {
            setFeedbackStatus('complete');
            playSound.play('win');
            markLessonCompleted(activeLesson.id);
            if (isVoiceEnabled) {
              speechSynth.speak("Outstanding! You have completed the lesson.");
            }
          }
        }
        return true;
      }
    } catch (err) {
      console.error(err);
    }

    return false;
  };

  const { optionSquares, onSquareClick, onPieceDragBegin, onPieceDragEnd, clearOptions } = useChessOptions(lessonChess, onPieceDrop, feedbackStatus === 'solving' && !pendingOpponentMove);

  useEffect(() => {
    if (activeLesson) clearOptions();
  }, [activeLesson]);

  useEffect(() => {
    if (pendingOpponentMove && activeLesson) {
      const timer = setTimeout(() => {
        const oppFrom = pendingOpponentMove.slice(0, 2);
        const oppTo = pendingOpponentMove.slice(2, 4);
        const promo = pendingOpponentMove.length > 4 ? pendingOpponentMove[4] : undefined;
        
        try {
          const tempChess = new Chess(lessonFen);
          tempChess.move({ from: oppFrom, to: oppTo, promotion: promo });
          
          setLessonChess(new Chess(tempChess.fen()));
          setLessonFen(tempChess.fen());
          playSound.play('move');

          if (activeStepIdx + 1 < activeLesson.steps.length) {
            setActiveStepIdx(prev => prev + 1);
            if (isVoiceEnabled) {
              speechSynth.speak(activeLesson.steps[activeStepIdx + 1].instruction);
            }
          } else {
            setFeedbackStatus('complete');
            playSound.play('win');
            markLessonCompleted(activeLesson.id);
            if (isVoiceEnabled) {
              speechSynth.speak("Outstanding! You have completed the lesson.");
            }
          }
        } catch (e) {
          console.error('Opponent move failed', e);
        }

        setPendingOpponentMove(null);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [pendingOpponentMove, lessonFen, activeStepIdx, activeLesson, markLessonCompleted]);

  const handleCloseLesson = () => {
    setActiveLessonId(null);
  };

  const handleRestartLesson = () => {
    if (activeLesson) {
      const chess = activeLesson.startFen ? new Chess(activeLesson.startFen) : new Chess();
      setLessonChess(chess);
      setLessonFen(chess.fen());
      setActiveStepIdx(0);
      setFeedbackStatus('solving');
      setCoachMessage(null);
      speechSynth.stop();
      if (isVoiceEnabled && activeLesson.steps.length > 0) {
        setTimeout(() => speechSynth.speak(activeLesson.steps[0].instruction), 500);
      }
    }
  };

  const handleStartLesson = (lesson: ChessLesson) => {
    setActiveLessonId(lesson.id);
  };

  const [hintSquares, setHintSquares] = useState<Record<string, any>>({});

  const filteredLessons = LESSON_DATABASE.filter(lesson => {
    if (activeTab === 'all') return true;
    return lesson.category === activeTab;
  });

  const customBoardStyles = {
    customLightSquareStyle: { backgroundColor: 'var(--board-light)' },
    customDarkSquareStyle: { backgroundColor: 'var(--board-dark)' }
  };

  const showHint = () => {
    if (!activeLesson || feedbackStatus !== 'solving' || pendingOpponentMove) return;
    const currentStep = activeLesson.steps[activeStepIdx];
    if (!currentStep) return;

    const fromSq = currentStep.expectedMove.slice(0, 2);
    const toSq = currentStep.expectedMove.slice(2, 4);

    setHintSquares({
      [fromSq]: { backgroundColor: 'rgba(34, 211, 238, 0.4)' },
      [toSq]: { background: 'radial-gradient(circle, rgba(34, 211, 238, 0.5) 25%, transparent 25%)', borderRadius: '50%' }
    });

    setTimeout(() => {
      setHintSquares({});
    }, 2000);
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
                  onSquareClick={onSquareClick}
                  onPieceDragBegin={onPieceDragBegin}
                  onPieceDragEnd={onPieceDragEnd}
                  boardWidth={432}
                  boardOrientation={activeLesson.playerColor || 'white'}
                  arePiecesDraggable={feedbackStatus === 'solving' && !pendingOpponentMove}
                  customSquareStyles={{ ...optionSquares, ...hintSquares }}
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Compass size={16} className="text-accent-cyan" />
                    <span className="text-[10px] font-mono-clock uppercase text-text-muted tracking-wider">Coach Instructions</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setVoiceGender(voiceGender === 'male' ? 'female' : 'male')}
                      className="text-[10px] uppercase font-mono-clock px-2 py-1 rounded-sm border bg-bg-void text-text-muted border-bg-border hover:text-text-primary transition-colors"
                    >
                      {voiceGender === 'male' ? 'Male Voice' : 'Female Voice'}
                    </button>
                    <button 
                      onClick={() => {
                        if (isVoiceEnabled) speechSynth.stop();
                        setIsVoiceEnabled(!isVoiceEnabled);
                      }}
                      className={`text-[10px] uppercase font-mono-clock px-2 py-1 rounded-sm border transition-colors ${isVoiceEnabled ? 'bg-accent-green/10 text-accent-green border-accent-green/30' : 'bg-bg-void text-text-muted border-bg-border'}`}
                    >
                      Voice: {isVoiceEnabled ? 'ON' : 'OFF'}
                    </button>
                  </div>
                </div>

                <div className="w-full border-t border-bg-border" />

                <p className="text-xs text-text-primary leading-relaxed bg-bg-void/50 border border-bg-border p-4 rounded-sm shadow-inner">
                  {activeLesson.steps[activeStepIdx].instruction}
                </p>

                {coachMessage && (
                  <div className="bg-accent-amber/10 border border-accent-amber/30 p-3 rounded-sm flex items-start gap-2 animate-fade-in">
                    <AlertTriangle size={16} className="text-accent-amber shrink-0 mt-0.5" />
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                      <span className="text-accent-amber font-bold font-serif-header">Feedback: </span>
                      {coachMessage}
                    </p>
                  </div>
                )}

                {/* Progress Dot Indicators */}
                <div className="flex flex-col gap-2 mt-4 select-none">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono-clock text-text-muted uppercase">Lesson Progress</span>
                    <button 
                      onClick={showHint}
                      className="text-[9px] font-mono-clock text-accent-cyan uppercase hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Lightbulb size={10} /> Show Hint
                    </button>
                  </div>
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

                {activeLesson.funFact && (
                  <div className="mt-2 bg-accent-amber/10 border border-accent-amber/30 p-3 rounded-sm flex items-start gap-2">
                    <Lightbulb size={16} className="text-accent-amber shrink-0 mt-0.5" />
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                      <span className="text-accent-amber font-bold font-serif-header">Fun Fact: </span>
                      {activeLesson.funFact}
                    </p>
                  </div>
                )}
                
                {activeLesson.commonBlunder && (
                  <div className="bg-accent-red/10 border border-accent-red/30 p-3 rounded-sm flex items-start gap-2">
                    <AlertTriangle size={16} className="text-accent-red shrink-0 mt-0.5" />
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                      <span className="text-accent-red font-bold font-serif-header">Watch Out: </span>
                      {activeLesson.commonBlunder}
                    </p>
                  </div>
                )}
                {isVoiceLoading && (
                  <div className="text-[9px] text-accent-cyan animate-pulse mt-2 font-mono-clock">
                    LOADING NEURAL VOICE MODEL... THIS MAY TAKE A MINUTE
                  </div>
                )}
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
