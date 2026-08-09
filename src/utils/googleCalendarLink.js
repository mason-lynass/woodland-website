// Builds an "Add to Google Calendar" URL for a show. Uses Google's ctz
// param to pass Woodland's local wall-clock time directly, so we don't
// have to do our own UTC/DST conversion here.
const VENUE_TIMEZONE = 'America/Los_Angeles';
const DEFAULT_DURATION_HOURS = 2;

function parseTime(timeStr) {
    const match = (timeStr || '').match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!match) return null;
    let hours = parseInt(match[1], 10) % 12;
    const minutes = parseInt(match[2], 10);
    if (/PM/i.test(match[3])) hours += 12;
    return { hours, minutes };
}

function pad(n) {
    return String(n).padStart(2, '0');
}

export function googleCalendarUrl(show) {
    const { date, show_title, performers, venue, cost, start_time } = show;
    const [year, month, day] = date.split('-').map(Number);
    const time = parseTime(start_time);

    let dates;
    if (time) {
        const start = new Date(year, month - 1, day, time.hours, time.minutes);
        const end = new Date(start.getTime() + DEFAULT_DURATION_HOURS * 60 * 60 * 1000);
        const fmt = (d) =>
            `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
        dates = `${fmt(start)}/${fmt(end)}`;
    } else {
        const end = new Date(year, month - 1, day + 1);
        const fmtDate = (d) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
        dates = `${fmtDate(new Date(year, month - 1, day))}/${fmtDate(end)}`;
    }

    const title = show_title || (performers || []).join(', ') || 'Show at Woodland Theater';
    const details = [cost && `Suggested donation: ${cost}`, 'https://www.woodlandtheater.org/events']
        .filter(Boolean)
        .join('\n');

    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: title,
        dates,
        details,
        location: venue || 'Woodland Theater',
        ctz: VENUE_TIMEZONE,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
