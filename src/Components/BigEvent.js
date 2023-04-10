function BigEvent({ show, bands, sanityLoaded }) {

    // console.log(bands)
    // console.log(show)

    function getBandFromRef(band) {
        if (band._ref) {
            // console.log("this")
            const bandObject = bands.filter((b) => b._id === band._ref)
            // console.log(bandObject)
            return bandObject
        }
        else return ""
    }

    const bandsArray = []

    function allBands() {
        // console.log(show)
        const bandRefsArray = (Object.entries(show).filter(([key]) => key.includes('band')))
        // console.log(bandRefsArray)
        bandRefsArray.forEach((band) => bandsArray.push(getBandFromRef(band[1])))
        // console.log(bandsArray)
    }

    if (show !== undefined && sanityLoaded === true) {
        allBands()
    }

    function formatDate (input) {
        const pattern = /(\d{4})-(\d{2})-(\d{2})/;
        if (!input || !input.match(pattern)) {
            return null
        }
        return input.replace(pattern, '$2/$3/$1')
    }

    function bandLinks() {
        if (!show.band_1) {
            return (
                <h3>{show.description}</h3>
            )
        }
        else return (
            bandsArray.map((band) => {
                return (
                    <a key={band[0].name} className="band-link" href={band[0].description} rel="noopener noreferrer">{band[0].name}</a>
                )
            })
        )
    }

    return (
        (show !== undefined) ?
            <div>
                <h4>{formatDate(show.date)}</h4>
                <div id='big-band-links'>{bandLinks()}</div>
                <p>({show.categories})</p>
            </div>
            :
            <div>
                <h2>loading...</h2>
            </div>
    )
}

export default BigEvent