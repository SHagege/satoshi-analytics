import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Home from './Components/Home.jsx';
import NavBar from './Components/NavBar.jsx';
import About from './Components/About.jsx';

import { BrowserRouter, Route, Switch } from 'react-router-dom'

function App() {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/about">
                <About />
            </Route>
        </Switch>
    )
}

//ReactDOM.render(<BrowserRouter><NavBar /></BrowserRouter>, document.getElementById('NavBar'));
ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));