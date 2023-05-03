import HomepageEvent from "./HomepageEvent"

import { Link } from "react-router-dom"

function HomepageEvents({ futureShows, bands, sanityLoaded }) {

    function allHomepageEvents() {
        return (
            futureShows.map((show) => {
                return (
                    <HomepageEvent show={show} bands={bands} key={show._id} />
                )
            })
        )
    }

    return (
        <div id='homepage-events'>
            {sanityLoaded === true ?
                <>
                    <h4 id='homepage-events-title'>Coming up:</h4>
                    {allHomepageEvents()}
                    <Link className="blue" aria-label="More Events" id="to-past-events" to="/events">More Events</Link>
                </>
                :
                <h4 id='homepage-events-title'>loading....</h4>
            }

        </div>
    )
}

export default HomepageEvents