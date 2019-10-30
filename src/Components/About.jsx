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
                        <b>Satoshi Analytics is an analytics website focused on Bitcoin<br /><br />
                            Created by @solalhagege (Twitter)</b>
                    </h2>
                </div>
            </div>
        )
    }
}

export default About;