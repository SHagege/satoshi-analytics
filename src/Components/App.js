import React from 'react';
import Addresses from "./Addresses";

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            addressesCount: 0
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        let apiRequest = "https://api.blockchair.com/bitcoin/addresses?a=count()&q=balance(".concat(event.target.value, "..)")
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
                <input class="input is-rounded" type="text" placeholder="Enter Satoshi amount" onChange={this.handleChange} />
                <div class="hero-body">
                    <div class="container has-text-centered">
                        <h1 class="title">
                            {this.state.addressesCount} addresses have more than this many Satoshis
                        </h1>
                        <h2 class="subtitle">
                        </h2>
                        <Addresses amount="12" />
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
