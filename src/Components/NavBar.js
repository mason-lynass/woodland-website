import { Link } from "react-router-dom"
// import Logo from "../Images/old-woodland-logo.webp"
import Logo from "../Images/WoodlandTheater_Logo_200px_height.webp"
import IG from "../Images/instagram.svg"

function NavBar() {
    return (
        <div id='nav-container'>
            <div id="nav-flex" className="blue">
                <div id='nav-links'>
                    <Link id="about" to="/about">About</Link>
                    <Link id="music" to="/music">Music</Link>
                </div>
                {/* <div id='nav-links'>
                    <Link id="events" to="/events">Events</Link>

                    
                </div> */}
                {/* <a id='IGFooter' href='https://www.instagram.com/woodlandtheater/' target='_blank' rel='noopener noreferrer'>
                    <img src={IG} alt='link to Woodland Theater Instagram' />
                </a> */}
            </div>
            <Link id="to-home" to="/">
                <img src={Logo} alt='' id="logo" />
            </Link>

        </div>


    )
}

export default NavBar