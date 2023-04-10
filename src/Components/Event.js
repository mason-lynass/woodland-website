function Event({ show, bands }) {

    console.log(show)

    function getBandFromRef(band) {
        if (band._ref) {
            const bandObject = bands.filter((b) => b._id === band._ref)
            return bandObject
        }
        else return ""
    }

    const bandsArray = []

    function allBands() {
        const bandRefsArray = (Object.entries(show).filter(([key]) => key.includes('band')))
        bandRefsArray.forEach((band) => bandsArray.push(getBandFromRef(band[1])))
    }

    if (show !== undefined) {
        allBands()
    }

    function formatDate(input) {
        const pattern = /(\d{4})-(\d{2})-(\d{2})/;
        if (!input || !input.match(pattern)) {
            return null
        }
        return input.replace(pattern, '$2/$3/$1')
    }

    function bandLinks() {

        if (bandsArray.length > 0) {
            return (
                bandsArray.map((band) => {
                    return (
                        <a key={band[0].name} className="event-band-link" href={band[0].description} target='_blank' rel="noopener noreferrer">{band[0].name}</a>
                    )
                })
            )
        }
        else return <h4>{show.tags}</h4>
    }

    function showTitle () {
        if (show.show_title) return <h3>{show.show_title}</h3>
    }

    return (
        <div className="one-show">
            <h4 id='show-date'>{formatDate(show.date)}</h4>
            <div id='show-tags'>
                <div id='show-title'>{showTitle()}</div>
                <div id='band-links'>{bandLinks()}</div>
            </div>
            <h4 id='show-categories'>{show.categories}</h4>
        </div>
    )
}

export default Event