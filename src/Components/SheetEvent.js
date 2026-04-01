function SheetEvent({ show }) {
    const { date, show_title, performers, categories, ticket_link } = show;

    function formatDate(input) {
        const pattern = /(\d{4})-(\d{2})-(\d{2})/;
        if (!input || !input.match(pattern)) return null;
        const d = new Date(input + 'T12:00:00');
        const day = d.toLocaleDateString('en-US', { weekday: 'short' });
        const formatted = input.replace(pattern, '$2/$3/$1');
        return `${day} ${formatted}`;
    }

    const lineupText = show_title
        ? `${show_title}${performers.length > 0 ? ' — ' + performers.join(', ') : ''}`
        : performers.join(', ');

    return (
        <div className="events-row">
            <div className="events-col-date">{formatDate(date)}</div>
            <div className="events-col-lineup">
                {lineupText || 'Show'}
                {ticket_link && (
                    <a
                        href={ticket_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ticket-link"
                        onClick={(e) => e.stopPropagation()}
                    >
                        Tickets ↗
                    </a>
                )}
            </div>
            <div className="events-col-category">{categories}</div>
        </div>
    );
}

export default SheetEvent;
