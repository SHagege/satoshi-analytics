import React from 'react';
import Addresses from "./Addresses.jsx";
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx'
import axios from 'axios';

export default class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            nonZeroAd: 0,
            addressesCount: 0,
            sats: 0,
            sumSats: 0,
            circulation: 0,
            halveningBlockLeft: 0
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        event.persist()
        const apiRequest = "https://api.blockchair.com/bitcoin/addresses?a=count()&q=balance("
            .concat(event.target.value)
        const apiRequestSum = "https://api.blockchair.com/bitcoin/addresses?a=sum(balance)&q=balance("
            .concat(event.target.value)
        if (event.target.value > 0) {
            axios.get(apiRequest)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        addressesCount: data.data[0]['count()'],
                        sats: event.target.value
                    })
                })
            axios.get(apiRequestSum)
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
        const apiRequest = "https://api.blockchair.com/bitcoin/addresses?a=count()"
        const bitcoinStats = "https://api.blockchair.com/bitcoin/stats"
        const halveningStats = "https://api.blockchair.com/tools/halvening"
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
        fetch(halveningStats)
            .then(response => response.json())
            .then(data => {
                console.log(data.data)
                console.log(data.data['bitcoin']['blocks_left'])
                this.setState({
                    halveningBlockLeft: data.data['bitcoin']['blocks_left']
                })
            })
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="has-text-centered title-container">
                    <h1 className="title-halving">{this.state.halveningBlockLeft} blocks are left before the Halving. At block 630,000 the block reward will drop to 6.25 BTC</h1>
                    <h1 className="title is-2">{this.state.nonZeroAd.toLocaleString()} addresses have a non-zero balance</h1>
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