function IGGallery({ behold, sanityLoaded }) {

    // this function displays each JSON object we get from the Behold API, with a switch to check the object's 'mediaType'
    function getAllPics() {

        console.log(behold)

        if (behold.length > 0) {
            return (
                behold.map((item) => {
                    switch (item.mediaType) {
                        case "IMAGE":
                            return (
                                <a href={item.permalink} key={item.id} target='_blank' rel='noopener noreferrer'>
                                    <img className="IGGallery-pic" loading='lazy' alt={item.prunedCaption} src={item.sizes.medium.mediaUrl}></img>
                                </a>

                            )
                        case 'VIDEO':
                            return (
                                <a href={item.permalink} key={item.id} target='_blank' rel='noopener noreferrer'>
                                    <img className="IGGallery-pic" loading='lazy' alt={item.prunedCaption} src={item.sizes.medium.mediaUrl}></img>
                                </a>

                            )
                        case 'CAROUSEL_ALBUM':
                            return (
                                <a href={item.permalink} key={item.id} target='_blank' rel='noopener noreferrer'>
                                    <img className="IGGallery-pic" loading='lazy' alt={item.prunedCaption} src={item.sizes.medium.mediaUrl}></img>
                                </a>
                            )
                        default:
                            return (
                                <a href={item.permalink} key={item.id} target='_blank' rel='noopener noreferrer'>
                                    <img className="IGGallery-pic" loading='lazy' alt={item.prunedCaption} src={item.sizes.medium.mediaUrl}></img>
                                </a>

                            )
                    }
                })
            )
        }
        else return <h2>loading...</h2>
    }

    return (
        (sanityLoaded === true ?
            <section id='IGGallery'>
                <h2>From the Woodland Instagram feed:</h2>
                <div id='IGGallery-all-pics'>
                    {getAllPics()}
                </div>
            </section>
            :
            <section>
                <h2>loading...</h2>
            </section>
        )
    )
}

export default IGGallery