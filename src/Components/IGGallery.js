function IGGallery({ behold, sanityLoaded }) {

    function getAllPics() {

        if (behold.length > 0) {
            return (
                behold.map((item) => {
                    switch (item.mediaType) {
                        case "IMAGE":
                            return (
                                <a href={item.permalink} target='_blank' rel='noopener noreferrer'>
                                    <img className="IGGallery-pic" alt='' key={item.id} src={item.mediaUrl}></img>
                                </a>

                            )
                        case 'VIDEO':
                            return (
                                <a href={item.permalink} target='_blank' rel='noopener noreferrer'>
                                    <img className="IGGallery-pic" alt='' key={item.id} src={item.thumbnailUrl}></img>
                                </a>

                            )
                        case 'CAROUSEL_ALBUM':
                            return (
                                <a href={item.permalink} target='_blank' rel='noopener noreferrer'>
                                    <img className="IGGallery-pic" alt='' key={item.id} src={item.mediaUrl}></img>
                                </a>
                            )
                        default:
                            return (
                                <a href={item.permalink} target='_blank' rel='noopener noreferrer'>
                                    <img className="IGGallery-pic" alt='' key={item.id} src={item.mediaUrl}></img>
                                </a>

                            )
                    }
                }
                )
            )
        }

        else return <h2>loading...</h2>



    }

    return (
        (sanityLoaded === true ?
            <section>
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