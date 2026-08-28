import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { ConversationsView } from './components/ConversationsView';
import { ConversationDetail } from './components/ConversationDetail';
import { MemoryDrillsView } from './components/MemoryDrillsView';
import { QnAReferenceView } from './components/QnAReferenceView';
import { AppendicesView } from './components/AppendicesView';
import { CalendarView } from './components/CalendarView';
import { ProfileView } from './components/ProfileView';
import { ParishNotifyModal } from './components/ParishNotifyModal';
import { ActiveTab, UserProfile, UserProgress } from './types';
import { 
  loadProfile, 
  saveProfile, 
  loadProgress, 
  saveProgress 
} from './utils/storage';
import { CONVERSATIONS } from './data/conversations';
import { Cross, Church, Heart, Shield } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [activeConversationId, setActiveConversationId] = useState<number | null>(null);
  const [activeAppendixId, setActiveAppendixId] = useState<string>('app-a');
  const [isParishModalOpen, setIsParishModalOpen] = useState<boolean>(false);

  const [profile, setProfile] = useState<UserProfile>(loadProfile);
  const [progress, setProgress] = useState<UserProgress>(loadProgress);

  // Sync to storage when updated
  const handleUpdateProfile = (updated: UserProfile) => {
    setProfile(updated);
    saveProfile(updated);
  };

  const handleUpdateProgress = (updated: UserProgress) => {
    setProgress(updated);
    saveProgress(updated);
  };

  const handleOpenConversation = (id: number) => {
    setActiveConversationId(id);
    setActiveTab('conversations');
    // Mark as in-progress if not already
    if (!progress.inProgressConversations.includes(id)) {
      handleUpdateProgress({
        ...progress,
        inProgressConversations: [...progress.inProgressConversations, id],
      });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToConversationsList = () => {
    setActiveConversationId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleComplete = (id: number) => {
    const isCompleted = progress.completedConversations.includes(id);
    const updatedCompleted = isCompleted
      ? progress.completedConversations.filter((cId) => cId !== id)
      : [...progress.completedConversations, id];
    handleUpdateProgress({
      ...progress,
      completedConversations: updatedCompleted,
    });
  };

  const handleToggleBookmark = (id: number) => {
    const isBookmarked = progress.bookmarkedConversations.includes(id);
    const updatedBookmarks = isBookmarked
      ? progress.bookmarkedConversations.filter((cId) => cId !== id)
      : [...progress.bookmarkedConversations, id];
    handleUpdateProgress({
      ...progress,
      bookmarkedConversations: updatedBookmarks,
    });
  };

  const handleSaveNote = (convId: number, noteText: string) => {
    handleUpdateProgress({
      ...progress,
      conversationNotes: {
        ...progress.conversationNotes,
        [convId]: noteText,
      },
    });
  };

  const handleUpdateMastery = (itemId: number, isMastered: boolean) => {
    let updatedMastered = [...progress.masteredRecallIds];
    let updatedReview = [...progress.reviewNeededRecallIds];

    if (isMastered) {
      if (!updatedMastered.includes(itemId)) updatedMastered.push(itemId);
      updatedReview = updatedReview.filter((id) => id !== itemId);
    } else {
      updatedMastered = updatedMastered.filter((id) => id !== itemId);
      if (!updatedReview.includes(itemId)) updatedReview.push(itemId);
    }

    handleUpdateProgress({
      ...progress,
      masteredRecallIds: updatedMastered,
      reviewNeededRecallIds: updatedReview,
    });
  };

  const handleSaveQuizScore = (score: number, total: number) => {
    const entry = {
      date: new Date().toISOString(),
      correct: score,
      total,
    };
    handleUpdateProgress({
      ...progress,
      drillScores: [...progress.drillScores, entry],
    });
  };

  const handleResetProgress = () => {
    const resetProgress: UserProgress = {
      completedConversations: [],
      inProgressConversations: [],
      bookmarkedConversations: [],
      masteredRecallIds: [],
      reviewNeededRecallIds: [],
      conversationNotes: {},
      drillScores: [],
    };
    handleUpdateProgress(resetProgress);
  };

  const handleOpenAppendix = (appId: string) => {
    setActiveAppendixId(appId);
    setActiveTab('appendices');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeConversation = activeConversationId
    ? CONVERSATIONS.find((c) => c.id === activeConversationId)
    : null;

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-zinc-200 flex flex-col font-sans selection:bg-[#6C7BEA]/30 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'conversations') {
            setActiveConversationId(null);
          }
        }}
        progress={progress}
        onOpenConversation={handleOpenConversation}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView
            setActiveTab={setActiveTab}
            onOpenConversation={handleOpenConversation}
            onOpenAppendix={handleOpenAppendix}
            profile={profile}
            progress={progress}
            onOpenParishModal={() => setIsParishModalOpen(true)}
          />
        )}

        {activeTab === 'conversations' && (
          <>
            {activeConversation ? (
              <ConversationDetail
                conversation={activeConversation}
                progress={progress}
                onBack={handleBackToConversationsList}
                onNavigateToConversation={handleOpenConversation}
                onToggleComplete={handleToggleComplete}
                onToggleBookmark={handleToggleBookmark}
                onSaveNote={handleSaveNote}
              />
            ) : (
              <ConversationsView
                onOpenConversation={handleOpenConversation}
                progress={progress}
                onToggleBookmark={handleToggleBookmark}
              />
            )}
          </>
        )}

        {activeTab === 'drills' && (
          <MemoryDrillsView
            progress={progress}
            onUpdateMastery={handleUpdateMastery}
            onSaveQuizScore={handleSaveQuizScore}
          />
        )}

        {activeTab === 'qna' && (
          <QnAReferenceView
            progress={progress}
            onOpenConversation={handleOpenConversation}
            onUpdateMastery={handleUpdateMastery}
          />
        )}

        {activeTab === 'appendices' && (
          <AppendicesView
            initialAppendixId={activeAppendixId}
            onOpenConversation={handleOpenConversation}
          />
        )}

        {activeTab === 'calendar' && (
          <CalendarView
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            profile={profile}
            progress={progress}
            onUpdateProfile={handleUpdateProfile}
            onOpenConversation={handleOpenConversation}
            onResetProgress={handleResetProgress}
            onOpenParishModal={() => setIsParishModalOpen(true)}
          />
        )}
      </main>

      {/* Parish Registration Modal */}
      <ParishNotifyModal
        isOpen={isParishModalOpen}
        onClose={() => setIsParishModalOpen(false)}
        profile={profile}
        onSaveProfile={handleUpdateProfile}
      />

      {/* Footer matching reference app style */}
      <footer className="border-t border-zinc-900 bg-[#0A0A0A] text-zinc-400 py-10 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 text-center md:text-left">
              <div className="w-8 h-8 rounded bg-[#141414] border border-zinc-800 flex items-center justify-center text-[#6C7BEA] font-cinzel">
                †
              </div>
              <div>
                <div className="font-cinzel text-sm font-bold text-white tracking-wide">
                  BECOMING CATHOLIC • RCIA
                </div>
                <div className="text-xs text-zinc-500 font-garamond text-base">
                  A Catechumenate Companion for Adults
                </div>
              </div>
            </div>

            {/* Quick footer navigation */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-zinc-400">
              <button onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">
                Overview
              </button>
              <span>•</span>
              <button onClick={() => { setActiveTab('conversations'); setActiveConversationId(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">
                24 Conversations
              </button>
              <span>•</span>
              <button onClick={() => { setActiveTab('drills'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">
                Memory Drills
              </button>
              <span>•</span>
              <button onClick={() => { setActiveTab('qna'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">
                40 Key Truths
              </button>
              <span>•</span>
              <button onClick={() => { setActiveTab('appendices'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">
                Appendices
              </button>
              <span>•</span>
              <button onClick={() => { setActiveTab('calendar'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">
                Rites & Calendar
              </button>
              <span>•</span>
              <button onClick={() => { setActiveTab('profile'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">
                Parish Record
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-900 text-center text-xs text-zinc-400 space-y-2">
            <p className="font-garamond text-sm text-zinc-300">
              "The book supplies the lesson; the parish supplies the journey."
            </p>
            <p>
              Diocese of Nottingham • Parish Catechumenate Edition • St Mary's | St John Bosco | St Edward's
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
