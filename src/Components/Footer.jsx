import React from 'react'

export default class Footer extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <footer class="footer">
                <div class="content has-text-centered">
                    <p>
                        <strong>Thanks to <a href="https://blockchair.com/">Blockchair</a> for providing a powerful API to display this data.</strong>
                    </p>
                </div>
            </footer>
        )
    }
}