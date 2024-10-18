import '../CSS/Homepage.css';
import Peg from '../Images/peg-at-woodland.webp';

import BigEvent from './BigEvent';
import MailingList from './MailingList';
import IGGallery from './IGGallery';
import HomepageEvents from './HomepageEvents';

function Homepage({
    shows,
    bands,
    currentDate,
    sortedShows,
    futureShows,
    sanityLoaded,
    behold,
}) {
    return (
        <main>
            <h2>
                Woodland Theater is a multi-use creative complex making space
                for artists in Seattle.
            </h2>
            <section id='homepage-top'>
                <img
                    id='peg-at-woodland'
                    src={Peg}
                    alt='Peg performing at the Woodland Theater'
                    loading='lazy'
                />
                <HomepageEvents
                    futureShows={futureShows}
                    bands={bands}
                    sanityLoaded={sanityLoaded}
                />
            </section>
            <IGGallery behold={behold} sanityLoaded={sanityLoaded} />
            <MailingList />
        </main>
    );
}

export default Homepage;
