import React from 'react'
import ReactDOM from 'react-dom'
import NavBar from './NavBar'
import axios from 'axios'

export default class Account extends React.Component {
    constructor() {
        super()
        this.state = {
            portfolio: [],
            value: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    async handleSubmit(event) {
        const coin = {
            coinName: this.state.value
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

    render() {
        return (
            <div>
                <NavBar />
                <div className="has-text-centered title-top">
                    <h1 className="title is-1">Add coin to portfolio</h1>
                </div>
                <input className="input" type="text" onChange={this.handleChange} placeholder="Coin" />
                <div class="control">
                    <button className="button is-light" onClick={this.handleSubmit}>Add</button>
                </div>
                <div className="richlist-container">
                    <h1 className="title">Portfolio</h1>
                    {this.state.portfolio.map((item, index) => {
                        return (
                            <div>
                                <div className="richlist-address-container">{item.name}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}