import { Link } from "react-router-dom"
// import Logo from "../Images/old-woodland-logo.webp"
import Logo from "../Images/WoodlandTheater_Logo_200px_height.png"

function NavBar() {
    return (
        <div id='nav-container'>
            <div id="nav-flex" className="blue">
                <Link id="about" to="/about">About</Link>


                <div id='nav-links'>
                    <Link id="events" to="/events">Events</Link>

                    <Link id="music" to="/music">Music</Link>
                </div>
            </div>
            <Link id="to-home" to="/">
                <img src={Logo} alt='' id="logo" />
            </Link>

        </div>


    )
}

export default NavBar