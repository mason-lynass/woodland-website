import './App.css';

import NavBar from './Components/NavBar';
import Homepage from './Components/Homepage';
import About from './Components/About';
import Footer from './Components/Footer';
import Events from './Components/Events';
import Music from './Components/Music';

import { fetchSheetEvents } from './utils/fetchSheetEvents';

import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
    let PROJECT_ID = process.env.REACT_APP_SANITY_PROJECT_ID;
    let DATASET = 'production';
    let bandQUERY = encodeURIComponent('*[_type == "band"]');
    let bandURL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${bandQUERY}`;
    let beholdURL = process.env.REACT_APP_BEHOLD_URL;
    let sheetURL = process.env.REACT_APP_GOOGLE_SHEET_URL;

    const [sheetLoaded, setSheetLoaded] = useState(false);
    const [bands, setBands] = useState([]);
    const [behold, setBehold] = useState({});
    const [futureShows, setFutureShows] = useState([]);
    const [pastShows, setPastShows] = useState([]);
    const [pastVenueShows, setPastVenueShows] = useState([]);

    useEffect(() => {
        fetch(beholdURL).then((res) => {
            if (res.ok) res.json().then((res) => setBehold(res.posts));
        });

        fetch(bandURL).then((res) => {
            if (res.ok) res.json().then((res) => setBands(res.result));
        });

        fetchSheetEvents(sheetURL)
            .then(({ futureShows, pastShows, pastVenueShows }) => {
                setFutureShows(futureShows);
                setPastShows(pastShows);
                setPastVenueShows(pastVenueShows);
                setSheetLoaded(true);
            })
            .catch(() => setSheetLoaded(true));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className='App'>
            <NavBar />
            <Routes>
                <Route
                    path='/'
                    element={
                        <Homepage
                            bands={bands}
                            futureShows={futureShows}
                            sanityLoaded={sheetLoaded}
                            behold={behold}
                        />
                    }
                />
                <Route path='/about' element={<About />} />
                <Route
                    path='/events'
                    element={
                        <Events
                            bands={bands}
                            sanityLoaded={sheetLoaded}
                            futureShows={futureShows}
                            pastShows={pastShows}
                            pastVenueShows={pastVenueShows}
                            behold={behold}
                        />
                    }
                />
                <Route
                    path='/music'
                    element={
                        <Music
                            bands={bands}
                            futureShows={futureShows}
                            pastShows={pastShows}
                            pastVenueShows={pastVenueShows}
                            sanityLoaded={sheetLoaded}
                        />
                    }
                />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
