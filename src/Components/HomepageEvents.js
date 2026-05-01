import SheetEvent from './SheetEvent';
import { Link } from 'react-router-dom';

function HomepageEvents({ futureShows, sanityLoaded }) {
    return (
        <div id="homepage-events">
            {sanityLoaded === true ? (
                <>
                    <h4 style={{ textAlign: 'center' }}>
                        The easiest way to stay up to date about upcoming shows
                        and events is by{' '}
                        <a
                            id="IGlink"
                            href="https://www.instagram.com/woodlandtheater"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            following our Instagram page
                        </a>
                        .
                    </h4>

                    {futureShows.length > 0 && (
                        <>
                            <h4 id="homepage-events-title">Coming up:</h4>
                            {futureShows.map((show) => (
                                <SheetEvent key={show.id} show={show} />
                            ))}
                        </>
                    )}

                    <Link
                        className="blue"
                        aria-label="More Events"
                        id="to-past-events"
                        to="/events"
                    >
                        More Events
                    </Link>
                </>
            ) : (
                <h4 id="homepage-events-title">loading....</h4>
            )}
        </div>
    );
}

export default HomepageEvents;
