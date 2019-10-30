import React from 'react';
import Addresses from "./Addresses.jsx";
import NavBar from './NavBar.jsx';

class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            addressesCount: 0,
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        let apiRequest = "https://api.blockchair.com/bitcoin/addresses?a=count()&q=balance("
            .concat(event.target.value, "..)")
        if (event.target.value > 0) {
            fetch(apiRequest)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        addressesCount: data.data[0]['count()']
                    })
                })
        }
    }

    render() {
        return (
            <div>
                <NavBar />
                <input className="input is-rounded" type="text" placeholder="Enter Satoshi amount" onChange={this.handleChange} />
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <h1 className="title">
                            {this.state.addressesCount} addresses have more than this many Satoshis
                        </h1>
                        <ul>
                            <Addresses />
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
