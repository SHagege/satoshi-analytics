import React from 'react'
import NavBar from './NavBar'
import axios from 'axios'

export default class Account extends React.Component {
    constructor() {
        super()
        this.state = {
            portfolio: [],
            coin: "",
            amount: 0
        }
        this.handleChangeCoin = this.handleChangeCoin.bind(this)
        this.handleChangeAmount = this.handleChangeAmount.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.deleteCoin = this.deleteCoin.bind(this)
    }

    handleChangeCoin(event) {
        this.setState({ coin: event.target.value });
    }

    handleChangeAmount(event) {
        this.setState({ amount: event.target.value })
    }

    async handleSubmit(event) {
        const coin = {
            coinName: this.state.coin,
            amount: this.state.amount
        }
        const response = await axios.post(
            'http://localhost:5000/add',
            coin,
            { headers: { 'Content-Type': 'application/json' } }
        )
        axios.get("http://localhost:5000/portfolio")
            .then(res => {
                const data = res.data
                this.setState({ portfolio: res.data.coins })
            });
    }

    componentDidMount() {
        axios.get("http://localhost:5000/portfolio")
            .then(res => {
                const data = res.data
                this.setState({ portfolio: res.data.coins })
            });
    }

    deleteCoin(coin) {
        const request = "http://localhost:5000/delete/".concat(coin)
        axios.delete("http://localhost:5000/delete/")
    }

    render() {
        const portfolio = this.state.portfolio.map((item, index) =>
            <div>
                <div className="row-rich-list">
                    <div>
                        <p>{item.name}</p>
                    </div>
                    <div>
                        {item.amount}
                    </div>
                </div>
            </div>)
        return (
            <div>
                <NavBar />
                <div className="has-text-centered title-top">
                    <h1 className="title is-1">Add coin to portfolio</h1>
                </div>
                <input className="input" type="text" onChange={this.handleChangeCoin} placeholder="Coin" />
                <input className="input" type="text" onChange={this.handleChangeAmount} placeholder="Amount" />
                <div class="control">
                    <button className="button is-light" onClick={this.handleSubmit}>Add</button>
                </div>
                <div className="portfolio-container">
                    <h1 className="title">Portfolio</h1>
                    <div className="portfolio-address-container">{portfolio}</div>
                </div>
            </div>
        )
    }
}