import React, { useState } from 'react';
import { Scroll, CheckSquare, AlertTriangle, Info, ChevronRight, BookOpen, Printer } from 'lucide-react';
import { APPENDICES, Appendix } from '../data/appendices';

interface AppendicesViewProps {
  initialAppendixId?: string;
  onOpenConversation?: (id: number) => void;
}

export const AppendicesView: React.FC<AppendicesViewProps> = ({
  initialAppendixId = 'app-a',
  onOpenConversation,
}) => {
  const [selectedAppId, setSelectedAppId] = useState<string>(initialAppendixId);

  const activeApp = APPENDICES.find((a) => a.id === selectedAppId) || APPENDICES[0];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-[10px] font-mono text-[#6C7BEA] uppercase tracking-[0.2em] font-bold">
          <Scroll className="w-3.5 h-3.5 text-[#6C7BEA]" />
          <span>Pastoral, Liturgical & Canonical Guidelines</span>
        </div>
        <h1 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#E2E8F0]">
          Appendices A–H
        </h1>
        <p className="font-garamond text-base sm:text-lg text-[#94A3B8] max-w-3xl">
          Essential pastoral references, rite outlines, sponsor qualifications, readiness discernment, and canonical norms.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Appendix Sidebar / Selector */}
        <div className="lg:col-span-1 bg-[#121212] border border-[#2A2A2A] rounded-lg p-3 space-y-1 shadow-xl">
          <div className="text-[10px] font-mono uppercase text-[#64748B] font-bold px-3 py-2 tracking-wider">
            Appendices Index
          </div>
          {APPENDICES.map((app) => {
            const isSelected = app.id === activeApp.id;
            return (
              <button
                key={app.id}
                id={`tab-appendix-${app.letter.toLowerCase()}`}
                onClick={() => setSelectedAppId(app.id)}
                className={`w-full text-left px-3 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#161616] text-[#6C7BEA] border border-[#6C7BEA]/40 shadow-sm'
                    : 'text-[#94A3B8] hover:text-[#E2E8F0] hover:bg-[#161616]'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-[#64748B] font-bold">{app.letter}.</span>
                  <span className="truncate text-[11px] font-sans">{app.title}</span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#6C7BEA]' : 'text-[#4A4A4A]'}`} />
              </button>
            );
          })}
        </div>

        {/* Appendix Main Content */}
        <div className="lg:col-span-3 bg-[#161616] border border-[#2A2A2A] rounded-lg p-6 sm:p-8 space-y-6 shadow-xl">
          {/* Appendix Header */}
          <div className="border-b border-[#2A2A2A] pb-4 space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest bg-[#0F0F0F] text-[#6C7BEA] border border-[#6C7BEA]/20 font-bold">
                APPENDIX {activeApp.letter}
              </span>
            </div>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#E2E8F0]">
              {activeApp.title}
            </h2>
            {activeApp.subtitle && (
              <p className="font-garamond italic text-lg text-[#94A3B8]">
                {activeApp.subtitle}
              </p>
            )}
          </div>

          {/* Lead Text */}
          {activeApp.content.lead && (
            <p className="font-garamond text-lg text-[#E2E8F0] leading-relaxed font-semibold italic border-l-2 border-[#6C7BEA] pl-4">
              {activeApp.content.lead}
            </p>
          )}

          {/* Callouts */}
          {activeApp.content.callouts && (
            <div className="space-y-4">
              {activeApp.content.callouts.map((callout, idx) => {
                const isWarning = callout.type === 'warning';
                return (
                  <div
                    key={idx}
                    className={`rounded-lg p-5 border space-y-2 ${
                      isWarning
                        ? 'bg-amber-950/20 border-amber-800/60 text-amber-200'
                        : 'bg-[#0F0F0F] border-[#6C7BEA]/30 text-[#E2E8F0]'
                    }`}
                  >
                    <div className="flex items-center space-x-2 text-[10px] font-mono uppercase font-bold tracking-wider">
                      {isWarning ? (
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                      ) : (
                        <Info className="w-4 h-4 text-[#6C7BEA]" />
                      )}
                      <span className={isWarning ? 'text-amber-400' : 'text-[#6C7BEA]'}>
                        {callout.title}
                      </span>
                    </div>
                    <p className="font-garamond text-base sm:text-lg leading-relaxed whitespace-pre-line text-[#E2E8F0]">
                      {callout.text}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Table (if any) */}
          {activeApp.content.table && (
            <div className="overflow-x-auto rounded-lg border border-[#2A2A2A]">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#0F0F0F] text-[#6C7BEA] font-cinzel text-xs uppercase tracking-wider border-b border-[#2A2A2A]">
                  <tr>
                    {activeApp.content.table.headers.map((h, i) => (
                      <th key={i} className="p-3.5 font-bold text-[#6C7BEA]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A2A2A] text-[#94A3B8] font-sans">
                  {activeApp.content.table.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-[#1A1A1A] transition-colors">
                      <td className="p-3.5 font-medium text-[#E2E8F0] whitespace-nowrap align-top w-1/4">
                        {row[0]}
                      </td>
                      <td className="p-3.5 font-garamond text-base text-[#94A3B8] leading-relaxed align-top">
                        {row[1]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Sections */}
          {activeApp.content.sections && (
            <div className="space-y-6 pt-2">
              {activeApp.content.sections.map((sec, sIdx) => (
                <div key={sIdx} className="space-y-2 bg-[#0F0F0F] p-5 rounded-lg border border-[#2A2A2A]">
                  <h4 className="font-cinzel text-base sm:text-lg font-bold text-[#6C7BEA]">
                    {sec.heading}
                  </h4>
                  {Array.isArray(sec.body) ? (
                    <div className="font-garamond text-base sm:text-lg text-[#94A3B8] space-y-1.5 leading-relaxed">
                      {sec.body.map((line, lIdx) => (
                        <p key={lIdx}>{line}</p>
                      ))}
                    </div>
                  ) : (
                    <p className="font-garamond text-base sm:text-lg text-[#94A3B8] leading-relaxed">
                      {sec.body}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
