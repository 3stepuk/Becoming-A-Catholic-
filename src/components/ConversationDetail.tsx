import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Bookmark, 
  CheckCircle2, 
  Circle, 
  Share2, 
  Printer, 
  Calendar, 
  Sparkles, 
  HelpCircle, 
  MessageSquare, 
  Eye, 
  EyeOff,
  Cross,
  Copy,
  Check
} from 'lucide-react';
import { Conversation, UserProgress } from '../types';
import { PERIODS } from '../data/periods';
import { generateGoogleCalendarUrl } from '../utils/calendar';

interface ConversationDetailProps {
  conversation: Conversation;
  progress: UserProgress;
  onBack: () => void;
  onNavigateToConversation: (id: number) => void;
  onToggleComplete: (id: number) => void;
  onToggleBookmark: (id: number) => void;
  onSaveNote: (convId: number, noteText: string) => void;
}

export const ConversationDetail: React.FC<ConversationDetailProps> = ({
  conversation,
  progress,
  onBack,
  onNavigateToConversation,
  onToggleComplete,
  onToggleBookmark,
  onSaveNote,
}) => {
  const isCompleted = progress.completedConversations.includes(conversation.id);
  const isBookmarked = progress.bookmarkedConversations.includes(conversation.id);
  const currentNote = progress.conversationNotes[conversation.id] || '';

  const [noteText, setNoteText] = useState(currentNote);
  const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);
  const [revealedEssentials, setRevealedEssentials] = useState<Record<number, boolean>>({});
  const [copiedText, setCopiedText] = useState(false);

  const period = PERIODS.find((p) => p.id === conversation.periodId);

  const handleNoteChange = (val: string) => {
    setNoteText(val);
    onSaveNote(conversation.id, val);
    setNoteSavedFeedback(true);
    setTimeout(() => setNoteSavedFeedback(false), 2000);
  };

  const toggleEssentialReveal = (qNum: number) => {
    setRevealedEssentials((prev) => ({
      ...prev,
      [qNum]: !prev[qNum],
    }));
  };

  const revealAllEssentials = () => {
    const allRevealed: Record<number, boolean> = {};
    conversation.essentials.forEach((e) => {
      allRevealed[e.qNumber] = true;
    });
    setRevealedEssentials(allRevealed);
  };

  const hideAllEssentials = () => {
    setRevealedEssentials({});
  };

  const handleCopySummary = () => {
    const text = `BECOMING CATHOLIC — RCIA
Conversation ${conversation.id}: ${conversation.title}
Purpose: ${conversation.purpose}

REMEMBER:
${conversation.remember}

THE ESSENTIALS:
${conversation.essentials.map(e => `${e.qNumber}. ${e.question}\n→ ${e.answer}`).join('\n\n')}

PRAYER:
${conversation.prayer}

THIS WEEK:
${conversation.thisWeek}`;

    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleAddToCalendar = () => {
    const url = generateGoogleCalendarUrl({
      title: `RCIA: Conversation ${conversation.id} — ${conversation.title}`,
      description: `RCIA Catechumenate Weekly Reflection:
"${conversation.purpose}"

Remember: ${conversation.remember}

Weekly Step: ${conversation.thisWeek}

Prayer: ${conversation.prayer}`,
      location: "St Mary's | St John Bosco | St Edward's Parish",
    });
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8 pb-20">
      {/* Top Navigation & Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2A2A2A] pb-4">
        <button
          onClick={onBack}
          id="back-to-conversations-btn"
          className="inline-flex items-center space-x-2 text-xs text-[#94A3B8] hover:text-[#E2E8F0] bg-[#161616] hover:bg-[#1A1A1A] border border-[#2A2A2A] px-3.5 py-2 rounded transition-all uppercase tracking-wider font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Conversations</span>
        </button>

        <div className="flex items-center space-x-2">
          {/* Copy Summary */}
          <button
            onClick={handleCopySummary}
            title="Copy conversation summary"
            className="p-2 text-[#94A3B8] hover:text-[#E2E8F0] bg-[#161616] hover:bg-[#1A1A1A] border border-[#2A2A2A] rounded transition-colors text-xs flex items-center space-x-1.5"
          >
            {copiedText ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span className="hidden sm:inline">{copiedText ? 'Copied' : 'Copy'}</span>
          </button>

          {/* Bookmark Button */}
          <button
            onClick={() => onToggleBookmark(conversation.id)}
            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Conversation'}
            className={`p-2 bg-[#161616] hover:bg-[#1A1A1A] border border-[#2A2A2A] rounded transition-colors ${
              isBookmarked ? 'text-amber-400' : 'text-[#64748B] hover:text-[#94A3B8]'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>

          {/* Mark Complete Toggle */}
          <button
            id="toggle-complete-btn"
            onClick={() => onToggleComplete(conversation.id)}
            className={`px-3.5 py-2 rounded text-[10px] uppercase tracking-wider font-bold flex items-center space-x-1.5 transition-all border ${
              isCompleted
                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/80 hover:bg-emerald-900/50'
                : 'bg-[#6C7BEA]/10 text-[#6C7BEA] border-[#6C7BEA]/30 hover:bg-[#6C7BEA] hover:text-white'
            }`}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${isCompleted ? 'text-emerald-400' : 'text-[#6C7BEA]'}`} />
            <span>{isCompleted ? 'Completed' : 'Mark as Done'}</span>
          </button>
        </div>
      </div>

      {/* Header Info */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-0.5 rounded text-[9px] font-mono uppercase tracking-widest bg-[#161616] text-[#6C7BEA] border border-[#6C7BEA]/20 font-bold">
            {conversation.periodName}
          </span>
          <span className="text-[11px] font-mono text-[#94A3B8]">
            Conversation {conversation.id} of 24
          </span>
          {period && (
            <span className="text-[11px] text-[#94A3B8] font-mono">
              • {period.roleName}
            </span>
          )}
        </div>

        <h1 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#E2E8F0] tracking-wide">
          {conversation.title}
        </h1>

        <p className="font-garamond italic text-lg sm:text-xl text-[#94A3B8]">
          {conversation.purpose}
        </p>
      </div>

      {/* REMEMBER Box */}
      <div className="bg-[#161616] border-l-4 border-l-[#6C7BEA] border border-[#2A2A2A] rounded-r-lg p-6 shadow-xl relative">
        <div className="text-[10px] font-mono tracking-[0.2em] text-[#6C7BEA] uppercase font-bold mb-2 flex items-center space-x-2">
          <Sparkles className="w-3.5 h-3.5 text-[#6C7BEA]" />
          <span>REMEMBER</span>
        </div>
        <p className="font-cinzel text-base sm:text-lg text-[#E2E8F0] leading-relaxed font-semibold">
          {conversation.remember}
        </p>
      </div>

      {/* TEACHING Section */}
      <div className="space-y-4">
        <h3 className="font-cinzel text-[10px] font-mono text-[#94A3B8] tracking-[0.3em] uppercase border-b border-[#2A2A2A] pb-2 font-bold">
          The Teaching
        </h3>
        <div className="font-garamond text-lg sm:text-xl text-[#E2E8F0] space-y-4 leading-relaxed">
          {conversation.teaching.map((para, index) => (
            <p key={index} className="indent-4 sm:indent-6">
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* TALK ABOUT IT Section */}
      <div className="bg-[#161616] border border-[#2A2A2A] rounded-lg p-6 space-y-4 shadow-xl">
        <div className="flex items-center space-x-2 text-[#6C7BEA] font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
          <MessageSquare className="w-4 h-4 text-[#6C7BEA]" />
          <span>TALK ABOUT IT</span>
        </div>
        
        <p className="font-cinzel text-base sm:text-lg text-[#E2E8F0] font-medium">
          {conversation.talkAboutIt}
        </p>

        {/* Private reflection notepad */}
        <div className="pt-2">
          <label className="block text-[10px] uppercase tracking-wider text-[#94A3B8] mb-2 font-sans font-semibold">
            Your Private Reflection / Question for Sponsor or Priest (Stored locally):
          </label>
          <textarea
            rows={3}
            value={noteText}
            onChange={(e) => handleNoteChange(e.target.value)}
            placeholder="Write your honest thoughts, questions, or reflections here..."
            className="w-full bg-[#0F0F0F] border border-[#2A2A2A] focus:border-[#6C7BEA] rounded p-3 text-sm text-[#E2E8F0] font-sans focus:outline-none transition-colors placeholder:text-[#64748B]"
          />
          {noteSavedFeedback && (
            <span className="text-[10px] text-emerald-400 font-mono tracking-wide">
              ✓ Saved to your device
            </span>
          )}
        </div>
      </div>

      {/* THE ESSENTIALS Section (5 Q&As) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-2">
          <div className="flex items-center space-x-2">
            <HelpCircle className="w-4 h-4 text-[#6C7BEA]" />
            <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#E2E8F0] tracking-wide">
              THE ESSENTIALS (5 Core Answers)
            </h3>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <button
              onClick={revealAllEssentials}
              className="text-[#94A3B8] hover:text-[#E2E8F0] px-2.5 py-1 rounded hover:bg-[#161616] text-[11px] uppercase tracking-wider font-bold"
            >
              Reveal All
            </button>
            <span className="text-[#4A4A4A]">|</span>
            <button
              onClick={hideAllEssentials}
              className="text-[#94A3B8] hover:text-[#E2E8F0] px-2.5 py-1 rounded hover:bg-[#161616] text-[11px] uppercase tracking-wider font-bold"
            >
              Hide All
            </button>
          </div>
        </div>

        <p className="text-xs text-[#94A3B8] italic">
          Try answering each question in your own words before revealing the Church's concise answer.
        </p>

        <div className="space-y-3">
          {conversation.essentials.map((item) => {
            const isRevealed = revealedEssentials[item.qNumber];
            return (
              <div
                key={item.qNumber}
                className="bg-[#161616] border border-[#2A2A2A] rounded-lg overflow-hidden transition-all shadow-md"
              >
                <div
                  onClick={() => toggleEssentialReveal(item.qNumber)}
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#1A1A1A] transition-colors"
                >
                  <div className="flex items-start space-x-3 pr-2">
                    <span className="w-5 h-5 rounded bg-[#0F0F0F] border border-[#2A2A2A] text-xs font-mono text-[#6C7BEA] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      {item.qNumber}
                    </span>
                    <span className="font-sans font-medium text-sm sm:text-base text-[#E2E8F0]">
                      {item.question}
                    </span>
                  </div>

                  <button
                    type="button"
                    title={isRevealed ? 'Hide answer' : 'Reveal answer'}
                    className="text-[#94A3B8] hover:text-[#6C7BEA] p-1 shrink-0"
                  >
                    {isRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {isRevealed && (
                  <div className="px-4 pb-4 pt-1 bg-[#0F0F0F]/60 border-t border-[#2A2A2A] font-garamond text-base sm:text-lg text-[#E2E8F0] leading-relaxed pl-12">
                    <strong className="text-[#6C7BEA] font-sans text-xs uppercase tracking-wide mr-2 font-bold">
                      Answer:
                    </strong>
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* PRAYER Section */}
      <div className="bg-[#161616] border border-[#2A2A2A] rounded-lg p-6 space-y-3 shadow-xl">
        <div className="flex items-center space-x-2 text-[#6C7BEA] font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
          <span className="text-base">†</span>
          <span>PRAYER</span>
        </div>
        <p className="font-garamond italic text-lg sm:text-xl text-[#E2E8F0] leading-relaxed">
          "{conversation.prayer}"
        </p>
      </div>

      {/* THIS WEEK Practical Step */}
      <div className="bg-[#121212] border border-[#2A2A2A] rounded-lg p-6 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-emerald-400 font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>THIS WEEK — PRACTICAL STEP</span>
          </div>

          <button
            onClick={handleAddToCalendar}
            title="Add weekly practice reminder to Google Calendar"
            className="text-xs uppercase tracking-wider font-bold text-[#6C7BEA] hover:text-white flex items-center space-x-1.5 bg-[#0F0F0F] border border-[#2A2A2A] hover:border-[#6C7BEA]/40 px-3 py-1.5 rounded transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-[#6C7BEA]" />
            <span className="hidden sm:inline">Add to Google Calendar</span>
          </button>
        </div>

        <p className="font-sans text-sm sm:text-base text-[#E2E8F0]">
          {conversation.thisWeek}
        </p>
      </div>

      {/* Bottom Paging Navigation */}
      <div className="pt-6 border-t border-[#2A2A2A] flex items-center justify-between gap-3">
        {conversation.id > 1 ? (
          <button
            onClick={() => onNavigateToConversation(conversation.id - 1)}
            className="px-4 py-2.5 rounded bg-[#161616] hover:bg-[#1A1A1A] text-[#94A3B8] hover:text-[#E2E8F0] border border-[#2A2A2A] text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Conv {conversation.id - 1}</span>
          </button>
        ) : (
          <div />
        )}

        <button
          onClick={() => {
            if (!isCompleted) onToggleComplete(conversation.id);
            if (conversation.id < 24) onNavigateToConversation(conversation.id + 1);
            else onBack();
          }}
          className="px-6 py-3 rounded bg-[#6C7BEA] hover:bg-[#5A69D6] text-white uppercase tracking-[0.2em] text-[11px] font-bold flex items-center space-x-2 transition-all shadow-lg shadow-[#6C7BEA]/20"
        >
          <span>{conversation.id < 24 ? 'Complete & Next' : 'Finish Journey'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {conversation.id < 24 ? (
          <button
            onClick={() => onNavigateToConversation(conversation.id + 1)}
            className="px-4 py-2.5 rounded bg-[#161616] hover:bg-[#1A1A1A] text-[#94A3B8] hover:text-[#E2E8F0] border border-[#2A2A2A] text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all"
          >
            <span>Conv {conversation.id + 1}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};
