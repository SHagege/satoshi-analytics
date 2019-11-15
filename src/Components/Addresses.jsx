import React from "react"

class List extends React.Component {
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
                    {e.address}
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

export default List;