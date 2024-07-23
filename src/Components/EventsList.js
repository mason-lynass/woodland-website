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
            <div id='band-links'><h3>no future events at the moment, stay tuned!</h3></div>
        </div>
    </div>
    )
}

export default EventsList