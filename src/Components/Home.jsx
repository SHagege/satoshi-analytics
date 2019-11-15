import React from 'react';
import Addresses from "./Addresses.jsx";
import NavBar from './NavBar.jsx';

export default class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            nonZeroAd: 0,
            addressesCount: 0,
            sats: 0,
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        event.persist()
        let apiRequest = "https://api.blockchair.com/bitcoin/addresses?a=count()&q=balance("
            .concat(event.target.value, "..)")
        if (event.target.value > 0) {
            fetch(apiRequest)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        addressesCount: data.data[0]['count()'],
                        sats: event.target.value
                    })
                })
        }
    }

    componentDidMount() {
        let apiRequest = "https://api.blockchair.com/bitcoin/addresses?a=count()"
        fetch(apiRequest)
            .then(response => response.json())
            .then(data => {
                console.log(data.data[0]['count()'])
                this.setState({
                    nonZeroAd: data.data[0]['count()']
                })
            })
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="has-text-centered title-container">
                    <h1 className="title is-1">{this.state.nonZeroAd.toLocaleString()} addresses have a non-zero balance</h1>
                </div>
                <input className="input is-rounded searchSats" type="text" placeholder="Enter Satoshi amount" onChange={this.handleChange} />
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <h1 className="title">
                            {this.state.addressesCount.toLocaleString()} addresses have more than {this.state.sats} Satoshis
                        </h1>
                        <Addresses />
                    </div>
                </div>
            </div>
        )
    }
}