import "../CSS/Homepage.css"
import Peg from "../Images/peg-at-woodland.webp"

import BigEvent from "./BigEvent";
import MailingList from "./MailingList";
import IGGallery from "./IGGallery";
import HomepageEvents from "./HomepageEvents";

import MailchimpSubscribe from "react-mailchimp-subscribe";

function Homepage({ shows, bands, currentDate, sortedShows, futureShows, sanityLoaded, behold }) {

  return (
    <main>
      <h2>
        Woodland Theater is a multi-use creative complex making space for
        artists in Seattle.
      </h2>
      <section id='homepage-top'>
        <img id='peg-at-woodland' src={Peg} alt='Peg performing at the Woodland Theater' loading='lazy' />
        <HomepageEvents futureShows={futureShows} bands={bands} sanityLoaded={sanityLoaded}/>
        {/* <div id="next-event">
          <h2>Our next event:</h2>
          <BigEvent show={futureShows[0]} bands={bands} sanityLoaded={sanityLoaded} />
        </div> */}
      </section>
      <MailchimpSubscribe
        url={process.env.REACT_APP_MAILCHIMP_URL}
        render={({ subscribe, status, message }) => (
          <MailingList
            status={status}
            message={message}
            onSubmitted={formData => subscribe(formData)} />
        )}
      />
      <IGGallery behold={behold} sanityLoaded={sanityLoaded} />

    </main>
  );
}

export default Homepage;
