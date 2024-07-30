import React from 'react';
import './main.css'
import { Link } from 'react-router-dom';

const Main = () => {
    return (
        <div className='main_container'>
            <h1>Welcome to FKontakte!</h1> 
             <p>Visit to <Link to='/news'>News</Link> or <Link to='/music'>Music</Link>!</p>
            <h2 className='FK-h2'>FK</h2>
        </div>
    );
};

export default Main;