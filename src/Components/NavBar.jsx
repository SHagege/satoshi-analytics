import React from 'react'
import { Link } from 'react-router-dom'

export default class NavBar extends React.Component {
    render() {
        return (
            <div id="navbarMenuHeroC" className="NavBarItems">
                <div className="navbar-end">
                    <a className="navbar-item">
                        <Link to="/">Home</Link>
                    </a>
                    <a className="navbar-item">
                        <Link to="/about">About</Link>
                    </a>
                </div>
            </div>
        )
    }
}