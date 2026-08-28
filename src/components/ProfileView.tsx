import React, { useState } from 'react';
import { 
  User, 
  HeartHandshake, 
  Church, 
  Calendar, 
  Save, 
  Download, 
  Upload, 
  Printer, 
  CheckCircle2, 
  BookOpen, 
  HelpCircle, 
  MessageSquare,
  ShieldCheck,
  RefreshCw,
  Mail
} from 'lucide-react';
import { UserProfile, UserProgress } from '../types';
import { exportBackupData, importBackupData } from '../utils/storage';
import { CONVERSATIONS } from '../data/conversations';
import { THINGS_TO_KNOW } from '../data/thingsToKnow';

interface ProfileViewProps {
  profile: UserProfile;
  progress: UserProgress;
  onUpdateProfile: (updated: UserProfile) => void;
  onOpenConversation: (id: number) => void;
  onResetProgress: () => void;
  onOpenParishModal: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  progress,
  onUpdateProfile,
  onOpenConversation,
  onResetProgress,
  onOpenParishModal,
}) => {
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleExportBackup = () => {
    const jsonStr = exportBackupData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `becoming-catholic-rcia-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importBackupData(content);
        if (success) {
          window.location.reload();
        } else {
          setImportError('Invalid backup file format.');
        }
      }
    };
    reader.readAsText(file);
  };

  const completedCount = progress.completedConversations.length;
  const masteredCount = progress.masteredRecallIds.length;
  const notesCount = Object.keys(progress.conversationNotes).filter(
    (k) => progress.conversationNotes[Number(k)]?.trim().length > 0
  ).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2A2A] pb-5">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-[10px] font-mono text-[#6C7BEA] uppercase tracking-[0.2em] font-bold">
            <User className="w-3.5 h-3.5 text-[#6C7BEA]" />
            <span>RCIA Parish Register</span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#E2E8F0]">
            My Catechumenate Journey
          </h1>
          <p className="font-garamond text-base sm:text-lg text-[#94A3B8]">
            Keep your personal formation record, key liturgical milestone dates, and discipleship progress.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded bg-[#161616] hover:bg-[#1A1A1A] text-[#94A3B8] hover:text-[#E2E8F0] border border-[#2A2A2A] text-xs uppercase tracking-wider font-bold flex items-center space-x-1.5 transition-colors shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Record</span>
          </button>
        </div>
      </div>

      {/* Discipleship Progress Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Stat 1 */}
        <div className="bg-[#161616] border border-[#2A2A2A] rounded-lg p-5 space-y-2 shadow-xl">
          <div className="flex items-center justify-between text-xs text-[#94A3B8]">
            <span className="flex items-center space-x-1.5 text-[#6C7BEA] font-mono uppercase tracking-wider text-[10px] font-bold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Conversations</span>
            </span>
            <span className="font-mono">{Math.round((completedCount / 24) * 100)}%</span>
          </div>
          <div className="text-2xl font-cinzel font-bold text-[#E2E8F0]">
            {completedCount} <span className="text-xs font-sans text-[#64748B] font-normal uppercase tracking-wider">/ 24 Done</span>
          </div>
          <div className="w-full bg-[#0F0F0F] rounded-full h-1.5 overflow-hidden border border-[#2A2A2A]">
            <div
              className="bg-[#6C7BEA] h-full rounded-full transition-all"
              style={{ width: `${(completedCount / 24) * 100}%` }}
            />
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-[#161616] border border-[#2A2A2A] rounded-lg p-5 space-y-2 shadow-xl">
          <div className="flex items-center justify-between text-xs text-[#94A3B8]">
            <span className="flex items-center space-x-1.5 text-emerald-400 font-mono uppercase tracking-wider text-[10px] font-bold">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>40 Key Truths</span>
            </span>
            <span className="font-mono">{Math.round((masteredCount / 40) * 100)}%</span>
          </div>
          <div className="text-2xl font-cinzel font-bold text-[#E2E8F0]">
            {masteredCount} <span className="text-xs font-sans text-[#64748B] font-normal uppercase tracking-wider">/ 40 Mastered</span>
          </div>
          <div className="w-full bg-[#0F0F0F] rounded-full h-1.5 overflow-hidden border border-[#2A2A2A]">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all"
              style={{ width: `${(masteredCount / 40) * 100}%` }}
            />
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-[#161616] border border-[#2A2A2A] rounded-lg p-5 space-y-2 shadow-xl">
          <div className="flex items-center justify-between text-xs text-[#94A3B8]">
            <span className="flex items-center space-x-1.5 text-amber-400 font-mono uppercase tracking-wider text-[10px] font-bold">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Reflections Saved</span>
            </span>
            <span className="font-mono text-[#94A3B8]">{notesCount} entries</span>
          </div>
          <div className="text-2xl font-cinzel font-bold text-[#E2E8F0]">
            {notesCount} <span className="text-xs font-sans text-[#64748B] font-normal uppercase tracking-wider">Recorded</span>
          </div>
          <p className="text-[10px] uppercase font-mono tracking-wider text-[#64748B]">Stored on local device</p>
        </div>
      </div>

      {/* Candidate Registration & Companion Form */}
      <div className="bg-[#161616] border border-[#2A2A2A] rounded-lg p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="border-b border-[#2A2A2A] pb-4 space-y-1">
          <div className="flex items-center space-x-2 text-[#6C7BEA] font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
            <Church className="w-4 h-4 text-[#6C7BEA]" />
            <span>Catechumenate Record (Page 1)</span>
          </div>
          <h2 className="font-cinzel text-lg sm:text-xl font-bold text-[#E2E8F0]">
            Personal & Parish Information
          </h2>
          <p className="text-xs text-[#94A3B8] font-garamond text-base">
            These details correspond to your official parish companion notebook.
          </p>
        </div>

        {savedSuccess && (
          <div className="p-3.5 bg-emerald-950/40 border border-emerald-800/80 text-emerald-300 text-xs rounded-lg flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Your catechumenate profile has been saved successfully.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#94A3B8] font-bold mb-1">
                My Name:
              </label>
              <input
                type="text"
                placeholder="Candidate full name"
                value={formData.candidateName}
                onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                className="w-full bg-[#0F0F0F] border border-[#2A2A2A] focus:border-[#6C7BEA] rounded px-3 py-2 text-xs text-[#E2E8F0] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#94A3B8] font-bold mb-1">
                Sponsor / Godparent:
              </label>
              <input
                type="text"
                placeholder="Sponsor or godparent name"
                value={formData.sponsorName}
                onChange={(e) => setFormData({ ...formData, sponsorName: e.target.value })}
                className="w-full bg-[#0F0F0F] border border-[#2A2A2A] focus:border-[#6C7BEA] rounded px-3 py-2 text-xs text-[#E2E8F0] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#94A3B8] font-bold mb-1">
                Catechist / Parish Mentor:
              </label>
              <input
                type="text"
                placeholder="Catechist / Mentor name"
                value={formData.mentorName}
                onChange={(e) => setFormData({ ...formData, mentorName: e.target.value })}
                className="w-full bg-[#0F0F0F] border border-[#2A2A2A] focus:border-[#6C7BEA] rounded px-3 py-2 text-xs text-[#E2E8F0] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#94A3B8] font-bold mb-1">
                Parish Community:
              </label>
              <input
                type="text"
                value={formData.parishName}
                onChange={(e) => setFormData({ ...formData, parishName: e.target.value })}
                className="w-full bg-[#0F0F0F] border border-[#2A2A2A] focus:border-[#6C7BEA] rounded px-3 py-2 text-xs text-[#E2E8F0] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#94A3B8] font-bold mb-1">
                Date of Acceptance:
              </label>
              <input
                type="date"
                value={formData.dateOfAcceptance}
                onChange={(e) => setFormData({ ...formData, dateOfAcceptance: e.target.value })}
                className="w-full bg-[#0F0F0F] border border-[#2A2A2A] focus:border-[#6C7BEA] rounded px-3 py-2 text-xs text-[#E2E8F0] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#94A3B8] font-bold mb-1">
                Date of Election:
              </label>
              <input
                type="date"
                value={formData.dateOfElection}
                onChange={(e) => setFormData({ ...formData, dateOfElection: e.target.value })}
                className="w-full bg-[#0F0F0F] border border-[#2A2A2A] focus:border-[#6C7BEA] rounded px-3 py-2 text-xs text-[#E2E8F0] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#94A3B8] font-bold mb-1">
                Date of Initiation (Easter Vigil):
              </label>
              <input
                type="date"
                value={formData.dateOfInitiation}
                onChange={(e) => setFormData({ ...formData, dateOfInitiation: e.target.value })}
                className="w-full bg-[#0F0F0F] border border-[#2A2A2A] focus:border-[#6C7BEA] rounded px-3 py-2 text-xs text-[#E2E8F0] focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#2A2A2A]">
            <button
              type="button"
              onClick={onOpenParishModal}
              className="text-xs text-[#6C7BEA] hover:text-white font-bold uppercase tracking-wider flex items-center space-x-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{profile.notifiedParish ? 'Parish Notified (Update)' : 'Send Notification to Parish Priest'}</span>
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded bg-[#6C7BEA] hover:bg-[#5A69D6] text-white uppercase tracking-[0.2em] text-[11px] font-bold flex items-center justify-center space-x-2 transition-all shadow-lg shadow-[#6C7BEA]/20"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Record</span>
            </button>
          </div>
        </form>
      </div>

      {/* Backup and Restore Options */}
      <div className="bg-[#161616] border border-[#2A2A2A] rounded-lg p-6 space-y-4 shadow-xl">
        <h3 className="font-cinzel text-base font-bold text-[#E2E8F0]">
          Data Management & Device Privacy
        </h3>
        <p className="text-xs text-[#94A3B8] font-sans leading-relaxed">
          All your reading progress, bookmarks, flashcard mastery, and personal reflection notes are stored locally in your browser's private storage. You can export a backup file or transfer your data to another device at any time.
        </p>

        {importError && (
          <div className="p-3 bg-red-950/40 border border-red-800 text-red-300 text-xs rounded">
            {importError}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleExportBackup}
            className="px-4 py-2.5 rounded bg-[#0F0F0F] hover:bg-[#1A1A1A] text-[#94A3B8] hover:text-white border border-[#2A2A2A] text-xs uppercase tracking-wider font-bold flex items-center space-x-2 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#6C7BEA]" />
            <span>Export Backup JSON</span>
          </button>

          <label className="px-4 py-2.5 rounded bg-[#0F0F0F] hover:bg-[#1A1A1A] text-[#94A3B8] hover:text-white border border-[#2A2A2A] text-xs uppercase tracking-wider font-bold flex items-center space-x-2 cursor-pointer transition-colors">
            <Upload className="w-3.5 h-3.5 text-[#64748B]" />
            <span>Import Backup JSON</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportBackup}
              className="hidden"
            />
          </label>

          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to reset all conversation progress and quiz scores? This cannot be undone.')) {
                onResetProgress();
              }
            }}
            className="px-3 py-2 text-xs uppercase tracking-wider font-bold text-[#64748B] hover:text-red-400 hover:bg-red-950/20 rounded transition-colors ml-auto"
          >
            Reset Progress
          </button>
        </div>
      </div>
    </div>
  );
};
