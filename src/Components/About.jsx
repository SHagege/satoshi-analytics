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
                            Built with <a href="https://github.com/Blockchair/Blockchair.Support/blob/master/API.md">Blockchair's API </a>and
                            <a href="https://reactjs.org/"> ReactJS</a>. Opensource on <a href="https://github.com/SHagege/satoshi-analytics">GitHub</a>.
                            Created by</b> <a href="https://twitter.com/solalhagege">@solalhagege</a>.
                    </h2>
                </div>
            </div>
        )
    }
}

export default About;