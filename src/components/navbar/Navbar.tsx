import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'


const Navbar = () => {



    return (
        <div className='header'>
            <Link to="/" className="logo">MyBlock</Link>
            <div>
                <Link to="/notes" className='nav-btn'>Notes</Link>
                <Link to="/music" className='nav-btn'>Music</Link>
            </div>
        </div>
    );
};

export default Navbar;