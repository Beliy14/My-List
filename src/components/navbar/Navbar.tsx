import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'


const Navbar = () => {



    return (
        <div className='header'>
            <Link to="/" className="logo">FKontakte</Link>
            <div>
                <Link to="/news" className='nav-btn'>News</Link>
                <Link to="/music" className='nav-btn'>Music</Link>
            </div>
        </div>
    );
};

export default Navbar;