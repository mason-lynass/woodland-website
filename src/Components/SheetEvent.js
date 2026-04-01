function SheetEvent({ show }) {
    const { date, show_title, performers, categories, ticket_link } = show;

    function formatDate(input) {
        const pattern = /(\d{4})-(\d{2})-(\d{2})/;
        if (!input || !input.match(pattern)) return null;
        return input.replace(pattern, '$2/$3/$1');
    }

    return (
        <div className="one-show">
            <h4 id="show-date">{formatDate(date)}</h4>
            <div id="show-tags">
                {show_title && (
                    <div id="show-title">
                        <h4>{show_title}</h4>
                    </div>
                )}
                <div id="band-links">
                    {performers.length > 0 ? (
                        performers.map((name) => (
                            <span key={name} className="event-band-link" style={{ cursor: 'default' }}>
                                {name}
                            </span>
                        ))
                    ) : (
                        <h4 style={{ margin: '0 2vw' }}>Show</h4>
                    )}
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', marginLeft: 'auto' }}>
                <h4 id="show-categories">{categories}</h4>
                {ticket_link && (
                    <a
                        href={ticket_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="event-band-link"
                        style={{ fontSize: '0.8rem' }}
                    >
                        Tickets
                    </a>
                )}
            </div>
        </div>
    );
}

export default SheetEvent;
