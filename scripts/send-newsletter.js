// Woodland Theater — Monthly Newsletter
// Runs every Friday via GitHub Actions.
// Sends only if the 1st of next month is within the next 7 days.

const MAILCHIMP_SERVER = 'us15';
const REQUEST_SHOW_URL = 'https://woodlandtheater.org/request-a-show'; // TODO: update with real URL

// ── Date check ──────────────────────────────────────────────────────────────

function shouldSendToday() {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const daysUntilFirst = Math.ceil((nextMonth - now) / (1000 * 60 * 60 * 24));
    return daysUntilFirst <= 7;
}

// ── CSV fetch + parse ────────────────────────────────────────────────────────

async function fetchShows(sheetUrl) {
    const res = await fetch(sheetUrl);
    if (!res.ok) throw new Error(`Failed to fetch sheet: ${res.status}`);
    const text = await res.text();
    return parseCSV(text);
}

function parseCSV(text) {
    const lines = text.trim().split('\n');
    if (lines.length < 2) return [];
    const headers = lines[0].split(',').map(h => h.trim());
    return lines.slice(1).map(line => {
        const values = [];
        let current = '';
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            if (line[i] === '"') { inQuotes = !inQuotes; }
            else if (line[i] === ',' && !inQuotes) { values.push(current.trim()); current = ''; }
            else { current += line[i]; }
        }
        values.push(current.trim());
        const row = {};
        headers.forEach((h, i) => { row[h] = values[i] || ''; });
        return row;
    });
}

function getUpcomingShows(rows) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Shows from today through end of next month
    const endOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0);

    return rows
        .filter(row => {
            if (!row['Show Date']) return false;
            const d = new Date(row['Show Date'] + 'T12:00:00');
            return d >= today && d <= endOfNextMonth && (!row['Venue Name'] || row['Venue Name'] === 'Woodland Theater');
        })
        .sort((a, b) => new Date(a['Show Date']) - new Date(b['Show Date']));
}

// ── Email HTML ───────────────────────────────────────────────────────────────

function formatDate(input) {
    const d = new Date(input + 'T12:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

function buildEmail(shows) {
    const nextMonthName = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
        .toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const showRows = shows.length === 0
        ? `<tr><td colspan="2" style="padding:20px;text-align:center;color:#666;">No shows scheduled yet — check back soon!</td></tr>`
        : shows.map(row => {
            const title = row['Show Title'] || '';
            const lineup = row['Show Title / Lineup'] || '';
            const performers = lineup ? lineup.split(',').map(p => p.trim()).filter(Boolean) : [];
            const ticketLink = row['Ticket Link'] || '';
            const cost = row['Cost'] || '';
            const time = row['Start Time'] || '';

            const lineupHtml = title
                ? `<strong>${title}</strong>${performers.length ? ' &mdash; ' + performers.join(', ') : ''}`
                : performers.join(', ') || 'Show';

            const meta = [time, cost].filter(Boolean).join(' &middot; ');

            return `
            <tr>
                <td style="padding:14px 20px;border-bottom:1px solid #e0e0e0;vertical-align:top;width:140px;color:#555;font-size:14px;white-space:nowrap;">
                    ${formatDate(row['Show Date'])}
                    ${meta ? `<br><span style="font-size:12px;color:#888;">${meta}</span>` : ''}
                </td>
                <td style="padding:14px 20px;border-bottom:1px solid #e0e0e0;vertical-align:top;font-size:15px;">
                    ${lineupHtml}
                    ${ticketLink ? `<br><a href="${ticketLink}" style="font-size:12px;color:#02a79e;text-decoration:none;">Tickets ↗</a>` : ''}
                </td>
            </tr>`;
        }).join('');

    return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Georgia,serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 0;">
        <tr><td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:8px;overflow:hidden;">

                <!-- Header -->
                <tr>
                    <td style="background:rgb(41,122,122);padding:36px 40px;text-align:center;">
                        <h1 style="margin:0;color:white;font-size:28px;letter-spacing:1px;">Woodland Theater</h1>
                        <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:15px;">608 NW 65th St &middot; Seattle, WA</p>
                    </td>
                </tr>

                <!-- Intro -->
                <tr>
                    <td style="padding:32px 40px 8px;text-align:center;">
                        <h2 style="margin:0 0 12px;color:#222;font-size:22px;">Upcoming Shows &mdash; ${nextMonthName}</h2>
                        <p style="margin:0;color:#555;font-size:15px;line-height:1.6;">
                            Here's what's coming up at Woodland. All ages, good vibes.
                        </p>
                    </td>
                </tr>

                <!-- Shows table -->
                <tr>
                    <td style="padding:24px 20px;">
                        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e0e0e0;border-radius:6px;overflow:hidden;">
                            ${showRows}
                        </table>
                    </td>
                </tr>

                <!-- Events page link -->
                <tr>
                    <td style="padding:0 40px 24px;text-align:center;">
                        <a href="https://woodlandtheater.org/events"
                           style="display:inline-block;background:rgb(41,122,122);color:white;text-decoration:none;padding:12px 32px;border-radius:24px;font-size:15px;">
                            View All Events
                        </a>
                    </td>
                </tr>

                <!-- Divider -->
                <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #e0e0e0;margin:0;"></td></tr>

                <!-- Request a show -->
                <tr>
                    <td style="padding:28px 40px;text-align:center;">
                        <p style="margin:0 0 12px;color:#555;font-size:14px;">Interested in putting on a show at Woodland?</p>
                        <a href="${REQUEST_SHOW_URL}"
                           style="color:rgb(41,122,122);text-decoration:none;font-size:15px;font-weight:bold;">
                            Request a Show ↗
                        </a>
                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td style="background:#f9f9f9;padding:20px 40px;text-align:center;border-top:1px solid #e0e0e0;">
                        <p style="margin:0;font-size:12px;color:#999;">
                            Woodland Theater &middot; 608 NW 65th St, Seattle WA 98117<br>
                            <a href="https://www.instagram.com/woodlandtheater" style="color:#999;">@woodlandtheater</a>
                        </p>
                    </td>
                </tr>

            </table>
        </td></tr>
    </table>
</body>
</html>`;
}

// ── Mailchimp ────────────────────────────────────────────────────────────────

async function mailchimpRequest(path, method, body) {
    const apiKey = process.env.MAILCHIMP_API_KEY;
    const res = await fetch(`https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0${path}`, {
        method,
        headers: {
            'Authorization': `apikey ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
    });
    const json = await res.json();
    if (!res.ok) throw new Error(`Mailchimp ${method} ${path} failed: ${JSON.stringify(json)}`);
    return json;
}

async function sendNewsletter(html, shows) {
    const listId = process.env.MAILCHIMP_LIST_ID;
    const nextMonthName = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
        .toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    console.log('Creating campaign...');
    const campaign = await mailchimpRequest('/campaigns', 'POST', {
        type: 'regular',
        recipients: { list_id: listId },
        settings: {
            subject_line: `Woodland Theater — Upcoming Shows for ${nextMonthName}`,
            preview_text: `${shows.length} show${shows.length !== 1 ? 's' : ''} coming up at Woodland`,
            title: `Newsletter ${nextMonthName}`,
            from_name: 'Woodland Theater',
            reply_to: 'contact@woodlandtheater.org',
        },
    });

    console.log('Setting content...');
    await mailchimpRequest(`/campaigns/${campaign.id}/content`, 'PUT', { html });

    console.log('Sending...');
    await mailchimpRequest(`/campaigns/${campaign.id}/actions/send`, 'POST');

    console.log(`Newsletter sent! Campaign ID: ${campaign.id}`);
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
    if (!shouldSendToday()) {
        console.log('Not within 7 days of the 1st — skipping newsletter.');
        return;
    }

    const sheetUrl = process.env.GOOGLE_SHEET_URL;
    if (!sheetUrl) throw new Error('GOOGLE_SHEET_URL not set');

    console.log('Fetching shows...');
    const rows = await fetchShows(sheetUrl);
    const shows = getUpcomingShows(rows);
    console.log(`Found ${shows.length} upcoming shows`);

    const html = buildEmail(shows);
    await sendNewsletter(html, shows);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
