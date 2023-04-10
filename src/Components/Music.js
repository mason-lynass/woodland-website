import { useState, useEffect } from 'react'
import '../CSS/Music.css'

function Music({ shows, bands, sanityLoaded }) {

    const [pageBands, setPageBands] = useState(bands)
    const [search, setSearch] = useState("")

    useEffect(() => {
        setPageBands(bands)
    }, [bands])

    useEffect(() => {
        console.log('this')
        let result = bands
        result = filterBySearch(result)
        setPageBands(result)
    }, [search])

    console.log(bands, pageBands)

    const alphaSortBands = pageBands.sort((a, b) => a.name.localeCompare(b.name))

    function AllOfTheBands() {
        return (
            alphaSortBands.map((band) => {
                return (
                    <a className='band-link music-band' href={band.description} key={band._id} target='_blank' rel='noopener noreferrer'>
                        <h4>{band.name}</h4>
                    </a>

                )
            })
        )
    }

    function handleSearch(e) {
        setSearch(e.target.value)
    }

    const filterBySearch = (r) => {
        return bands.filter((band) => band.name.toLowerCase().includes(search.toLowerCase()))
    }

    return (
        <main id='music-main'>
            <div id='music-top'>
                <h1>~ All of the bands ~</h1>
                <div id='music-body'>
                    <h3>these are all of the bands that have played a show at Woodland since 2018.</h3>
                    <h3>click on a band to check out their tunes!</h3>
                </div>
            </div>
            <div id='music-search'>
                <input placeholder='search' onChange={handleSearch} value={search} type="text" name="search"></input>
            </div>
            <div id='all-of-the-bands'>
                {AllOfTheBands()}
            </div>
        </main>
    )
}

export default Music