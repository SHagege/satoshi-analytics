import React from "react"

export default class Addresses extends React.Component {
    constructor() {
        super()
        this.state = {
            richList: []
        }
    }

    componentDidMount() {
        let apiRequest = "https://api.blockchair.com/bitcoin/addresses"
        fetch(apiRequest)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    richList: data.data
                })
            }).catch(err => err)

    }

    render() {
        const richListDisplay = this.state.richList.map((e) =>
            <div className="row-rich-list">
                <div>
                    <a href={"https://blockchair.com/bitcoin/address/" + e.address}>{e.address}</a>
                </div>
                <div>
                    {e.balance.toLocaleString()} Sats
                </div>
            </div>)
        return (
            <div className="richlist-container">
                <h1 className="title">Rich List</h1>
                <div className="richlist-address-container">{richListDisplay}</div>
            </div >
        )
    }
}