import IG from "../Images/instagram.svg"

function Footer() {
    return (
        <div id="footer" className="blue">
            <div>
                <h2>Woodland Theater</h2>
                <p>608 NW 65th St</p>
                <p>Seattle, WA 98117</p>
            </div>

            <a id='IGFooter' href='https://www.instagram.com/woodlandtheater/' target='_blank' rel='noopener noreferrer'>
                <img src={IG} alt='link to Woodland Theater Instagram' />
            </a>
            {/* <div id='footer-flex'>
                <p>608 NW 65th St - Seattle, WA 98117</p>
                <p><a href='https://www.instagram.com/woodlandtheater/' target='_blank' rel="noopener noreferrer">@woodlandtheater</a> on Instagram</p>
                <p><a href='mailto:contact@woodlandtheater.org' >contact@woodlandtheater.org</a></p>
            </div> */}
        </div>
    )
}

export default Footer