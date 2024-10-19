import EventsList from './EventsList';
import MailingList from './MailingList';
import '../CSS/Events.css';

import { useState } from 'react';

function Events({
    shows,
    bands,
    sanityLoaded,
    currentDate,
    sortedShows,
    futureShows,
    pastShows,
}) {
    const [calView, setCalView] = useState('future');

    function handleCalView() {
        if (calView === 'future') setCalView('past');
        if (calView === 'past') setCalView('future');
    }

    return sanityLoaded === false ? (
        <h2 id='events-loading'>loading...</h2>
    ) : (
        <main id='events-main'>
            <div id='events-top'>
                {/* <p id='filler'></p> */}
                <h1 id='events-title'>Events at Woodland</h1>
                {/* <button id='cal-view-button' className="blue" onClick={handleCalView}>
                        {calView === 'future' ? 'past events' : 'future events'}
                    </button> */}
            </div>

            <section id='all-events'>
                <>
                    <div id='future-events'>
                        <div
                            style={{
                                width: '80vw',
                                maxWidth: '800px',
                                margin: '0 auto',
                            }}
                        >
                            <h4 style={{ textAlign: 'center' }}>
                                The easiest way to stay up to date about
                                upcoming shows and events is by{' '}
                                <a
                                    id='IGlink'
                                    href='https://www.instagram.com/woodlandtheater'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    following our Instagram page
                                </a>
                                .
                            </h4>
                            <h4 style={{ textAlign: 'center' }}>
                                Check out the Instagram feed below for events
                                coming up soon, and a history of events in the
                                past!
                            </h4>
                        </div>
                        {/* <h2>Coming Soon:</h2>
                            <div id='events-list'>
                                <EventsList shows={futureShows} bands={bands} />

                            </div> */}
                    </div>
                    <MailingList />
                </>
                <div id='past-events'>
                    <h3>past events:</h3>
                    <div id='events-list'>
                        <EventsList shows={pastShows} bands={bands} />
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Events;
