// Woodland Theater — Events calendar feed (ICS)
// Regenerated on a schedule via GitHub Actions and pushed straight to the
// gh-pages branch as /events.ics, so calendar apps subscribed to it pick up
// changes without waiting for a full site deploy.

const TIMEZONE = 'America/Los_Angeles';
const DEFAULT_DURATION_HOURS = 2;
const SITE_URL = 'https://www.woodlandtheater.org';

// ── CSV fetch + parse (mirrors src/utils/fetchSheetEvents.js) ────────────────

async function fetchRows(sheetUrl) {
    const res = await fetch(sheetUrl);
    if (!res.ok) throw new Error(`Failed to fetch sheet: ${res.status}`);
    const text = await res.text();
    return parseCSV(text);
}

function parseCSV(text) {
    const lines = text.trim().split('\n');
    if (lines.length < 2) return [];
    const headers = lines[0].split(',').map((h) => h.trim());
    return lines.slice(1).map((line) => {
        const values = [];
        let current = '';
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            if (line[i] === '"') inQuotes = !inQuotes;
            else if (line[i] === ',' && !inQuotes) { values.push(current.trim()); current = ''; }
            else current += line[i];
        }
        values.push(current.trim());
        const row = {};
        headers.forEach((h, i) => { row[h] = values[i] || ''; });
        return row;
    });
}

function slugify(str) {
    return (str || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function rowToShow(row) {
    const date = row['Show Date'];
    const showTitle = row['Show Title'] || '';
    const performers = row['Show Title / Lineup']
        ? row['Show Title / Lineup'].split(',').map((p) => p.trim()).filter(Boolean)
        : [];
    const titlePart = showTitle || performers[0] || 'event';
    return {
        date,
        slug: `${date}-${slugify(titlePart)}`,
        title: showTitle || performers.join(', ') || 'Show at Woodland Theater',
        time: row['Time'] || '',
        cost: row['Sugg. $'] || '',
        category: row['Category'] || '',
        venue: row['Venue Name'] || 'Woodland Theater',
        eventLink: row['Event Link'] || '',
    };
}

// ── Local-time (America/Los_Angeles) → UTC, DST-aware via Intl ───────────────

function getTzOffsetMinutes(utcMs, timeZone) {
    const dtf = new Intl.DateTimeFormat('en-US', {
        timeZone,
        hour12: false,
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
    });
    const parts = {};
    dtf.formatToParts(new Date(utcMs)).forEach((p) => { parts[p.type] = p.value; });
    const asUtc = Date.UTC(
        Number(parts.year), Number(parts.month) - 1, Number(parts.day),
        Number(parts.hour) % 24, Number(parts.minute), Number(parts.second)
    );
    return (asUtc - utcMs) / 60000;
}

function zonedTimeToUtc(year, month, day, hours, minutes, timeZone) {
    const utcGuess = Date.UTC(year, month - 1, day, hours, minutes);
    const offsetMinutes = getTzOffsetMinutes(utcGuess, timeZone);
    return new Date(utcGuess - offsetMinutes * 60000);
}

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

function formatUtcStamp(d) {
    return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
}

function formatDateOnly(year, month, day) {
    return `${year}${pad(month)}${pad(day)}`;
}

// ── ICS text building ─────────────────────────────────────────────────────────

function escapeText(str) {
    return (str || '')
        .replace(/\\/g, '\\\\')
        .replace(/;/g, '\\;')
        .replace(/,/g, '\\,')
        .replace(/\n/g, '\\n');
}

// RFC5545 requires folding lines longer than 75 octets.
function foldLine(line) {
    if (line.length <= 75) return line;
    let result = line.slice(0, 75);
    let rest = line.slice(75);
    while (rest.length > 0) {
        result += '\r\n ' + rest.slice(0, 74);
        rest = rest.slice(74);
    }
    return result;
}

function buildEvent(show) {
    const [year, month, day] = show.date.split('-').map(Number);
    const time = parseTime(show.time);

    let dtstart;
    let dtend;
    if (time) {
        const start = zonedTimeToUtc(year, month, day, time.hours, time.minutes, TIMEZONE);
        const end = new Date(start.getTime() + DEFAULT_DURATION_HOURS * 60 * 60 * 1000);
        dtstart = `DTSTART:${formatUtcStamp(start)}`;
        dtend = `DTEND:${formatUtcStamp(end)}`;
    } else {
        const endDate = new Date(year, month - 1, day + 1);
        dtstart = `DTSTART;VALUE=DATE:${formatDateOnly(year, month, day)}`;
        dtend = `DTEND;VALUE=DATE:${formatDateOnly(endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate())}`;
    }

    const descriptionParts = [
        show.cost && `Suggested donation: ${show.cost}`,
        show.category && `Category: ${show.category}`,
    ].filter(Boolean);

    const url = show.eventLink || `${SITE_URL}/events#${show.slug}`;

    const lines = [
        'BEGIN:VEVENT',
        `UID:${show.slug}@woodlandtheater.org`,
        `DTSTAMP:${formatUtcStamp(new Date())}`,
        dtstart,
        dtend,
        `SUMMARY:${escapeText(show.title)}`,
        descriptionParts.length ? `DESCRIPTION:${escapeText(descriptionParts.join(' — '))}` : null,
        `LOCATION:${escapeText(show.venue)}`,
        `URL:${url}`,
        'STATUS:CONFIRMED',
        'END:VEVENT',
    ].filter(Boolean);

    return lines.map(foldLine).join('\r\n');
}

function buildCalendar(shows) {
    const header = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Woodland Theater//Events//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'X-WR-CALNAME:Woodland Theater Events',
        'REFRESH-INTERVAL;VALUE=DURATION:P1D',
    ].map(foldLine).join('\r\n');

    const footer = 'END:VCALENDAR';

    return [header, ...shows.map(buildEvent), footer].join('\r\n') + '\r\n';
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
    const sheetUrl = process.env.GOOGLE_SHEET_URL;
    if (!sheetUrl) throw new Error('GOOGLE_SHEET_URL not set');

    const outPath = process.argv[2] || 'events.ics';

    console.log('Fetching shows...');
    const rows = await fetchRows(sheetUrl);
    const shows = rows.filter((row) => row['Show Date']).map(rowToShow);
    console.log(`Building ICS feed for ${shows.length} shows...`);

    const ics = buildCalendar(shows);
    require('fs').writeFileSync(outPath, ics);
    console.log(`Wrote ${outPath}`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
