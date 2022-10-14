import React from 'react'
import { Link } from "react-router-dom"

import "../styles/Nav.scss"

const Nav = () => {
    const [isActive, setIsActive] = React.useState(false);
    const changeActiveState = () => {
        console.log(`initial ${isActive}`);
        return setIsActive(isActive => !isActive);
    }
    console.log(`final ${isActive}`);

    const myStyles = {
        backgroundColor: isActive ? "#32ca55" : "#3F4555"
    }
    return (
        <nav className='navbar'>
            <div className='nav_container'>
                <div className='nav-logo'>
                    <a href="#">ListLonia</a>
                </div>
                <div className='nav-link'>
                    <ul>
                        <li onClick={changeActiveState}><Link to="/home">Home</Link></li>
                        <li onClick={changeActiveState}><Link to="/login">Login</Link></li>
                        <li onClick={changeActiveState}><Link to="/register">Register</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Nav