import React, { useState } from 'react';
import { X, Send, ShieldCheck, Mail, User, HeartHandshake, Church, CheckCircle } from 'lucide-react';
import { UserProfile } from '../types';

interface ParishNotifyModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSaveProfile: (updated: UserProfile) => void;
}

export const ParishNotifyModal: React.FC<ParishNotifyModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}) => {
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.candidateName.trim()) {
      setErrorMsg('Please provide your name.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    // Save local profile immediately
    const updatedProfile: UserProfile = {
      ...formData,
      notifiedParish: true,
      optInEmailNotification: true,
    };
    onSaveProfile(updatedProfile);

    // POST to Formspree endpoint if user opted in and provided email
    try {
      if (formData.formspreeEndpoint) {
        await fetch(formData.formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            candidateName: formData.candidateName,
            email: formData.email || 'Not provided',
            sponsorName: formData.sponsorName || 'To be discerned',
            mentorName: formData.mentorName || 'To be assigned',
            parishName: formData.parishName,
            message: 'A candidate has begun the RCIA Catechumenate Companion journey.',
            timestamp: new Date().toISOString(),
          }),
        });
      }
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1600);
    } catch (err) {
      console.error('Notification dispatch note:', err);
      // We still treat as saved locally so the candidate is never blocked
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1600);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDismissWithoutSending = () => {
    onSaveProfile({
      ...formData,
      notifiedParish: false,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#161616] border border-[#2A2A2A] rounded-lg max-w-lg w-full p-6 sm:p-8 text-[#E2E8F0] shadow-2xl relative">
        <button
          id="close-parish-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#64748B] hover:text-white p-1 rounded hover:bg-[#1E1E1E]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-5 border-b border-[#2A2A2A] pb-4">
          <div className="w-10 h-10 rounded bg-[#0F0F0F] border border-[#6C7BEA]/30 flex items-center justify-center text-[#6C7BEA]">
            <Church className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-cinzel text-lg font-bold text-[#E2E8F0] tracking-wide">
              Parish Welcome & Registration
            </h3>
            <p className="text-xs text-[#94A3B8]">
              Optional sign-in for Father John & parish pastoral accompaniment
            </p>
          </div>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 bg-[#6C7BEA]/10 border border-[#6C7BEA] rounded-full flex items-center justify-center mx-auto text-[#6C7BEA]">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h4 className="font-cinzel text-base font-semibold text-[#E2E8F0]">
              Welcome to the Catechumenate
            </h4>
            <p className="text-xs text-[#94A3B8] max-w-sm mx-auto font-garamond text-base">
              Your details are saved. The parish accompanies you with prayer as you begin these 24 conversations.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-3.5 bg-[#0F0F0F] rounded border border-[#2A2A2A] text-xs text-[#94A3B8] space-y-1">
              <div className="flex items-center space-x-1.5 text-[#E2E8F0] font-mono text-[10px] uppercase font-bold tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#6C7BEA]" />
                <span>Privacy & Discretion Notice</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                This app runs entirely on your device (in localStorage). Opting in here simply sends a friendly notification to the parish priest so we can offer prayer, a sponsor, and pastoral support.
              </p>
            </div>

            {errorMsg && (
              <div className="p-2.5 bg-red-950/40 border border-red-800 text-red-300 text-xs rounded">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#94A3B8] font-bold mb-1">
                Candidate Name <span className="text-[#6C7BEA]">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-2.5 text-[#64748B]" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Thomas Moore"
                  value={formData.candidateName}
                  onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                  className="w-full bg-[#0F0F0F] border border-[#2A2A2A] focus:border-[#6C7BEA] rounded pl-9 pr-3 py-2 text-xs text-[#E2E8F0] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#94A3B8] font-bold mb-1">
                Email Address (Optional)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-2.5 text-[#64748B]" />
                <input
                  type="email"
                  placeholder="e.g. thomas@example.co.uk"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0F0F0F] border border-[#2A2A2A] focus:border-[#6C7BEA] rounded pl-9 pr-3 py-2 text-xs text-[#E2E8F0] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#94A3B8] font-bold mb-1">
                  Sponsor / Godparent
                </label>
                <div className="relative">
                  <HeartHandshake className="w-4 h-4 absolute left-3 top-2.5 text-[#64748B]" />
                  <input
                    type="text"
                    placeholder="Sponsor name (or leave blank)"
                    value={formData.sponsorName}
                    onChange={(e) => setFormData({ ...formData, sponsorName: e.target.value })}
                    className="w-full bg-[#0F0F0F] border border-[#2A2A2A] focus:border-[#6C7BEA] rounded pl-9 pr-3 py-2 text-xs text-[#E2E8F0] focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#94A3B8] font-bold mb-1">
                  Catechist / Parish Mentor
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-2.5 text-[#64748B]" />
                  <input
                    type="text"
                    placeholder="Mentor name (or leave blank)"
                    value={formData.mentorName}
                    onChange={(e) => setFormData({ ...formData, mentorName: e.target.value })}
                    className="w-full bg-[#0F0F0F] border border-[#2A2A2A] focus:border-[#6C7BEA] rounded pl-9 pr-3 py-2 text-xs text-[#E2E8F0] focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#2A2A2A]">
              <button
                type="button"
                onClick={handleDismissWithoutSending}
                className="w-full sm:w-auto px-3 py-2 text-xs text-[#94A3B8] hover:text-[#E2E8F0] uppercase tracking-wider font-bold transition-colors text-left sm:text-center"
              >
                Continue privately (No notification)
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                id="submit-parish-notify-btn"
                className="w-full sm:w-auto px-6 py-2.5 rounded bg-[#6C7BEA] hover:bg-[#5A69D6] text-white text-[11px] uppercase tracking-[0.2em] font-bold flex items-center justify-center space-x-2 transition-all shadow-lg shadow-[#6C7BEA]/20"
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Save & Notify Parish</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
