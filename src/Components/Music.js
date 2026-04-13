import { useState, useEffect } from "react";
import "../CSS/Music.css";

function Music({
  bands,
  futureShows,
  pastShows,
  pastVenueShows,
  sanityLoaded,
}) {
  // Merge Sanity bands with performers from event sheets
  const allBands = (() => {
    const sanityNameSet = new Set(bands.map((b) => b.name.toLowerCase()));
    const allShows = [
      ...(futureShows || []),
      ...(pastShows || []),
      ...(pastVenueShows || []),
    ];
    const extra = [];
    const seen = new Set(sanityNameSet);
    allShows.forEach((show) => {
      show.performers.forEach((name) => {
        if (!seen.has(name.toLowerCase())) {
          seen.add(name.toLowerCase());
          extra.push({
            _id: `event-${name}`,
            name,
            description: `https://duckduckgo.com/?q=${encodeURIComponent(name + " band")}`,
          });
        }
      });
    });
    return [...bands, ...extra];
  })();

  const [pageBands, setPageBands] = useState(allBands);
  const [search, setSearch] = useState("");
  const [sortDir, setSortDir] = useState("asc");
  const [view, setView] = useState("grid");

  useEffect(() => {
    setPageBands(allBands);
  }, [bands, futureShows, pastShows, pastVenueShows]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let result = allBands.filter((band) =>
      band.name.toLowerCase().includes(search.toLowerCase()),
    );
    setPageBands(result);
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  function randomBand() {
    function findRandomBand() {
      const bandIndex = Math.floor(Math.random() * allBands.length);
      const bandUrl = allBands[bandIndex].description;
      if (bandUrl.includes("duckduckgo")) {
        return findRandomBand();
      } else return bandUrl;
    }
    return findRandomBand();
  }

  const sorted = [...pageBands].sort((a, b) => {
    const cmp = a.name.localeCompare(b.name);
    return sortDir === "asc" ? cmp : -cmp;
  });

  return sanityLoaded === false ? (
    <h2 id="music-loading">loading...</h2>
  ) : (
    <main id="music-main">
      <div id="music-top">
        <h1>~ All of the bands ~</h1>
        <div id="music-body">
          <h3>
            These are all of the bands that have played a show at Woodland since
            2006.
          </h3>
          <h3>Click on a band to check out their tunes!</h3>
          <p style={{ color: "rgb(100,100,100)", marginTop: "4px" }}>
            {allBands.length} bands
          </p>
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
              className={`music-toggle-btn${sortDir === "asc" ? " active" : ""}`}
              onClick={() => setSortDir("asc")}
            >
              A → Z
            </button>
            <button
              className={`music-toggle-btn${sortDir === "desc" ? " active" : ""}`}
              onClick={() => setSortDir("desc")}
            >
              Z → A
            </button>
            <button
              className={`music-toggle-btn${view === "grid" ? " active" : ""}`}
              onClick={() => setView("grid")}
              aria-label="Grid view"
            >
              ⊞
            </button>
            <button
              className={`music-toggle-btn${view === "list" ? " active" : ""}`}
              onClick={() => setView("list")}
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

      <div id="all-of-the-bands" className={view === "list" ? "list-view" : ""}>
        {sorted.map((band) => (
          <a
            className="band-link music-band"
            href={band.description}
            key={band._id}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h4>{band.name}</h4>
            {view === "list" && band.description && (
              <span className="band-url">
                {band._id.startsWith("event-")
                  ? "search →"
                  : band.description.replace(/^https?:\/\//, "")}
              </span>
            )}
          </a>
        ))}
      </div>
    </main>
  );
}

export default Music;
