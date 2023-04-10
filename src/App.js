import './App.css';

import NavBar from './Components/NavBar';
import Homepage from './Components/Homepage';
import About from './Components/About';
import Footer from './Components/Footer';
import Events from './Components/Events';
import Music from './Components/Music';

import { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom"

function App() {

  let PROJECT_ID = ENV['REACT_APP_SANITY_PROJECT_ID'];
  let DATASET = "production";
  let showQUERY = encodeURIComponent('*[_type == "show"]');
  let showURL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${showQUERY}`;
  let bandQUERY = encodeURIComponent('*[_type == "band"]');
  let bandURL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${bandQUERY}`;
  let beholdURL = `https://feeds.behold.so/QDtZ4IXizXJYffMmIJfR`

  const [sanityLoaded, setSanityLoaded] = useState(false)
  const [shows, setShows] = useState([])
  const [bands, setBands] = useState([])
  const [behold, setBehold] = useState({})

  console.log('this')

  useEffect(() => {
    fetch(beholdURL).then((res) => {
      if (res.ok) {
        res.json().then((res) => {
          setBehold(res)
        })
      }
    })
    fetch(showURL).then((res) => {
      if (res.ok) {
        res.json().then((res) => {
          setShows(res.result)
        })
      }
    })
    fetch(bandURL).then((res) => {
      if (res.ok) {
        res.json().then((res) => {
          setBands(res.result)
          setSanityLoaded(true)
        })
      }
    })
  }, [])

  // subtract number of milliseconds in 7 hours (time conversion)
  const currentDate = Date.now() - 25200000

  const sortedShows = [...shows].sort((a, b) => Date.parse(a.date) - Date.parse(b.date))

  const futureShows = sortedShows.filter((show) => Date.parse(show.date) >= currentDate)
  const pastShows = sortedShows.filter((show) => Date.parse(show.date) < currentDate).sort((a, b) => Date.parse(b.date) - Date.parse(a.date))

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/"
          element={<Homepage shows={shows} bands={bands} currentDate={currentDate} sortedShows={sortedShows} futureShows={futureShows} sanityLoaded={sanityLoaded} behold={behold} />}
        />
        <Route path="/about"
          element={<About />}
        />
        <Route path="/events"
          element={<Events shows={shows} bands={bands} sanityLoaded={sanityLoaded} currentDate={currentDate} sortedShows={sortedShows} futureShows={futureShows} pastShows={pastShows} />}
        />
         <Route path="/music"
          element={<Music shows={shows} bands={bands} sanityLoaded={sanityLoaded} />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
