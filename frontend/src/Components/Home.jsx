import React from 'react';
import Addresses from "./Addresses.jsx";
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx'

export default class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            nonZeroAd: 0,
            addressesCount: 0,
            sats: 0,
            sumSats: 0,
            circulation: 0,
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        event.persist()
        const apiRequest = "https://api.blockchair.com/bitcoin/addresses?a=count()&q=balance("
            .concat(event.target.value, "..)&key=", process.env.REACT_APP_API_KEY)
        const apiRequestSum = "https://api.blockchair.com/bitcoin/addresses?a=sum(balance)&q=balance("
            .concat(event.target.value, "..)&key=", process.env.REACT_APP_API_KEY)
        if (event.target.value > 0) {
            fetch(apiRequest)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        addressesCount: data.data[0]['count()'],
                        sats: event.target.value
                    })
                })
            fetch(apiRequestSum)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data)
                    this.setState({
                        sumSats: data.data[0]['sum(balance)']
                    })
                })
        }
    }

    componentDidMount() {
        const apiRequest = "https://api.blockchair.com/bitcoin/addresses?a=count()&key="
            .concat(process.env.REACT_APP_API_KEY)
        const bitcoinStats = "https://api.blockchair.com/bitcoin/stats?key="
            .concat(process.env.REACT_APP_API_KEY)
        fetch(apiRequest)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    nonZeroAd: data.data[0]['count()']
                })
            })
        fetch(bitcoinStats)
            .then(response => response.json())
            .then(data => {
                console.log(data.data)
                this.setState({
                    circulation: data.data['circulation']
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
                        {this.state.sats ?
                            <h1 className="title">
                                {this.state.addressesCount.toLocaleString()} addresses have more than {parseInt(this.state.sats).toLocaleString()} Satoshis<br />
                                All those addresses represent {((this.state.sumSats / this.state.circulation) * 100).toFixed(2)}% of all the Bitcoins in circulation.
                            </h1> : null
                        }
                        <Addresses />
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}