import { Link } from 'react-router-dom';
import Logo from '../Images/WoodlandTheater_Logo_200px_height.webp';

function NavBar() {
    return (
        <div id='nav-container'>
            <div id='nav-flex' className='blue'>
                <div id='nav-links'>
                    <Link id='about' to='/about'>
                        About
                    </Link>
                    <Link id='music' to='/music'>
                        Music
                    </Link>
                    <Link id='contact' to='https://subscribepage.io/8lvN24'>
                        Contact
                    </Link>
                </div>
            </div>
            <Link id='to-home' to='/'>
                <img
                    src={Logo}
                    alt='to the Woodland home page'
                    aria-label='to the Woodland home page'
                    id='logo'
                />
            </Link>
        </div>
    );
}

export default NavBar;
