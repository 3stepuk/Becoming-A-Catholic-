export type PeriodId = 1 | 2 | 3 | 4;

export interface PeriodInfo {
  id: PeriodId;
  name: string;
  stageName: string;
  roleName: string;
  description: string;
  majorStep: string;
  calendarAnchor: string;
  conversationRange: [number, number];
  color: string;
}

export interface EssentialQA {
  qNumber: number;
  question: string;
  answer: string;
}

export interface Conversation {
  id: number;
  periodId: PeriodId;
  periodName: string;
  title: string;
  purpose: string;
  remember: string;
  teaching: string[];
  talkAboutIt: string;
  essentials: EssentialQA[];
  prayer: string;
  thisWeek: string;
}

export interface ThingsToKnowItem {
  id: number;
  question: string;
  answer: string;
  category: 'God & Trinity' | 'Christ & Salvation' | 'Church & Revelation' | 'Sacraments & Liturgy' | 'Moral Life & Prayer' | 'RCIA Journey';
  relatedConversation?: number;
}

export interface UserProfile {
  candidateName: string;
  sponsorName: string;
  mentorName: string;
  parishName: string;
  dateOfAcceptance: string;
  dateOfElection: string;
  dateOfInitiation: string;
  email: string;
  notifiedParish: boolean;
  optInEmailNotification: boolean;
  formspreeEndpoint: string;
}

export interface UserProgress {
  completedConversations: number[];
  inProgressConversations: number[];
  bookmarkedConversations: number[];
  conversationNotes: Record<number, string>;
  masteredRecallIds: number[];
  reviewNeededRecallIds: number[];
  drillScores: { date: string; correct: number; total: number }[];
}

export type ActiveTab = 'home' | 'conversations' | 'drills' | 'qna' | 'appendices' | 'profile' | 'calendar';
