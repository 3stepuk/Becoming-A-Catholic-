import React, { useState } from 'react';
import { 
  Calendar, 
  Download, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Plus, 
  Bell,
  Church
} from 'lucide-react';
import { UserProfile } from '../types';
import { generateGoogleCalendarUrl, downloadIcsFile, CalendarEventParams } from '../utils/calendar';
import { CONVERSATIONS } from '../data/conversations';

interface CalendarViewProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ profile, onUpdateProfile }) => {
  const [acceptanceDate, setAcceptanceDate] = useState(profile.dateOfAcceptance || '');
  const [electionDate, setElectionDate] = useState(profile.dateOfElection || '');
  const [initiationDate, setInitiationDate] = useState(profile.dateOfInitiation || '');
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleSaveDates = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...profile,
      dateOfAcceptance: acceptanceDate,
      dateOfElection: electionDate,
      dateOfInitiation: initiationDate,
    });
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  const MAJOR_RITES_SCHEDULE: {
    title: string;
    stage: string;
    timing: string;
    description: string;
    location: string;
    customDate?: string;
  }[] = [
    {
      title: 'First Step: Rite of Acceptance into Order of Catechumens',
      stage: 'Period 1 → Period 2',
      timing: 'When initial inquiry and first conversion are discerned',
      description: 'The inquirers publicly express their intention to follow Christ. The Church accepts them, signs them with the Cross, and enrols them among the catechumens.',
      location: "Parish Church (St Mary's | St John Bosco | St Edward's)",
      customDate: acceptanceDate,
    },
    {
      title: 'Second Step: Rite of Election or Enrolment of Names',
      stage: 'Period 2 → Period 3 (Lent)',
      timing: 'First Sunday of Lent (Diocesan Celebration)',
      description: 'The Bishop and Church discern readiness for final preparation. Catechumens are called "the elect" and enter the Lenten spiritual preparation.',
      location: 'St Barnabas Cathedral, Nottingham',
      customDate: electionDate,
    },
    {
      title: 'First Scrutiny',
      stage: 'Period 3: Lent',
      timing: 'Third Sunday of Lent',
      description: 'Lenten rite of prayer and exorcism for purification and healing; reflecting on the Samaritan Woman at the Well (Living Water).',
      location: 'Parish Church',
    },
    {
      title: 'Second Scrutiny',
      stage: 'Period 3: Lent',
      timing: 'Fourth Sunday of Lent (Laetare Sunday)',
      description: 'Lenten rite asking Christ to heal interior blindness; reflecting on the Man Born Blind (Light of the World).',
      location: 'Parish Church',
    },
    {
      title: 'Third Scrutiny',
      stage: 'Period 3: Lent',
      timing: 'Fifth Sunday of Lent',
      description: 'Lenten rite praying for deliverance from death and sin; reflecting on the Raising of Lazarus (The Resurrection and the Life).',
      location: 'Parish Church',
    },
    {
      title: 'Holy Saturday Preparation & Ephphetha Rites',
      stage: 'Period 3: Final Hours',
      timing: 'Holy Saturday Morning',
      description: 'Recitation of the Creed, opening of ears and mouth (Ephphetha), and practical preparation for the Easter Vigil.',
      location: 'Parish Church',
    },
    {
      title: 'Third Step: The Easter Vigil & Sacraments of Initiation',
      stage: 'The High Point: Paschal Mystery',
      timing: 'Holy Saturday Night (Easter Vigil)',
      description: 'Solemn celebration in darkness and light: Baptism, Confirmation with Sacred Chrism, and First Holy Communion at the Lord\'s Table.',
      location: 'Parish Church',
      customDate: initiationDate,
    },
    {
      title: 'Mystagogy & Easter Season Discipleship',
      stage: 'Period 4: Mystagogy',
      timing: 'Easter Season (50 Days to Pentecost and beyond)',
      description: 'Postbaptismal catechesis deepening the newly baptised (neophytes) in the sacraments, Eucharistic life, Penance, and parish mission.',
      location: 'Parish Church & Fellowship',
    },
  ];

  const handleExportFullScheduleIcs = () => {
    const events: CalendarEventParams[] = [
      ...MAJOR_RITES_SCHEDULE.map((rite) => ({
        title: `RCIA: ${rite.title}`,
        description: `${rite.description}\n\nStage: ${rite.stage}\nNormal Timing: ${rite.timing}`,
        location: rite.location,
        startDate: rite.customDate || undefined,
        allDay: true,
      })),
      ...CONVERSATIONS.map((conv) => ({
        title: `RCIA Conv ${conv.id}: ${conv.title}`,
        description: `Purpose: ${conv.purpose}\n\nRemember: ${conv.remember}\n\nWeekly Practice: ${conv.thisWeek}\n\nPrayer: ${conv.prayer}`,
        location: profile.parishName,
      })),
    ];

    downloadIcsFile('becoming-catholic-rcia-schedule', events);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2A2A] pb-5">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-[10px] font-mono text-[#6C7BEA] uppercase tracking-[0.2em] font-bold">
            <Calendar className="w-3.5 h-3.5 text-[#6C7BEA]" />
            <span>Liturgical Calendar & Google Sync</span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#E2E8F0]">
            Rites & Schedule
          </h1>
          <p className="font-garamond text-base sm:text-lg text-[#94A3B8] max-w-2xl">
            The Paschal rhythm anchors the catechumenate journey: Election on the First Sunday of Lent, Initiation at the Easter Vigil, and Mystagogy through the Easter season.
          </p>
        </div>

        <button
          onClick={handleExportFullScheduleIcs}
          id="export-calendar-ics-btn"
          className="px-6 py-3 rounded bg-[#6C7BEA] hover:bg-[#5A69D6] text-white uppercase tracking-[0.2em] text-[11px] font-bold flex items-center justify-center space-x-2 transition-all shadow-lg shadow-[#6C7BEA]/20"
        >
          <Download className="w-4 h-4" />
          <span>Export Full Schedule (.ics)</span>
        </button>
      </div>

      {/* Parish Custom Dates Form */}
      <div className="bg-[#161616] border border-[#2A2A2A] rounded-lg p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-[#6C7BEA] font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
            <Clock className="w-4 h-4 text-[#6C7BEA]" />
            <span>Your Parish Milestone Dates</span>
          </div>
          {savedFeedback && (
            <span className="text-xs text-emerald-400 font-mono">
              ✓ Dates saved
            </span>
          )}
        </div>

        <p className="text-xs text-[#94A3B8]">
          Enter your parish's scheduled dates below to enable accurate Google Calendar sync.
        </p>

        <form onSubmit={handleSaveDates} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-[#94A3B8] mb-1 font-semibold uppercase tracking-wider text-[10px]">
              Date of Acceptance:
            </label>
            <input
              type="date"
              value={acceptanceDate}
              onChange={(e) => setAcceptanceDate(e.target.value)}
              className="w-full bg-[#0F0F0F] border border-[#2A2A2A] focus:border-[#6C7BEA] rounded px-3 py-2 text-xs text-[#E2E8F0] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-[#94A3B8] mb-1 font-semibold uppercase tracking-wider text-[10px]">
              Date of Election (1st Sun of Lent):
            </label>
            <input
              type="date"
              value={electionDate}
              onChange={(e) => setElectionDate(e.target.value)}
              className="w-full bg-[#0F0F0F] border border-[#2A2A2A] focus:border-[#6C7BEA] rounded px-3 py-2 text-xs text-[#E2E8F0] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-[#94A3B8] mb-1 font-semibold uppercase tracking-wider text-[10px]">
              Date of Initiation (Easter Vigil):
            </label>
            <input
              type="date"
              value={initiationDate}
              onChange={(e) => setInitiationDate(e.target.value)}
              className="w-full bg-[#0F0F0F] border border-[#2A2A2A] focus:border-[#6C7BEA] rounded px-3 py-2 text-xs text-[#E2E8F0] focus:outline-none"
            />
          </div>

          <div className="sm:col-span-3 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#0F0F0F] hover:bg-[#1A1A1A] text-[#E2E8F0] border border-[#2A2A2A] hover:border-[#6C7BEA]/40 rounded text-[11px] uppercase tracking-wider font-bold transition-colors"
            >
              Save Milestone Dates
            </button>
          </div>
        </form>
      </div>

      {/* Liturgical Milestones Timeline */}
      <div className="space-y-4">
        <h2 className="font-cinzel text-xl font-bold text-[#E2E8F0] tracking-wide">
          Major Rites & Lenten Timeline
        </h2>

        <div className="space-y-3">
          {MAJOR_RITES_SCHEDULE.map((rite, idx) => {
            const googleCalUrl = generateGoogleCalendarUrl({
              title: `RCIA: ${rite.title}`,
              description: `${rite.description}\n\nStage: ${rite.stage}\nNormal Timing: ${rite.timing}`,
              location: rite.location,
              startDate: rite.customDate || undefined,
              allDay: true,
            });

            return (
              <div
                key={idx}
                className="bg-[#161616] border border-[#2A2A2A] hover:border-[#6C7BEA]/40 rounded-lg p-5 sm:p-6 transition-all space-y-3 shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-0.5 rounded text-[9px] font-mono uppercase tracking-widest bg-[#0F0F0F] text-[#6C7BEA] border border-[#6C7BEA]/20 font-bold">
                        {rite.stage}
                      </span>
                      <span className="text-[11px] text-[#94A3B8] font-mono">
                        {rite.timing}
                      </span>
                    </div>
                    <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#E2E8F0]">
                      {rite.title}
                    </h3>
                  </div>

                  <a
                    href={googleCalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded bg-[#0F0F0F] hover:bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#6C7BEA]/40 text-[11px] uppercase tracking-wider font-bold text-[#6C7BEA] hover:text-white transition-colors shrink-0 self-start sm:self-center"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#6C7BEA]" />
                    <span>Add to Google Calendar</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                </div>

                <p className="font-garamond text-base sm:text-lg text-[#94A3B8] leading-relaxed">
                  {rite.description}
                </p>

                <div className="flex items-center space-x-2 text-xs text-[#94A3B8] pt-2 border-t border-[#2A2A2A]">
                  <MapPin className="w-3.5 h-3.5 text-[#64748B]" />
                  <span>{rite.location}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
