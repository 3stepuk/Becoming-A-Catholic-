import { UserProfile, UserProgress } from '../types';

const PROFILE_KEY = 'becoming_catholic_rcia_profile';
const PROGRESS_KEY = 'becoming_catholic_rcia_progress';

export const DEFAULT_PROFILE: UserProfile = {
  candidateName: '',
  sponsorName: '',
  mentorName: '',
  parishName: "St Mary's | St John Bosco | St Edward's Parish",
  dateOfAcceptance: '',
  dateOfElection: '',
  dateOfInitiation: '',
  email: '',
  notifiedParish: false,
  optInEmailNotification: false,
  formspreeEndpoint: 'https://formspree.io/f/xvkoozdo',
};

export const DEFAULT_PROGRESS: UserProgress = {
  completedConversations: [],
  inProgressConversations: [],
  bookmarkedConversations: [],
  conversationNotes: {},
  masteredRecallIds: [],
  reviewNeededRecallIds: [],
  drillScores: [],
};

export function loadProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch (e) {
    console.error('Error loading profile', e);
    return DEFAULT_PROFILE;
  }
}

export function saveProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Error saving profile', e);
  }
}

export function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) };
  } catch (e) {
    console.error('Error loading progress', e);
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Error saving progress', e);
  }
}

export function exportBackupData(): string {
  const data = {
    profile: loadProfile(),
    progress: loadProgress(),
    exportedAt: new Date().toISOString(),
    version: '1.0.0',
    app: 'Becoming Catholic — RCIA',
  };
  return JSON.stringify(data, null, 2);
}

export function importBackupData(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.profile) saveProfile(parsed.profile);
    if (parsed.progress) saveProgress(parsed.progress);
    return true;
  } catch (e) {
    console.error('Failed to import backup data', e);
    return false;
  }
}
