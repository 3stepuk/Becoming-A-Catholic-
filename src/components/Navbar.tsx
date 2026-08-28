import React from 'react';
import { 
  BookOpen, 
  Sparkles, 
  HelpCircle, 
  FileText, 
  Calendar, 
  User, 
  CheckCircle2, 
  Menu, 
  X,
  Cross
} from 'lucide-react';
import { ActiveTab, UserProgress } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  progress: UserProgress;
  onOpenConversation?: (id: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, progress }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const completedCount = progress.completedConversations.length;
  const progressPercent = Math.round((completedCount / 24) * 100);

  const navItems: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Overview', icon: Sparkles },
    { id: 'conversations', label: '24 Conversations', icon: BookOpen },
    { id: 'drills', label: 'Memory Drills', icon: HelpCircle },
    { id: 'qna', label: '40 Key Truths', icon: FileText },
    { id: 'appendices', label: 'Appendices A–H', icon: FileText },
    { id: 'calendar', label: 'Rites & Schedule', icon: Calendar },
    { id: 'profile', label: 'My Journey', icon: User },
  ];

  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0F0F0F]/95 backdrop-blur-md border-b border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand / Logo */}
          <div 
            id="brand-logo-btn"
            onClick={() => handleSelectTab('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded border border-[#6C7BEA] flex items-center justify-center text-[#6C7BEA] font-bold text-xs font-cinzel shadow-[0_0_10px_rgba(108,123,234,0.2)] group-hover:bg-[#6C7BEA]/10 transition-all">
              <span>BC</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-cinzel text-sm sm:text-base font-semibold uppercase tracking-[0.15em] text-[#E2E8F0] group-hover:text-[#6C7BEA] transition-colors">
                  BECOMING CATHOLIC
                </span>
                <span className="hidden xs:inline-block px-2 py-0.5 text-[9px] uppercase font-bold tracking-widest bg-[#6C7BEA]/10 text-[#6C7BEA] rounded border border-[#6C7BEA]/20">
                  RCIA
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-wider text-[#94A3B8] hidden sm:block">
                A Catechumenate Companion
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => handleSelectTab(item.id)}
                  className={`px-3 py-2 rounded text-[11px] uppercase tracking-wider font-medium transition-all flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-[#161616] text-[#6C7BEA] border border-[#6C7BEA]/40 shadow-sm'
                      : 'text-[#94A3B8] hover:text-[#E2E8F0] hover:bg-[#141414]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#6C7BEA]' : 'text-[#94A3B8]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Progress & Profile Button */}
          <div className="flex items-center space-x-3">
            <button
              id="header-progress-badge"
              onClick={() => handleSelectTab('profile')}
              title="View your catechumenate progress"
              className="hidden sm:flex items-center space-x-2 bg-[#161616] hover:bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#6C7BEA]/40 px-3 py-1.5 rounded text-[11px] uppercase tracking-wider text-[#94A3B8] hover:text-[#E2E8F0] transition-all"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#6C7BEA]" />
              <span>{completedCount}/24 done</span>
              <span className="text-[10px] text-[#6C7BEA] font-mono font-bold">({progressPercent}%)</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded text-[#94A3B8] hover:text-white hover:bg-[#161616] focus:outline-none border border-[#2A2A2A]"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#2A2A2A] bg-[#0F0F0F] px-4 pt-2 pb-5 space-y-1">
          <div className="py-2 px-3 mb-2 bg-[#161616] rounded border border-[#2A2A2A] flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-[#94A3B8]">RCIA Discipleship</span>
            <span className="text-[11px] font-bold text-[#6C7BEA]">{completedCount} of 24 Done</span>
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded text-xs uppercase tracking-wider font-medium transition-colors ${
                  isActive
                    ? 'bg-[#161616] text-[#6C7BEA] border border-[#6C7BEA]/40'
                    : 'text-[#94A3B8] hover:bg-[#141414] hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#6C7BEA]' : 'text-[#94A3B8]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
