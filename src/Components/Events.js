import { useEffect } from 'react';
import EventsTable from './EventsTable';
import IGGallery from './IGGallery';
import '../CSS/Events.css';

function Events({ sanityLoaded, futureShows, pastShows, pastVenueShows, behold }) {
    const totalVenue = (pastVenueShows || []).length;
    const venueNames = [...new Set((pastVenueShows || []).map((s) => s.venue))].join(' & ');

    useEffect(() => {
        if (!sanityLoaded || !window.location.hash) return;
        const target = document.getElementById(window.location.hash.slice(1));
        if (!target) return;
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        target.classList.add('events-row--highlighted');
        const timer = setTimeout(() => target.classList.remove('events-row--highlighted'), 2500);
        return () => clearTimeout(timer);
    }, [sanityLoaded]);

    return (
        <main id="events-main">
            <div id="events-top">
                <h1 id="events-title">Events at Woodland</h1>
                <a
                    id="events-subscribe-link"
                    href="webcal://www.woodlandtheater.org/events.ics"
                    title="Subscribe in your calendar app (Google Calendar, Apple Calendar, Outlook, etc.)"
                >
                    Subscribe to our events calendar
                </a>
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

                {pastShows.length > 0 && (
                    <div id="past-events">
                        <div className="events-section-header">
                            <h3>Past Events at Woodland Theater</h3>
                            <span className="events-count">{pastShows.length} {pastShows.length === 1 ? 'event' : 'events'}</span>
                        </div>
                        <EventsTable shows={pastShows} defaultSort="date-desc" />
                    </div>
                )}

                {pastVenueShows && pastVenueShows.length > 0 && (
                    <div id="past-events">
                        <div className="events-section-header">
                            <h3>Past Events at {venueNames}</h3>
                            <span className="events-count">{totalVenue} {totalVenue === 1 ? 'event' : 'events'}</span>
                        </div>
                        <EventsTable shows={pastVenueShows} defaultSort="date-desc" showVenue />
                    </div>
                )}
            </section>
        </main>
    );
}

export default Events;
