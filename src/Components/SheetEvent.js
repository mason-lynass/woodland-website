function SheetEvent({ show }) {
    const { date, show_title, performers, categories, ticket_link, start_time, cost, description } = show;

    function formatDate(input) {
        const pattern = /(\d{4})-(\d{2})-(\d{2})/;
        if (!input || !input.match(pattern)) return null;
        const d = new Date(input + 'T12:00:00');
        const day = d.toLocaleDateString('en-US', { weekday: 'short' });
        const formatted = input.replace(pattern, '$2/$3/$1');
        return `${day} ${formatted}`;
    }

    return (
        <div className="events-row">
            <div className="events-col-date">
                {formatDate(date)}
                {start_time && <span className="events-time">{start_time}</span>}
            </div>
            <div className="events-col-title">
                {show_title ? <strong>{show_title}</strong> : <span className="events-no-title">—</span>}
            </div>
            <div className="events-col-lineup">
                <span className="events-lineup-text">
                    {performers.length > 0 ? performers.join(', ') : <span className="events-no-title">—</span>}
                </span>
                {description && <span className="events-description">{description}</span>}
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
            <div className="events-col-category">
                {cost && <span className="events-cost">{cost}</span>}
                {categories}
            </div>
        </div>
    );
}

export default SheetEvent;
