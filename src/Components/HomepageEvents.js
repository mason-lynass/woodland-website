import HomepageEvent from "./HomepageEvent"

import { Link } from "react-router-dom"

function HomepageEvents({ futureShows, bands }) {

    function allHomepageEvents() {
        return (
            futureShows.map((show) => {
                return (
                    <HomepageEvent show={show} bands={bands} key={show._id}/>
                )
            })
        )
    }

    return (
        <div id='homepage-events'>
            <h4 id='homepage-events-title'>Coming up:</h4>
            {allHomepageEvents()}
            <Link className="blue" id="to-past-events" to="/events">More Events</Link>
        </div>
    )
}

export default HomepageEvents