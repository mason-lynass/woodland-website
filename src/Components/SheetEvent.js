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
            <div className="events-col-show">
                {show_title && <strong>{show_title}</strong>}
                {show_title && performers.length > 0 && ': '}
                {performers.length > 0 && performers.join(', ')}
                {!show_title && performers.length === 0 && <span className="events-no-title">—</span>}
            </div>
            <div className="events-col-description">
                {description || <span className="events-no-title">—</span>}
            </div>
            <div className="events-col-ticket">
                {ticket_link
                    ? <a href={ticket_link} target="_blank" rel="noopener noreferrer" className="ticket-link" onClick={(e) => e.stopPropagation()}>Tickets ↗</a>
                    : <span className="events-no-title">—</span>
                }
            </div>
            <div className="events-col-category">
                {cost && <span className="events-cost">{cost}</span>}
                {categories}
            </div>
        </div>
    );
}

export default SheetEvent;
