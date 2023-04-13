import '../CSS/About.css'

import Mason from "../Images/mason-woodland.webp";
import Lucas from "../Images/SocialIcon.webp"
import Tom from "../Images/Eykemans.webp"
import OldWoodland from "../Images/Woodland-Theater-1932.webp"
import MailingList from './MailingList';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

function About() {
  return (
    <main id='about-main'>
      <div id='woodland-about'>
        <h1>
          Woodland Theater is a multi-use creative complex making space for
          artists in Seattle.
        </h1>
        <h2>
          We provide private practice spaces and studios for musicians &
          artists, and occasionally host workshops, performances, and other
          events for our creatives.
        </h2>
      </div>
      <div id='tenants-about'>
        <h1>About our tenants:</h1>
        <div id="tenants-flex">
          <div className="one-tenant">
            <h3>Mason Lynass</h3>
            <img src={Mason} alt="Mason at woodland" />
            <p>
              Mason Lynass is a multi-instrumentalist and composer. He has
              performed with many musicians around Seattle and the US, worked as
              a freelance producer and sound designer, and instructed students
              of all ages and abilities. At Woodland, Mason enjoys the freedom
              to play the drums with wild abandon, experiment with new musical
              styles and ideas, and host shows for peers and friends.
            </p>
          </div>
          <div className="one-tenant">
            <h3>Lucas Fisher</h3>
            <img src={Lucas} alt="icon of Lucas" />
            <p>
              Lucas Fisher is a 3D artist, game developer, and musician. Having often worked in the intersection of disciplines, Woodland has been a fertile ground for experimentation and collaboration for him since 2017.
            </p>
          </div>
          <div className="one-tenant">
            <h3>Tom Eykemans</h3>
            <img src={Tom} alt="Tom" />
            <p>
              Tom Eykemans is a book designer at Marquand Books, created the independent publishing imprint Tome Press, and co-founded the Seattle Art Book Fair. When not making books and zines and posters, he seeks ways to help build creative communities at Woodland Theater.
            </p>
            <a href='design.eykemans.com' target='_blank' rel='noopener noreferrer'>design.eykemans.com</a>
          </div>
        </div>
      </div>
      <div id='about-bottom'>
        <h4>Our studios are currently full, but if you would like to be notified when a space is available, please email Woodland Theater to be added to the waiting list.</h4>
        <MailchimpSubscribe 
          url={process.env.REACT_APP_MAILCHIMP_URL}
          render={({ subscribe, status, message }) => (
              <MailingList 
              status={status}
              message={message}
              onSubmitted={formData => subscribe(formData)} />
          )}
        />
      </div>
      <section id='history'>
        <h2>History</h2>
        <div id='history-flex'>
          <img id='woodland-1932' src={OldWoodland} alt='Woodland Theater in 1932' />
          <div id='history-copy'>
            <p>The building which currently houses Woodland Theater was built in 1926 as a silent movie theater, with capacity for 600 movie-goers and complete with a Kimball Pipe Organ.</p>
            <p>Over the past 97 years, the building has been used as a movie theater, an <a target='_blank' rel='noopener noreferrer' href='https://vintagewestwoodland.com/2015/02/17/the-woodland-theater-becomes-a-ski-hill-in-1959/'>indoor ski park</a>, a medical device maker, a print shop, a record store, and a concert venue. </p>
            <p> This picture shows Woodland Theater as it was in 1932. (courtesy UW Special Collections)</p>
            <p>Our space was the previous home of <a target='_blank' rel='noopener noreferrer' href='https://jigsaw-records.com/'>Jigsaw Records</a> until they moved to Portland in early 2020.</p>
            <p>From 2011-2015, the space operated as a venue called <a target='_blank' rel='noopener noreferrer' href='https://www.thestranger.com/music/2015/02/04/21630709/rip-underground-performance-space-the-josephine'>The Josephine</a>, and as "608 Warehouse" even earlier.</p>
            <p>Legend has it that the space was previously occupied by various musicians including the Sun City Girls, and a production space for <a href='https://www.frankonline.com/bombshelter-videos' target='_blank' rel='noopener noreferrer'>Bombshelter Videos</a>.</p>
            <hr></hr>
            <p>Thanks to <a target='_blank' rel='noopener noreferrer' href='https://vintagewestwoodland.com/2015/09/10/then-now-the-woodland-theater/'>Vintage West Woodland</a> for their historical research.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
