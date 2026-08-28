/**
 * Calendar Utilities for RCIA Schedule & Google Calendar Integration
 */

export interface CalendarEventParams {
  title: string;
  description: string;
  location?: string;
  startDate?: string; // YYYY-MM-DD or ISO
  endDate?: string;
  allDay?: boolean;
}

export function generateGoogleCalendarUrl(event: CalendarEventParams): string {
  const base = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
  const text = encodeURIComponent(event.title);
  const details = encodeURIComponent(event.description);
  const location = encodeURIComponent(event.location || "St Mary's | St John Bosco | St Edward's Catholic Church");

  let datesParam = '';
  if (event.startDate) {
    const cleanStart = event.startDate.replace(/[-:]/g, '').split('.')[0];
    if (event.allDay) {
      // YYYYMMDD/YYYYMMDD
      const startParts = event.startDate.split('-');
      if (startParts.length === 3) {
        const y = parseInt(startParts[0]);
        const m = parseInt(startParts[1]) - 1;
        const d = parseInt(startParts[2]);
        const nextDay = new Date(y, m, d + 1);
        const y2 = nextDay.getFullYear();
        const m2 = String(nextDay.getMonth() + 1).padStart(2, '0');
        const d2 = String(nextDay.getDate()).padStart(2, '0');
        datesParam = `&dates=${event.startDate.replace(/-/g, '')}/${y2}${m2}${d2}`;
      }
    } else {
      const cleanEnd = event.endDate ? event.endDate.replace(/[-:]/g, '').split('.')[0] : cleanStart;
      datesParam = `&dates=${cleanStart}/${cleanEnd}`;
    }
  }

  return `${base}&text=${text}&details=${details}&location=${location}${datesParam}`;
}

export function downloadIcsFile(filename: string, events: CalendarEventParams[]): void {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Becoming Catholic RCIA//Catechumenate Schedule//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];

  events.forEach((ev, idx) => {
    lines.push('BEGIN:VEVENT');
    lines.push(`UID:rcia-event-${idx}-${Date.now()}@becomingcatholic.app`);
    lines.push(`SUMMARY:${ev.title.replace(/,/g, '\\,')}`);
    lines.push(`DESCRIPTION:${ev.description.replace(/\n/g, '\\n').replace(/,/g, '\\,')}`);
    lines.push(`LOCATION:${(ev.location || "Parish Church").replace(/,/g, '\\,')}`);
    
    if (ev.startDate) {
      const dt = ev.startDate.replace(/[-:]/g, '');
      lines.push(`DTSTART;VALUE=DATE:${dt}`);
      lines.push(`DTEND;VALUE=DATE:${dt}`);
    } else {
      const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      lines.push(`DTSTART:${now}`);
      lines.push(`DTEND:${now}`);
    }
    lines.push('STATUS:CONFIRMED');
    lines.push('END:VEVENT');
  });

  lines.push('END:VCALENDAR');

  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', filename.endsWith('.ics') ? filename : `${filename}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
