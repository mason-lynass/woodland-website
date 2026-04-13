import { useState } from 'react';
import SheetEvent from './SheetEvent';
import IGGallery from './IGGallery';
import '../CSS/Events.css';

function EventsTable({ shows, defaultSort = 'date-asc' }) {
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
        <div className="events-table">
            <div className="events-table-header">
                <button className="sort-header" onClick={() => toggleSort('date')}>
                    Date{arrow('date')}
                </button>
                <button className="sort-header" onClick={() => toggleSort('title')}>
                    Title{arrow('title')}
                </button>
                <button className="sort-header" onClick={() => toggleSort('performers')}>
                    Lineup{arrow('performers')}
                </button>
                <button className="sort-header events-col-category" onClick={() => toggleSort('categories')}>
                    Category{arrow('categories')}
                </button>
            </div>
            {sorted.map((show) => (
                <SheetEvent key={show.id} show={show} />
            ))}
        </div>
    );
}

function Events({ sanityLoaded, futureShows, pastShows, pastVenueShows, behold }) {
    const totalWoodland = futureShows.length + pastShows.length;
    const totalVenue = (pastVenueShows || []).length;

    return sanityLoaded === false ? (
        <h2 id="events-loading">loading...</h2>
    ) : (
        <main id="events-main">
            <div id="events-top">
                <h1 id="events-title">Events at Woodland</h1>
            </div>

            <section id="all-events">
                <IGGallery behold={behold} sanityLoaded={sanityLoaded} />

                <div id="future-events">
                    {futureShows.length > 0 ? (
                        <>
                            <div className="events-section-header">
                                <h2>Coming Soon</h2>
                                <span className="events-count">{futureShows.length} {futureShows.length === 1 ? 'event' : 'events'}</span>
                            </div>
                            <EventsTable shows={futureShows} defaultSort="date-asc" />
                        </>
                    ) : (
                        <div style={{ width: '80vw', maxWidth: '800px', margin: '0 auto' }}>
                            <h4 style={{ textAlign: 'center' }}>
                                Follow our{' '}
                                <a
                                    id="IGlink"
                                    href="https://www.instagram.com/woodlandtheater"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Instagram page
                                </a>{' '}
                                for upcoming shows and events.
                            </h4>
                        </div>
                    )}
                </div>

                <div id="past-events">
                    <div className="events-section-header">
                        <h3>Past Events at Woodland Theater</h3>
                        <span className="events-count">{totalWoodland} {totalWoodland === 1 ? 'event' : 'events'}</span>
                    </div>
                    {pastShows.length > 0 ? (
                        <EventsTable shows={pastShows} defaultSort="date-desc" />
                    ) : (
                        <p style={{ textAlign: 'center' }}>No past events yet.</p>
                    )}
                </div>

                {pastVenueShows && pastVenueShows.length > 0 && (
                    <div id="past-events">
                        <div className="events-section-header">
                            <h3>Past Events at The Josephine &amp; The Chummery</h3>
                            <span className="events-count">{totalVenue} {totalVenue === 1 ? 'event' : 'events'}</span>
                        </div>
                        <EventsTable shows={pastVenueShows} defaultSort="date-desc" />
                    </div>
                )}
            </section>
        </main>
    );
}

export default Events;
