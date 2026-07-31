import { useState } from 'react';
import { googleCalendarUrl } from '../utils/googleCalendarLink';

function SheetEvent({ show, showVenue = false }) {
    const { date, show_title, performers, categories, start_time, cost, venue, slug, event_link } = show;
    const [copied, setCopied] = useState(false);

    function formatDate(input) {
        const pattern = /(\d{4})-(\d{2})-(\d{2})/;
        if (!input || !input.match(pattern)) return null;
        const d = new Date(input + 'T12:00:00');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (d.getTime() < today.getTime()) {
            return input.replace(pattern, '$2/$3/$1');
        }
        return d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    }

    async function handleShare() {
        const url = event_link || `${window.location.origin}/events#${slug}`;
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            // clipboard access denied/unavailable — nothing more we can do
        }
    }

    return (
        <div className="events-row" id={slug}>
            <div className="events-col-date">
                {formatDate(date)}
                {start_time && <span className="events-time">{start_time}</span>}
                <span className="events-cost">{cost || '-'}</span>
            </div>
            <div className="events-col-time">{start_time}</div>
            <div className="events-col-cost">{cost || '-'}</div>
            <div className="events-col-show">
                {show_title && <strong>{show_title}</strong>}
                {show_title && performers.length > 0 && ': '}
                {performers.length > 0 && performers.join(', ')}
                {!show_title && performers.length === 0 && <span className="events-no-title">—</span>}
            </div>
            {showVenue && <div className="events-col-venue">{venue}</div>}
            <div className="events-col-category">
                {categories}
            </div>
            <div className="events-col-actions">
                <a
                    className="events-action-icon"
                    href={googleCalendarUrl(show)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Add to Google Calendar"
                    title="Add to Google Calendar"
                >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <path d="M3 10h18M8 2v4M16 2v4" />
                    </svg>
                </a>
                <button
                    type="button"
                    className="events-action-icon"
                    onClick={handleShare}
                    aria-label="Copy link to this event"
                    title={copied ? 'Copied!' : 'Copy link to this event'}
                >
                    {copied ? (
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 6L9 17l-5-5" />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M10 13a5 5 0 007.07 0l2.83-2.83a5 5 0 00-7.07-7.07l-1.5 1.5" />
                            <path d="M14 11a5 5 0 00-7.07 0L4.1 13.83a5 5 0 007.07 7.07l1.5-1.5" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
}

export default SheetEvent;
