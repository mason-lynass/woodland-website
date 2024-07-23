import HomepageEvent from "./HomepageEvent";

import { Link } from "react-router-dom";

function HomepageEvents({ futureShows, bands, sanityLoaded }) {
  function allHomepageEvents() {
    return futureShows.map((show) => {
      return <HomepageEvent show={show} bands={bands} key={show._id} />;
    });
  }

  return (
    <div id="homepage-events">
      {sanityLoaded === true ? (
        <>
          <h4 style={{textAlign: 'center'}}>
            The easiest way to stay up to date about upcoming shows and events
            is by{" "} 
            <a id='IGlink'
              href="https://www.instagram.com/woodlandtheater"
              target="_blank"
              rel="noopener noreferrer"
            >
              following our Instagram page
            </a>
            .
          </h4>
          <h4 style={{textAlign: 'center'}}>
            Check out the Instagram feed below for events coming up soon, and a
            history of events in the past!
          </h4>

          <h4 id="homepage-events-title">{futureShows.length > 0 ? 'Coming up:' : ''}</h4>
          {allHomepageEvents()}

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
