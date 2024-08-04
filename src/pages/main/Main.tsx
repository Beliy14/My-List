import React from 'react';
import './main.css'
import { Link } from 'react-router-dom';

const Main = () => {
    return (
        <div className='main_container'>
            <h1>MyBlock</h1> 
             <p>Visit to <Link to='/notes'>Notes</Link> or <Link to='/music'>Music</Link>!</p>
             <p className='description'>An application for taking notes and storing music.</p>
            <h2 className='anim-logo'>MB</h2>
        </div>
    );
};

export default Main;