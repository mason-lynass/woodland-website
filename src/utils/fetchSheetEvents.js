// Fetches and parses events from a publicly published Google Sheet CSV.
//
// To set up your sheet:
// 1. Create a Google Sheet with these columns (row 1 = headers):
//    Date | Title | Performers | Description | Categories | Ticket Link
//
//    - Date: YYYY-MM-DD (e.g. 2026-05-15)
//    - Title: optional show title
//    - Performers: comma-separated names (e.g. "Band One, Band Two")
//    - Description: optional short description
//    - Categories: optional (e.g. "music", "workshop")
//    - Ticket Link: optional URL
//
// 2. File → Share → Publish to web → Sheet1 → CSV → Publish
// 3. Copy the URL into REACT_APP_GOOGLE_SHEET_URL in .env

function parseCSV(text) {
    const lines = text.trim().split('\n');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map((h) => h.trim().toLowerCase().replace(/\s+/g, '_'));

    return lines.slice(1).map((line) => {
        // Handle quoted fields that may contain commas
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
        .filter((row) => row.date)
        .map((row, i) => ({
            id: `sheet-${i}`,
            date: row.date,
            show_title: row.title || '',
            performers: row.performers
                ? row.performers.split(',').map((p) => p.trim()).filter(Boolean)
                : [],
            description: row.description || '',
            categories: row.categories || '',
            ticket_link: row.ticket_link || '',
        }))
        .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

    const futureShows = shows.filter((s) => Date.parse(s.date) >= now);
    const pastShows = [...shows]
        .filter((s) => Date.parse(s.date) < now)
        .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

    return { futureShows, pastShows };
}
