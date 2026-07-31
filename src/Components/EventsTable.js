import { useState } from 'react';
import SheetEvent from './SheetEvent';
import '../CSS/Events.css';

function EventsTable({ shows, defaultSort = 'date-asc', showVenue = false }) {
    const [sort, setSort] = useState(defaultSort);

    function toggleSort(field) {
        if (sort === `${field}-asc`) setSort(`${field}-desc`);
        else setSort(`${field}-asc`);
    }

    function arrow(field) {
        if (sort.startsWith(field)) return sort.endsWith('asc') ? ' ↑' : ' ↓';
        return '';
    }

    const sorted = [...shows].sort((a, b) => {
        if (sort === 'date-asc') return Date.parse(a.date) - Date.parse(b.date);
        if (sort === 'date-desc') return Date.parse(b.date) - Date.parse(a.date);
        if (sort === 'title-asc') return (a.show_title || '').localeCompare(b.show_title || '');
        if (sort === 'title-desc') return (b.show_title || '').localeCompare(a.show_title || '');
        if (sort === 'performers-asc') return (a.performers[0] || '').localeCompare(b.performers[0] || '');
        if (sort === 'performers-desc') return (b.performers[0] || '').localeCompare(a.performers[0] || '');
        if (sort === 'categories-asc') return a.categories.localeCompare(b.categories);
        if (sort === 'categories-desc') return b.categories.localeCompare(a.categories);
        return 0;
    });

    return (
        <div className={`events-table${showVenue ? ' events-table--venue' : ''}`}>
            <div className="events-table-header">
                <button className="sort-header" onClick={() => toggleSort('date')}>
                    Date{arrow('date')}
                </button>
                <button className="sort-header events-col-time">Time</button>
                <button className="sort-header events-col-cost">Sugg. $</button>
                <button className="sort-header" onClick={() => toggleSort('title')}>
                    Show{arrow('title')}
                </button>
                {showVenue && <button className="sort-header events-col-venue">Venue</button>}
                <button className="sort-header events-col-category" onClick={() => toggleSort('categories')}>
                    Category{arrow('categories')}
                </button>
                <span className="events-col-actions" aria-hidden="true" />
            </div>
            {sorted.map((show) => (
                <SheetEvent key={show.id} show={show} showVenue={showVenue} />
            ))}
        </div>
    );
}

export default EventsTable;
