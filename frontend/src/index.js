import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import VideoList from './components/videos/VideoList';
import VideoForm from './components/videos/VideoForm';
import Form from './components/session/Form';

const App = _ => {
    const [fetching, setFetching] = useState(false);

    const fetchStart = _=> { setFetching(true) }
    const fetchClose = _=> { setFetching(false) }

    return (
        <Router>
            <Switch>
                <Route exact path='/session'>
                    <Navbar load={fetching} onlyProgress={true} />
                    <Form fetchStart={fetchStart} fetchClose={fetchClose} />
                </Route>
                <Route exact path='/session/:mode'>
                    <Navbar load={fetching} onlyProgress={true} />
                    <Form fetchStart={fetchStart} fetchClose={fetchClose} />
                </Route>
                <Route exact path='/'>
                    <Navbar load={fetching} onlyProgress={false} />
                    <VideoList />
                </Route>
                <Route exact path='/new_video'>
                    <Navbar load={fetching} onlyProgress={false} />
                    <VideoForm fetchStart={fetchStart} fetchClose={fetchClose} />
                </Route>
                <Route exact path='/update/:id'>
                    <Navbar load={fetching} onlyProgress={false} />
                    <VideoForm fetchStart={fetchStart} fetchClose={fetchClose} />
                </Route>
            </Switch>
        </Router>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);