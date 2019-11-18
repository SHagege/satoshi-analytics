import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Components/Home.jsx';
import About from './Components/About.jsx';

import { BrowserRouter, Route, Switch } from 'react-router-dom'

function App() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/about">
                    <About />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));