function BigEvent({ show, bands, sanityLoaded }) {

    // this function returns a band from "bands" if whatever you pass into the function matches a band's id
    // we only use this in allBands, passing in a band _ref from a single show
    function getBandFromRef(band) {
        if (band._ref) {
            const bandObject = bands.filter((b) => b._id === band._ref)
            return bandObject
        }
        else return ""
    }

    const bandsArray = []

    // filter the keys of the show object to only get the band refs,
    // use getBandFromRef with the ref to fill the bandsArray with band objects
    function allBands() {
        const bandRefsArray = (Object.entries(show).filter(([key]) => key.includes('band')))
        bandRefsArray.forEach((band) => bandsArray.push(getBandFromRef(band[1])))
    }

    if (show !== undefined && sanityLoaded === true) {
        allBands()
    }

    // reformatting the dates from YYYY-MM-DD to MM/DD/YYYY
    function formatDate(input) {
        const pattern = /(\d{4})-(\d{2})-(\d{2})/;
        if (!input || !input.match(pattern)) {
            return null
        }
        return input.replace(pattern, '$2/$3/$1')
    }

    function bandLinks() {
        // if a show doesn't have any bands (if it's a market or workshop or something), show the description
        if (!show.band_1) {
            return (
                <h3>{show.description}</h3>
            )
        }
        else return (
            bandsArray.map((band) => {
                return (
                    <a key={band[0].name} className="band-link" href={band[0].description} target='_blank' rel="noopener noreferrer">{band[0].name}</a>
                )
            })
        )
    }

    // if there are no future shows, show a placeholder
    function theNextShow() {
        return (
            (show !== undefined) ?
                <div>
                    <h4>{formatDate(show.date)}</h4>
                    <div id='big-band-links'>{bandLinks()}</div>
                    <p>({show.categories})</p>
                </div>
                :
                <div id='no-events'>
                    <p>no future events at the moment,</p>
                    <p>stay tuned!</p>
                </div>
        )
    }

    return (
        (bands !== undefined) ?
            theNextShow()
            :
            <div>
                <h2>loading...</h2>
            </div>
    )
}

export default BigEvent