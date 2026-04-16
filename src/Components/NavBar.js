import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from '../Images/WoodlandTheater_Logo_200px_height.webp';
import { useEffect, useState } from 'react';

function NavBar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        function handleScroll() {
            setScrolled(window.scrollY > 60);
        }
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    return (
        <div id='nav-container' className={`${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
            <div id='nav-flex' className='blue'>
                <div id='nav-links'>
                    <NavLink className="nav-link" to='/'>Home</NavLink>
                    <NavLink className="nav-link" to='/about'>About</NavLink>
                    <NavLink className="nav-link" to='/events'>Events</NavLink>
                    <NavLink className="nav-link" to='/music'>Music</NavLink>
                </div>
                <button
                    id='nav-hamburger'
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    onClick={() => setMenuOpen(o => !o)}
                >
                    {menuOpen ? '✕' : '☰'}
                </button>
                {menuOpen && (
                    <div id='nav-mobile-menu' className='blue'>
                        <NavLink className="nav-link" to='/'>Home</NavLink>
                        <NavLink className="nav-link" to='/about'>About</NavLink>
                        <NavLink className="nav-link" to='/events'>Events</NavLink>
                        <NavLink className="nav-link" to='/music'>Music</NavLink>
                    </div>
                )}
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
