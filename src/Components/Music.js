import { useState, useEffect } from 'react';
import '../CSS/Music.css';

function Music({ bands, sanityLoaded }) {
    const [pageBands, setPageBands] = useState(bands);
    const [search, setSearch] = useState('');
    const [sortDir, setSortDir] = useState('asc');
    const [view, setView] = useState('grid');

    useEffect(() => {
        setPageBands(bands);
    }, [bands]);

    useEffect(() => {
        let result = bands.filter((band) =>
            band.name.toLowerCase().includes(search.toLowerCase())
        );
        setPageBands(result);
    }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

    function handleSearch(e) {
        setSearch(e.target.value);
    }

    function randomBand() {
        const band = Math.floor(Math.random() * bands.length);
        return bands[band].description;
    }

    const sorted = [...pageBands].sort((a, b) => {
        const cmp = a.name.localeCompare(b.name);
        return sortDir === 'asc' ? cmp : -cmp;
    });

    return sanityLoaded === false ? (
        <h2 id="music-loading">loading...</h2>
    ) : (
        <main id="music-main">
            <div id="music-top">
                <h1>~ All of the bands ~</h1>
                <div id="music-body">
                    <h3>these are all of the bands that have played a show at Woodland since 2018.</h3>
                    <h3>click on a band to check out their tunes!</h3>
                    <p style={{ color: 'rgb(100,100,100)', marginTop: '4px' }}>{bands.length} bands</p>
                </div>
                <div id="music-controls">
                    <input
                        placeholder="Search"
                        onChange={handleSearch}
                        value={search}
                        type="text"
                        name="search"
                    />
                    <div id="music-sort-view">
                        <button
                            className={`music-toggle-btn${sortDir === 'asc' ? ' active' : ''}`}
                            onClick={() => setSortDir('asc')}
                        >
                            A → Z
                        </button>
                        <button
                            className={`music-toggle-btn${sortDir === 'desc' ? ' active' : ''}`}
                            onClick={() => setSortDir('desc')}
                        >
                            Z → A
                        </button>
                        <button
                            className={`music-toggle-btn${view === 'grid' ? ' active' : ''}`}
                            onClick={() => setView('grid')}
                            aria-label="Grid view"
                        >
                            ⊞
                        </button>
                        <button
                            className={`music-toggle-btn${view === 'list' ? ' active' : ''}`}
                            onClick={() => setView('list')}
                            aria-label="List view"
                        >
                            ☰
                        </button>
                        <a
                            id="random-band"
                            className="blue"
                            href={randomBand()}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            Random Band
                        </a>
                    </div>
                </div>
            </div>

            <div id="all-of-the-bands" className={view === 'list' ? 'list-view' : ''}>
                {sorted.map((band) => (
                    <a
                        className="band-link music-band"
                        href={band.description}
                        key={band._id}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <h4>{band.name}</h4>
                        {view === 'list' && band.description && (
                            <span className="band-url">{band.description.replace(/^https?:\/\//, '')}</span>
                        )}
                    </a>
                ))}
            </div>
        </main>
    );
}

export default Music;
