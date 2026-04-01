// Fetches and parses events from the published Woodland Google Sheet CSV.
//
// Expected columns:
//   Show Date | Show Title / Lineup | Show Title | Description | Ticket Link | Category | Status | Venue Name | Source

function parseCSV(text) {
    const lines = text.trim().split('\n');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map((h) => h.trim());

    return lines.slice(1).map((line) => {
        const values = [];
        let current = '';
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            if (line[i] === '"') {
                inQuotes = !inQuotes;
            } else if (line[i] === ',' && !inQuotes) {
                values.push(current.trim());
                current = '';
            } else {
                current += line[i];
            }
        }
        values.push(current.trim());

        const row = {};
        headers.forEach((header, i) => {
            row[header] = values[i] || '';
        });
        return row;
    });
}

export async function fetchSheetEvents(sheetUrl) {
    if (!sheetUrl) return { futureShows: [], pastShows: [] };

    const res = await fetch(sheetUrl);
    if (!res.ok) throw new Error(`Failed to fetch sheet: ${res.status}`);

    const text = await res.text();
    const rows = parseCSV(text);
    const now = Date.now();

    const shows = rows
        .filter((row) => row['Show Date'])
        .map((row, i) => ({
            id: `sheet-${i}`,
            date: row['Show Date'],
            show_title: row['Show Title'] || '',
            performers: row['Show Title / Lineup']
                ? row['Show Title / Lineup'].split(',').map((p) => p.trim()).filter(Boolean)
                : [],
            description: row['Description'] || '',
            categories: row['Category'] || '',
            ticket_link: row['Ticket Link'] || '',
            venue: row['Venue Name'] || 'Woodland Theater',
        }))
        .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

    const woodlandShows = shows.filter((s) => !s.venue || s.venue === 'Woodland Theater');
    const otherVenueShows = shows.filter((s) => s.venue && s.venue !== 'Woodland Theater');

    const futureShows = woodlandShows.filter((s) => Date.parse(s.date) >= now);
    const pastShows = [...woodlandShows]
        .filter((s) => Date.parse(s.date) < now)
        .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

    const pastVenueShows = [...otherVenueShows]
        .filter((s) => Date.parse(s.date) < now)
        .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

    return { futureShows, pastShows, pastVenueShows };
}
