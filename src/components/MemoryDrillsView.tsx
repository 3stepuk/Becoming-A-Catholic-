import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, 
  RotateCw, 
  CheckCircle, 
  XCircle, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  Filter,
  Trophy,
  RefreshCw,
  Shuffle
} from 'lucide-react';
import { THINGS_TO_KNOW } from '../data/thingsToKnow';
import { ThingsToKnowItem, UserProgress } from '../types';

interface MemoryDrillsViewProps {
  progress: UserProgress;
  onUpdateMastery: (itemId: number, isMastered: boolean) => void;
  onSaveQuizScore: (score: number, total: number) => void;
}

export const MemoryDrillsView: React.FC<MemoryDrillsViewProps> = ({
  progress,
  onUpdateMastery,
  onSaveQuizScore,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [quizMode, setQuizMode] = useState<boolean>(false);
  const [quizQuestions, setQuizQuestions] = useState<ThingsToKnowItem[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, boolean>>({});
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const categories = useMemo(() => {
    const set = new Set<string>();
    THINGS_TO_KNOW.forEach((t) => set.add(t.category));
    return ['All', ...Array.from(set), 'Needs Practice'];
  }, []);

  const currentDeck = useMemo(() => {
    if (selectedCategory === 'All') return THINGS_TO_KNOW;
    if (selectedCategory === 'Needs Practice') {
      return THINGS_TO_KNOW.filter(
        (t) => progress.reviewNeededRecallIds.includes(t.id) || !progress.masteredRecallIds.includes(t.id)
      );
    }
    return THINGS_TO_KNOW.filter((t) => t.category === selectedCategory);
  }, [selectedCategory, progress]);

  const activeItem = quizMode ? quizQuestions[currentIndex] : currentDeck[currentIndex] || currentDeck[0];

  const masteredCount = progress.masteredRecallIds.length;
  const masteryPercentage = Math.round((masteredCount / THINGS_TO_KNOW.length) * 100);

  const handleNext = () => {
    setIsFlipped(false);
    if (quizMode) {
      if (currentIndex + 1 < quizQuestions.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // Finish quiz
        setQuizFinished(true);
        const correct = Object.values(quizAnswers).filter(Boolean).length;
        onSaveQuizScore(correct, quizQuestions.length);
      }
    } else {
      setCurrentIndex((prev) => (prev + 1) % (currentDeck.length || 1));
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + currentDeck.length) % (currentDeck.length || 1));
  };

  const handleMarkMastered = (item: ThingsToKnowItem) => {
    onUpdateMastery(item.id, true);
    if (quizMode) {
      setQuizAnswers((prev) => ({ ...prev, [item.id]: true }));
      handleNext();
    }
  };

  const handleMarkNeedsWork = (item: ThingsToKnowItem) => {
    onUpdateMastery(item.id, false);
    if (quizMode) {
      setQuizAnswers((prev) => ({ ...prev, [item.id]: false }));
      handleNext();
    }
  };

  const startQuiz = () => {
    // Shuffle and pick 10 random questions
    const shuffled = [...THINGS_TO_KNOW].sort(() => 0.5 - Math.random()).slice(0, 10);
    setQuizQuestions(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setQuizAnswers({});
    setQuizFinished(false);
    setQuizMode(true);
  };

  const exitQuiz = () => {
    setQuizMode(false);
    setQuizFinished(false);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8 pb-16">
      {/* Header & Mastery Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2A2A] pb-5">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-[10px] font-mono text-[#6C7BEA] uppercase tracking-[0.2em] font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-[#6C7BEA]" />
            <span>Appendix D Recall Engine</span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#E2E8F0]">
            Memory-Recall Drills
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8]">
            Practice the 40 essential truths of Catholic doctrine for confident, ordinary explanation.
          </p>
        </div>

        {/* Mastery Pill */}
        <div className="flex items-center space-x-3 bg-[#161616] border border-[#2A2A2A] p-3.5 rounded-lg shadow-xl">
          <div className="w-10 h-10 rounded bg-[#0F0F0F] border border-[#6C7BEA]/30 flex items-center justify-center text-[#6C7BEA] font-bold font-mono">
            {masteryPercentage}%
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[#94A3B8] font-mono font-bold">Mastery Progress</div>
            <div className="text-xs text-[#E2E8F0] font-mono font-semibold">
              {masteredCount} of {THINGS_TO_KNOW.length} Mastered
            </div>
          </div>
        </div>
      </div>

      {quizFinished ? (
        /* Quiz Finished View */
        <div className="bg-[#161616] border border-[#2A2A2A] rounded-lg p-8 text-center space-y-6 max-w-lg mx-auto shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-[#6C7BEA]/10 border border-[#6C7BEA] flex items-center justify-center mx-auto text-[#6C7BEA]">
            <Trophy className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="font-cinzel text-2xl font-bold text-[#E2E8F0]">Quiz Completed!</h3>
            <p className="text-sm text-[#94A3B8]">
              You scored{' '}
              <strong className="text-[#E2E8F0] font-mono">
                {Object.values(quizAnswers).filter(Boolean).length} / {quizQuestions.length}
              </strong>
            </p>
          </div>

          <p className="font-garamond italic text-base text-[#94A3B8]">
            "Readiness is not an examination, but an interior deepening of faith and understanding."
          </p>

          <div className="flex justify-center space-x-3 pt-2">
            <button
              onClick={startQuiz}
              className="px-6 py-3 rounded bg-[#6C7BEA] hover:bg-[#5A69D6] text-white uppercase tracking-[0.2em] text-[11px] font-bold flex items-center space-x-2 shadow-lg shadow-[#6C7BEA]/20"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry 10 Questions</span>
            </button>
            <button
              onClick={exitQuiz}
              className="px-6 py-3 rounded bg-[#0F0F0F] hover:bg-[#1A1A1A] text-[#94A3B8] hover:text-[#E2E8F0] uppercase tracking-[0.2em] text-[11px] font-bold border border-[#2A2A2A]"
            >
              Back to Flashcards
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Controls & Mode Selection */}
          {!quizMode ? (
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Category selector */}
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentIndex(0);
                      setIsFlipped(false);
                    }}
                    className={`px-3.5 py-1.5 rounded text-[11px] uppercase tracking-wider font-bold transition-all ${
                      selectedCategory === cat
                        ? 'bg-[#6C7BEA] text-white shadow-sm'
                        : 'bg-[#161616] text-[#94A3B8] hover:text-[#E2E8F0] border border-[#2A2A2A]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Start 10-question test button */}
              <button
                onClick={startQuiz}
                className="px-4 py-2 rounded bg-[#161616] hover:bg-[#1A1A1A] text-[#6C7BEA] hover:text-white border border-[#6C7BEA]/30 text-[11px] uppercase tracking-wider font-bold flex items-center space-x-1.5 transition-colors"
              >
                <Shuffle className="w-3.5 h-3.5 text-[#6C7BEA]" />
                <span>Start 10-Q Self-Test</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between bg-[#161616] p-3.5 rounded-lg border border-[#2A2A2A] text-xs">
              <span className="text-[#6C7BEA] font-mono font-bold uppercase tracking-wider text-[11px]">
                Self-Test Mode: Question {currentIndex + 1} of {quizQuestions.length}
              </span>
              <button
                onClick={exitQuiz}
                className="text-[#94A3B8] hover:text-white hover:underline text-[11px] uppercase tracking-wider font-bold"
              >
                Exit Test
              </button>
            </div>
          )}

          {/* Flashcard Component */}
          {activeItem ? (
            <div className="space-y-6">
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                id={`flashcard-${activeItem.id}`}
                className="bg-[#161616] hover:bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#6C7BEA]/50 rounded-lg p-6 sm:p-10 min-h-[260px] flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-xl relative select-none"
              >
                {/* Card Top Info */}
                <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded bg-[#0F0F0F] border border-[#2A2A2A] text-xs font-mono font-bold text-[#6C7BEA] flex items-center justify-center">
                      #{activeItem.id}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#94A3B8]">
                      {activeItem.category}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1 text-[#64748B] hover:text-[#94A3B8]">
                    <RotateCw className="w-3.5 h-3.5" />
                    <span className="text-[11px]">{isFlipped ? 'Click to show question' : 'Click to flip answer'}</span>
                  </div>
                </div>

                {/* Card Main Body */}
                <div className="py-6 text-center space-y-4">
                  {!isFlipped ? (
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#6C7BEA] font-bold block">
                        Question:
                      </span>
                      <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#E2E8F0] leading-snug">
                        {activeItem.question}
                      </h2>
                    </div>
                  ) : (
                    <div className="space-y-3 animate-fadeIn">
                      <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-400 font-bold block">
                        Concise Catholic Answer:
                      </span>
                      <p className="font-garamond text-xl sm:text-2xl text-[#E2E8F0] leading-relaxed font-semibold max-w-2xl mx-auto">
                        "{activeItem.answer}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Card Bottom Indicator */}
                <div className="text-center text-[10px] text-[#64748B] font-mono">
                  {quizMode
                    ? `Card ${currentIndex + 1} / ${quizQuestions.length}`
                    : `Card ${currentIndex + 1} / ${currentDeck.length}`}
                </div>
              </div>

              {/* Action Buttons: Mastery & Navigation */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleMarkNeedsWork(activeItem)}
                    className="px-4 py-2.5 rounded bg-[#161616] hover:bg-[#1A1A1A] text-[#94A3B8] hover:text-white border border-[#2A2A2A] text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all"
                  >
                    <XCircle className="w-4 h-4 text-amber-500" />
                    <span>Still Learning</span>
                  </button>

                  <button
                    onClick={() => handleMarkMastered(activeItem)}
                    className="px-4 py-2.5 rounded bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/80 text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Got It! (Mastered)</span>
                  </button>
                </div>

                {!quizMode && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handlePrev}
                      className="p-2.5 rounded bg-[#161616] hover:bg-[#1A1A1A] border border-[#2A2A2A] text-[#94A3B8] hover:text-white"
                      title="Previous Card"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="px-5 py-2.5 rounded bg-[#6C7BEA] hover:bg-[#5A69D6] text-white uppercase tracking-[0.2em] text-[11px] font-bold flex items-center space-x-1.5 shadow-lg shadow-[#6C7BEA]/20"
                    >
                      <span>Next Card</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-[#94A3B8] bg-[#161616] rounded-lg border border-[#2A2A2A]">
              No flashcards in this category.
            </div>
          )}
        </>
      )}
    </div>
  );
};
