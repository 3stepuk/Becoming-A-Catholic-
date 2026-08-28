import React from 'react';
import { 
  BookOpen, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  FileText, 
  Calendar, 
  ChevronRight,
  Bookmark,
  Church,
  Scroll,
  HeartHandshake
} from 'lucide-react';
import { PERIODS } from '../data/periods';
import { CONVERSATIONS } from '../data/conversations';
import { ActiveTab, UserProfile, UserProgress } from '../types';

interface HomeViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenConversation: (id: number) => void;
  onOpenAppendix: (id: string) => void;
  profile: UserProfile;
  progress: UserProgress;
  onOpenParishModal: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setActiveTab,
  onOpenConversation,
  onOpenAppendix,
  profile,
  progress,
  onOpenParishModal,
}) => {
  const completedCount = progress.completedConversations.length;
  
  // Find next conversation to read
  const nextConvId = CONVERSATIONS.find(c => !progress.completedConversations.includes(c.id))?.id || 1;
  const nextConv = CONVERSATIONS.find(c => c.id === nextConvId) || CONVERSATIONS[0];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-10 border-b border-[#2A2A2A]">
        <div className="absolute inset-0 bg-radial from-[#6C7BEA]/10 via-transparent to-transparent opacity-40 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center space-y-6 px-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-[#161616] border border-[#6C7BEA]/30 text-[10px] uppercase tracking-[0.2em] text-[#6C7BEA] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6C7BEA] animate-pulse" />
            <span>DIOCESE OF NOTTINGHAM • PARISH COMPANION</span>
          </div>

          <div className="space-y-3">
            <h3 className="text-[#6C7BEA] text-[10px] uppercase tracking-[0.4em] font-bold">
              The Catechumenate
            </h3>
            <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight tracking-tight text-[#E2E8F0]">
              BECOMING CATHOLIC
            </h1>
            <p className="font-cinzel text-sm sm:text-lg text-[#6C7BEA] tracking-[0.2em] uppercase font-semibold">
              RCIA — A Catechumenate Companion
            </p>
            <p className="font-garamond italic text-lg sm:text-xl text-[#94A3B8] max-w-2xl mx-auto leading-relaxed font-light">
              'Ask, and it will be given to you; seek, and you will find; knock, and it will be opened to you.' — Matthew 7:7
            </p>
          </div>

          {/* Parish Edition Badge */}
          <div className="text-[11px] uppercase tracking-widest text-[#94A3B8] font-sans">
            {profile.parishName || "St Mary's | St John Bosco | St Edward's Parish"} • 2026 Parish Edition
          </div>

          {/* Main Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <button
              id="hero-continue-journey-btn"
              onClick={() => onOpenConversation(nextConvId)}
              className="w-full sm:w-auto px-8 py-3.5 rounded bg-[#6C7BEA] hover:bg-[#5A69D6] text-white uppercase tracking-[0.2em] text-[11px] font-bold flex items-center justify-center space-x-2.5 transition-all shadow-lg shadow-[#6C7BEA]/20 group"
            >
              <span>{completedCount === 0 ? 'Start First Conversation' : `Continue: Conversation ${nextConvId}`}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="hero-explore-conversations-btn"
              onClick={() => setActiveTab('conversations')}
              className="w-full sm:w-auto px-6 py-3.5 rounded bg-[#161616] hover:bg-[#1A1A1A] text-[#E2E8F0] border border-[#2A2A2A] hover:border-[#6C7BEA]/40 uppercase tracking-[0.2em] text-[11px] font-bold transition-all"
            >
              View All 24 Conversations
            </button>
          </div>

          {/* Optional Sign-in Banner */}
          {!profile.notifiedParish && (
            <div className="pt-2">
              <button
                onClick={onOpenParishModal}
                className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-wider text-[#94A3B8] hover:text-[#6C7BEA] bg-[#161616] hover:bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#6C7BEA]/40 px-4 py-2 rounded transition-all"
              >
                <Church className="w-3.5 h-3.5 text-[#6C7BEA]" />
                <span>Candidate / Parish Sign-In (Optional)</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Key Pastoral Principles (The Framing) */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Box 1: The Book Supplies */}
          <div className="bg-[#161616] border border-[#2A2A2A] rounded-lg p-6 space-y-3 relative overflow-hidden shadow-xl">
            <div className="text-[10px] font-mono tracking-[0.2em] text-[#6C7BEA] uppercase font-bold flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5 text-[#6C7BEA]" />
              <span>CATECHETICAL PRINCIPLE</span>
            </div>
            <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#E2E8F0] leading-snug">
              THE BOOK SUPPLIES THE LESSON; THE PARISH SUPPLIES THE JOURNEY
            </h3>
            <p className="font-garamond text-base sm:text-lg text-[#94A3B8] leading-relaxed">
              These conversations make the catechesis simple and zero-prep. They do not replace the periods and rites of RCIA, personal conversion, participation in parish life, or the priest and bishop's pastoral discernment.
            </p>
          </div>

          {/* Box 2: Simple Rule */}
          <div className="bg-[#161616] border border-[#2A2A2A] rounded-lg p-6 space-y-3 shadow-xl">
            <div className="text-[10px] font-mono tracking-[0.2em] text-emerald-400 uppercase font-bold flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>THE SIMPLE RULE</span>
            </div>
            <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#E2E8F0] leading-snug">
              COME TO SUNDAY MASS. TALK HONESTLY. PRAY.
            </h3>
            <p className="font-garamond text-base sm:text-lg text-[#94A3B8] leading-relaxed">
              Open the next conversation. Answer in your own words. Pray. Live one concrete step each week. Let the rites and the Christian year shape your path: readiness matters far more than a calendar.
            </p>
          </div>
        </div>
      </section>

      {/* The 4 Periods and 3 Major Steps Roadmap */}
      <section className="max-w-5xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-[#6C7BEA] text-[10px] uppercase tracking-[0.4em] font-bold">Curriculum Overview</h3>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#E2E8F0] tracking-wide">
            THE RCIA JOURNEY
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto font-sans">
            Four periods of gradual faith and conversion, anchored by three major liturgical steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PERIODS.map((period) => {
            const periodConvs = CONVERSATIONS.filter(c => c.periodId === period.id);
            const periodCompleted = periodConvs.filter(c => progress.completedConversations.includes(c.id)).length;

            return (
              <div
                key={period.id}
                className="bg-[#161616] hover:bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#6C7BEA]/40 rounded-lg p-5 flex flex-col justify-between transition-all duration-200 group shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest bg-[#0F0F0F] text-[#6C7BEA] border border-[#6C7BEA]/20">
                      {period.roleName}
                    </span>
                    <span className="text-[11px] text-[#94A3B8] font-mono">
                      Conv {period.conversationRange[0]}–{period.conversationRange[1]}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#E2E8F0] group-hover:text-[#6C7BEA] transition-colors">
                      {period.name}
                    </h3>
                    <p className="text-xs text-[#94A3B8] line-clamp-3 mt-1 font-sans">
                      {period.description}
                    </p>
                  </div>

                  <div className="p-3 bg-[#0F0F0F] rounded border border-[#2A2A2A] text-[11px] text-[#94A3B8]">
                    <span className="text-[#6C7BEA] font-bold block text-[9px] uppercase tracking-widest font-mono mb-0.5">
                      Major Step:
                    </span>
                    <span className="text-[#E2E8F0]">{period.majorStep}</span>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-[#2A2A2A] flex items-center justify-between">
                  <span className="text-[11px] text-[#94A3B8] font-mono">
                    {periodCompleted}/{periodConvs.length} done
                  </span>
                  <button
                    onClick={() => onOpenConversation(period.conversationRange[0])}
                    className="text-xs uppercase tracking-wider text-[#6C7BEA] hover:text-white flex items-center space-x-1 font-bold"
                  >
                    <span>Explore</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Up Next & Quick Access Grid */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Up Next Conversation */}
          <div className="bg-[#161616] border border-[#2A2A2A] rounded-lg p-5 flex flex-col justify-between space-y-4 shadow-xl">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                <span className="flex items-center space-x-1 text-[#6C7BEA]">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="font-mono uppercase text-[10px] tracking-wider font-bold">Up Next</span>
                </span>
                <span className="font-mono text-[11px]">Conversation {nextConv.id} of 24</span>
              </div>
              <h4 className="font-cinzel text-base font-bold text-[#E2E8F0]">
                {nextConv.title}
              </h4>
              <p className="font-garamond italic text-sm text-[#94A3B8] line-clamp-2">
                "{nextConv.purpose}"
              </p>
            </div>
            <button
              onClick={() => onOpenConversation(nextConv.id)}
              className="w-full py-2.5 px-3 rounded bg-[#6C7BEA]/10 hover:bg-[#6C7BEA] text-[#6C7BEA] hover:text-white border border-[#6C7BEA]/30 uppercase tracking-widest text-[10px] font-bold flex items-center justify-center space-x-1.5 transition-all"
            >
              <span>Open Conversation {nextConv.id}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Memory Recall Drill */}
          <div className="bg-[#161616] border border-[#2A2A2A] rounded-lg p-5 flex flex-col justify-between space-y-4 shadow-xl">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                <span className="flex items-center space-x-1 text-emerald-400">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span className="font-mono uppercase text-[10px] tracking-wider font-bold">Memory Recall</span>
                </span>
                <span className="font-mono text-[11px]">40 Key Truths</span>
              </div>
              <h4 className="font-cinzel text-base font-bold text-[#E2E8F0]">
                Things to Know Clearly
              </h4>
              <p className="text-xs text-[#94A3B8] font-sans">
                Master the essential question-and-answer catechetical definitions with interactive flashcards.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('drills')}
              className="w-full py-2.5 px-3 rounded bg-[#0F0F0F] hover:bg-[#1A1A1A] text-[#E2E8F0] border border-[#2A2A2A] uppercase tracking-widest text-[10px] font-bold flex items-center justify-center space-x-1.5 transition-all"
            >
              <span>Start Flashcard Practice</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Appendices & Rites */}
          <div className="bg-[#161616] border border-[#2A2A2A] rounded-lg p-5 flex flex-col justify-between space-y-4 shadow-xl">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                <span className="flex items-center space-x-1 text-violet-400">
                  <Scroll className="w-3.5 h-3.5" />
                  <span className="font-mono uppercase text-[10px] tracking-wider font-bold">Reference</span>
                </span>
                <span className="font-mono text-[11px]">Appendices A–H</span>
              </div>
              <h4 className="font-cinzel text-base font-bold text-[#E2E8F0]">
                Pastoral Checks & Rites
              </h4>
              <p className="text-xs text-[#94A3B8] font-sans">
                Readiness criteria, Sponsor and Godparent requirements, and the Simple Rule of Christian Life.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('appendices')}
              className="w-full py-2.5 px-3 rounded bg-[#0F0F0F] hover:bg-[#1A1A1A] text-[#E2E8F0] border border-[#2A2A2A] uppercase tracking-widest text-[10px] font-bold flex items-center justify-center space-x-1.5 transition-all"
            >
              <span>Browse Appendices</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Note for Inquirers and Mentors from Page 2 */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-[#121212] border border-[#2A2A2A] rounded-lg p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center space-x-2 text-[#6C7BEA]">
            <HeartHandshake className="w-4 h-4" />
            <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#E2E8F0]">
              A Note for Inquirers, Catechumens, Sponsors and Parish Mentors
            </h3>
          </div>
          <div className="font-garamond text-base sm:text-lg text-[#94A3B8] space-y-3 leading-relaxed">
            <p>
              This book is for an adult who has not been baptised and is exploring or preparing to become Catholic. In the Diocese of Nottingham this formal process is called RCIA: the Rite of Christian Initiation of Adults. If you have already been validly baptised, stop here and tell the priest: you need the pathway for Reception into Full Communion, not the catechumenate for the unbaptised.
            </p>
            <p>
              Each conversation follows the same rhythm: one central truth, short teaching, one Talk About It question, five essential answers, a prayer and one practical step. Answer in your own words before reading the concise answer. Bring the question you actually have.
            </p>
            <p className="text-xs font-sans text-[#94A3B8] pt-2 border-t border-[#2A2A2A]">
              <strong className="text-[#E2E8F0]">Before Baptism:</strong> You do not receive sacramental Confession beforehand, because Baptism itself forgives all sin. You nevertheless learn sincere repentance and examination of life. After Baptism, Confession becomes part of ordinary Catholic life.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
