import Event from "./Event"

function EventsList({ shows, bands }) {

    return (
        shows.length > 0 ?
        shows.map((show) => {
            return (
                <Event key={show.id} show={show} bands={bands}/>
            )
        })
        :
        <div className="one-show no-events">
        <div id='show-tags'>
            <div id='band-links'><h4 style={{textAlign: 'center'}}>
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
          </h4></div>
        </div>
    </div>
    )
}

export default EventsList