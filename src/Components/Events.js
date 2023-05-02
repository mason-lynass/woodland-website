import EventsList from "./EventsList"
import MailingList from "./MailingList"
import "../CSS/Events.css"

import MailchimpSubscribe from "react-mailchimp-subscribe"
import { useState } from "react"

function Events({ shows, bands, sanityLoaded, currentDate, sortedShows, futureShows, pastShows }) {

    const [calView, setCalView] = useState('future')

    function handleCalView() {
        if (calView === 'future') setCalView('past')
        if (calView === 'past') setCalView('future')
    }

    return (
        (sanityLoaded === false) ?
            <h2 id='events-loading'>loading...</h2>
            :
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
                            <h2>Coming Soon:</h2>
                            <div id='events-list'>
                                <EventsList shows={futureShows} bands={bands} />

                            </div>

                        </div>
                        <MailchimpSubscribe
                            url={process.env.REACT_APP_MAILCHIMP_URL}
                            render={({ subscribe, status, message }) => (
                                <MailingList
                                    status={status}
                                    message={message}
                                    onSubmitted={formData => subscribe(formData)} />
                            )}
                        />
                    </>
                    <div id='past-events'>
                        <h3>past events:</h3>
                        <div id='events-list'>
                            <EventsList shows={pastShows} bands={bands} />
                        </div>
                    </div>
                </section>
            </main>
    )
}

export default Events