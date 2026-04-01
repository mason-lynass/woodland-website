import { useState } from 'react';
import SheetEvent from './SheetEvent';
import MailingList from './MailingList';
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
        if (sort === 'performers-asc') return a.performers[0]?.localeCompare(b.performers[0] || '') || 0;
        if (sort === 'performers-desc') return b.performers[0]?.localeCompare(a.performers[0] || '') || 0;
        if (sort === 'categories-asc') return a.categories.localeCompare(b.categories);
        if (sort === 'categories-desc') return b.categories.localeCompare(a.categories);
        return 0;
    });

    return (
        <div id="events-list">
            <div className="events-table-header one-show">
                <button className="sort-header" onClick={() => toggleSort('date')}>
                    Date{arrow('date')}
                </button>
                <div id="show-tags">
                    <button className="sort-header" onClick={() => toggleSort('performers')}>
                        Lineup{arrow('performers')}
                    </button>
                </div>
                <button className="sort-header" onClick={() => toggleSort('categories')}>
                    Category{arrow('categories')}
                </button>
            </div>
            {sorted.map((show) => (
                <SheetEvent key={show.id} show={show} />
            ))}
        </div>
    );
}

function Events({ sanityLoaded, futureShows, pastShows, behold }) {
    return sanityLoaded === false ? (
        <h2 id="events-loading">loading...</h2>
    ) : (
        <main id="events-main">
            <div id="events-top">
                <h1 id="events-title">Events at Woodland</h1>
            </div>

            <section id="all-events">
                <div id="future-events">
                    {futureShows.length > 0 ? (
                        <>
                            <h2>Coming Soon:</h2>
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

                <IGGallery behold={behold} sanityLoaded={sanityLoaded} />
                <MailingList />

                <div id="past-events">
                    <h3>past events:</h3>
                    {pastShows.length > 0 ? (
                        <EventsTable shows={pastShows} defaultSort="date-desc" />
                    ) : (
                        <div className="one-show no-events">
                            <div id="show-tags">
                                <div id="band-links"><h3>no past events yet!</h3></div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}

export default Events;
