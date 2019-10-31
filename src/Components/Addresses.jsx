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
            <li key={e.address} value={e.address}>{e.address} {e.balance} Sats</li>)
        return (
            <div>
                <h1 className="title">Rich List</h1>
                {richListDisplay}
            </div>
        )
    }
}

export default List;