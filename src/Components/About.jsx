import React from 'react'
import NavBar from './NavBar'

class About extends React.Component {
    render() {
        return (
            <div>
                <NavBar />
                <div className="aboutPage">
                    <h1 >
                        <b>About</b>
                    </h1>
                    <h2>
                        <b>Satoshi Analytics is a statistics website focused on Bitcoin<br /><br />
                            Created by</b> <a href="https://twitter.com/solalhagege">@solalhagege</a>
                    </h2>
                </div>
            </div>
        )
    }
}

export default About;