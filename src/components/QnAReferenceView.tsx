import React, { useState, useMemo } from 'react';
import { Search, FileText, BookOpen, ChevronRight, CheckCircle2, Volume2, Copy, Check } from 'lucide-react';
import { THINGS_TO_KNOW } from '../data/thingsToKnow';
import { UserProgress } from '../types';

interface QnAReferenceViewProps {
  progress: UserProgress;
  onOpenConversation: (id: number) => void;
  onUpdateMastery: (id: number, isMastered: boolean) => void;
}

export const QnAReferenceView: React.FC<QnAReferenceViewProps> = ({
  progress,
  onOpenConversation,
  onUpdateMastery,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    THINGS_TO_KNOW.forEach((t) => set.add(t.category));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredItems = useMemo(() => {
    return THINGS_TO_KNOW.filter((item) => {
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.question.toLowerCase().includes(q) ||
          item.answer.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopy = (item: typeof THINGS_TO_KNOW[0]) => {
    navigator.clipboard.writeText(`Q: ${item.question}\nA: ${item.answer}`);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-[10px] font-mono text-[#6C7BEA] uppercase tracking-[0.2em] font-bold">
          <FileText className="w-3.5 h-3.5 text-[#6C7BEA]" />
          <span>Appendix D • Catholic Doctrine</span>
        </div>
        <h1 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#E2E8F0]">
          Things to Know Clearly
        </h1>
        <p className="font-garamond text-base sm:text-lg text-[#94A3B8] max-w-3xl">
          Forty concise answers to the essential truths of the Catholic faith. These are not an examination, but truths a catechumen should increasingly understand and be able to explain in ordinary words.
        </p>
      </div>

      {/* Search and Category Filters */}
      <div className="bg-[#161616] border border-[#2A2A2A] rounded-lg p-5 space-y-4 shadow-xl">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#64748B]" />
          <input
            type="text"
            id="search-qna-input"
            placeholder="Search all 40 questions and answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0F0F0F] border border-[#2A2A2A] focus:border-[#6C7BEA] rounded pl-10 pr-4 py-2.5 text-sm text-[#E2E8F0] focus:outline-none transition-colors placeholder:text-[#64748B]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-[#94A3B8] hover:text-white px-2 py-0.5 rounded bg-[#2A2A2A]"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded text-[11px] uppercase tracking-wider font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#6C7BEA] text-white shadow-sm'
                  : 'bg-[#0F0F0F] text-[#94A3B8] hover:text-white border border-[#2A2A2A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Q&A List */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 text-[#94A3B8] bg-[#161616] rounded-lg border border-[#2A2A2A]">
            No questions found matching your search.
          </div>
        ) : (
          filteredItems.map((item) => {
            const isMastered = progress.masteredRecallIds.includes(item.id);
            return (
              <div
                key={item.id}
                id={`qna-item-${item.id}`}
                className="bg-[#161616] border border-[#2A2A2A] hover:border-[#6C7BEA]/40 rounded-lg p-5 sm:p-6 transition-all space-y-3 group shadow-lg"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start space-x-3">
                    <span className="w-6 h-6 rounded bg-[#0F0F0F] border border-[#2A2A2A] text-xs font-mono font-bold text-[#6C7BEA] flex items-center justify-center shrink-0 mt-0.5">
                      {item.id}
                    </span>
                    <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#E2E8F0] leading-snug">
                      {item.question}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-1 shrink-0">
                    <button
                      onClick={() => handleCopy(item)}
                      title="Copy question and answer"
                      className="p-1.5 text-[#64748B] hover:text-[#94A3B8] rounded hover:bg-[#1E1E1E] transition-colors text-xs flex items-center"
                    >
                      {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => onUpdateMastery(item.id, !isMastered)}
                      title={isMastered ? 'Mark as still learning' : 'Mark as mastered'}
                      className={`p-1.5 rounded transition-colors ${
                        isMastered ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-800/60' : 'text-[#64748B] hover:text-[#94A3B8] hover:bg-[#1E1E1E]'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="pl-9 pr-2">
                  <p className="font-garamond text-base sm:text-lg text-[#E2E8F0] leading-relaxed font-semibold">
                    {item.answer}
                  </p>
                </div>

                <div className="pl-9 pt-2 border-t border-[#2A2A2A] flex items-center justify-between text-xs text-[#94A3B8]">
                  <span className="font-mono text-[10px] uppercase text-[#64748B]">
                    {item.category}
                  </span>

                  {item.relatedConversation && (
                    <button
                      onClick={() => onOpenConversation(item.relatedConversation!)}
                      className="text-[#6C7BEA] hover:text-white flex items-center space-x-1 font-bold text-[11px] uppercase tracking-wider"
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>Conversation {item.relatedConversation}</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
