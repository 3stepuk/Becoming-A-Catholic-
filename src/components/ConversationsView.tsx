import React, { useState, useMemo } from 'react';
import { 
  Search, 
  CheckCircle2, 
  Circle, 
  Bookmark, 
  Filter, 
  ChevronRight,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { CONVERSATIONS } from '../data/conversations';
import { PERIODS } from '../data/periods';
import { PeriodId, UserProgress } from '../types';

interface ConversationsViewProps {
  onOpenConversation: (id: number) => void;
  progress: UserProgress;
  onToggleBookmark: (id: number) => void;
}

export const ConversationsView: React.FC<ConversationsViewProps> = ({
  onOpenConversation,
  progress,
  onToggleBookmark,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodId | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'in-progress' | 'bookmarked'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = useMemo(() => {
    return CONVERSATIONS.filter((conv) => {
      // Period filter
      if (selectedPeriod !== 'all' && conv.periodId !== selectedPeriod) {
        return false;
      }

      // Status filter
      if (filterStatus === 'completed' && !progress.completedConversations.includes(conv.id)) {
        return false;
      }
      if (filterStatus === 'in-progress' && !progress.inProgressConversations.includes(conv.id)) {
        return false;
      }
      if (filterStatus === 'bookmarked' && !progress.bookmarkedConversations.includes(conv.id)) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = conv.title.toLowerCase().includes(q);
        const inPurpose = conv.purpose.toLowerCase().includes(q);
        const inRemember = conv.remember.toLowerCase().includes(q);
        const inEssentials = conv.essentials.some(
          (e) => e.question.toLowerCase().includes(q) || e.answer.toLowerCase().includes(q)
        );
        return inTitle || inPurpose || inRemember || inEssentials;
      }

      return true;
    });
  }, [selectedPeriod, filterStatus, searchQuery, progress]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-[10px] font-mono text-[#6C7BEA] uppercase tracking-[0.2em] font-bold">
          <BookOpen className="w-3.5 h-3.5 text-[#6C7BEA]" />
          <span>Catechumenate Teaching Spine</span>
        </div>
        <h1 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#E2E8F0]">
          Twenty-Four Conversations
        </h1>
        <p className="font-garamond text-base sm:text-lg text-[#94A3B8] max-w-3xl">
          Twenty-four short 20–30 minute conversations to accompany your journey through the four periods of Christian initiation.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#161616] border border-[#2A2A2A] rounded-lg p-5 space-y-4 shadow-xl">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#64748B]" />
          <input
            type="text"
            id="search-conversations-input"
            placeholder="Search conversations by title, doctrine, or question..."
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

        {/* Period Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <button
            onClick={() => setSelectedPeriod('all')}
            className={`px-3.5 py-1.5 rounded text-[11px] uppercase tracking-wider font-bold transition-all ${
              selectedPeriod === 'all'
                ? 'bg-[#6C7BEA] text-white shadow-sm'
                : 'bg-[#0F0F0F] text-[#94A3B8] hover:text-[#E2E8F0] border border-[#2A2A2A]'
            }`}
          >
            All (24)
          </button>
          {PERIODS.map((period) => {
            const isSelected = selectedPeriod === period.id;
            return (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`px-3.5 py-1.5 rounded text-[11px] uppercase tracking-wider font-bold transition-all ${
                  isSelected
                    ? 'bg-[#6C7BEA] text-white shadow-sm'
                    : 'bg-[#0F0F0F] text-[#94A3B8] hover:text-[#E2E8F0] border border-[#2A2A2A]'
                }`}
              >
                {period.stageName} ({period.conversationRange[0]}–{period.conversationRange[1]})
              </button>
            );
          })}
        </div>

        {/* Secondary Status Filter */}
        <div className="flex items-center space-x-2 pt-2 border-t border-[#2A2A2A] text-xs text-[#94A3B8]">
          <span className="text-[#64748B] uppercase tracking-wider text-[10px] font-mono">Status:</span>
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-2 py-1 rounded ${filterStatus === 'all' ? 'text-[#6C7BEA] font-bold' : 'hover:text-white'}`}
          >
            All
          </button>
          <span>•</span>
          <button
            onClick={() => setFilterStatus('completed')}
            className={`px-2 py-1 rounded ${filterStatus === 'completed' ? 'text-emerald-400 font-bold' : 'hover:text-white'}`}
          >
            Completed ({progress.completedConversations.length})
          </button>
          <span>•</span>
          <button
            onClick={() => setFilterStatus('bookmarked')}
            className={`px-2 py-1 rounded ${filterStatus === 'bookmarked' ? 'text-amber-400 font-bold' : 'hover:text-white'}`}
          >
            Bookmarked ({progress.bookmarkedConversations.length})
          </button>
        </div>
      </div>

      {/* Conversations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredConversations.length === 0 ? (
          <div className="col-span-full py-12 text-center text-[#94A3B8] bg-[#161616] rounded-lg border border-[#2A2A2A]">
            <p className="text-base font-cinzel text-[#E2E8F0]">No conversations match your search criteria.</p>
            <p className="text-xs mt-1 text-[#64748B]">Try clearing filters or search terms.</p>
          </div>
        ) : (
          filteredConversations.map((conv) => {
            const isCompleted = progress.completedConversations.includes(conv.id);
            const isBookmarked = progress.bookmarkedConversations.includes(conv.id);
            const period = PERIODS.find(p => p.id === conv.periodId);

            return (
              <div
                key={conv.id}
                id={`conversation-card-${conv.id}`}
                className={`bg-[#161616] hover:bg-[#1A1A1A] border transition-all duration-200 rounded-lg p-5 flex flex-col justify-between group relative shadow-lg ${
                  isCompleted ? 'border-emerald-900/60' : 'border-[#2A2A2A] hover:border-[#6C7BEA]/50'
                }`}
              >
                <div className="space-y-3">
                  {/* Top Bar: Number & Status & Bookmark */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 rounded bg-[#0F0F0F] border border-[#2A2A2A] text-xs font-mono font-bold text-[#6C7BEA] flex items-center justify-center">
                        {conv.id}
                      </span>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-[#94A3B8]">
                        {period?.roleName || 'RCIA'}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark(conv.id);
                        }}
                        title={isBookmarked ? 'Remove bookmark' : 'Bookmark conversation'}
                        className={`p-1 rounded hover:bg-[#202020] transition-colors ${
                          isBookmarked ? 'text-amber-400' : 'text-[#64748B] hover:text-[#94A3B8]'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                      </button>

                      {isCompleted && (
                        <span title="Completed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Purpose */}
                  <div className="cursor-pointer" onClick={() => onOpenConversation(conv.id)}>
                    <h3 className="font-cinzel text-base font-bold text-[#E2E8F0] group-hover:text-[#6C7BEA] transition-colors leading-snug">
                      {conv.title}
                    </h3>
                    <p className="font-garamond italic text-sm text-[#94A3B8] line-clamp-2 mt-1">
                      {conv.purpose}
                    </p>
                  </div>

                  {/* Remember Preview */}
                  <div 
                    onClick={() => onOpenConversation(conv.id)}
                    className="p-3 bg-[#0F0F0F] rounded border border-[#2A2A2A] text-xs text-[#94A3B8] line-clamp-2 font-sans cursor-pointer"
                  >
                    <strong className="text-[#6C7BEA] font-bold text-[9px] uppercase tracking-widest block mb-0.5 font-mono">
                      Remember:
                    </strong>
                    {conv.remember}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-4 mt-3 border-t border-[#2A2A2A] flex items-center justify-between">
                  <span className="text-[10px] text-[#94A3B8] font-mono uppercase tracking-wider">
                    5 Essentials • 1 Prayer
                  </span>
                  <button
                    onClick={() => onOpenConversation(conv.id)}
                    className="text-xs uppercase tracking-wider text-[#6C7BEA] group-hover:text-white font-bold flex items-center space-x-1"
                  >
                    <span>Read</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
