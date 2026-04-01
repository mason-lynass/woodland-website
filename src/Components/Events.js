import SheetEvent from './SheetEvent';
import MailingList from './MailingList';
import IGGallery from './IGGallery';
import '../CSS/Events.css';

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
                            <div id="events-list">
                                {futureShows.map((show) => (
                                    <SheetEvent key={show.id} show={show} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div
                            style={{
                                width: '80vw',
                                maxWidth: '800px',
                                margin: '0 auto',
                            }}
                        >
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
                    <div id="events-list">
                        {pastShows.length > 0 ? (
                            pastShows.map((show) => (
                                <SheetEvent key={show.id} show={show} />
                            ))
                        ) : (
                            <div className="one-show no-events">
                                <div id="show-tags">
                                    <div id="band-links">
                                        <h3>no past events yet!</h3>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Events;
