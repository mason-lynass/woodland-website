import Event from "./Event"

function EventsList({ shows, bands }) {

    return (
        shows.map((show) => {
            return (
                <Event key={show.id} show={show} bands={bands}/>
            )
        })
    )
}

export default EventsList