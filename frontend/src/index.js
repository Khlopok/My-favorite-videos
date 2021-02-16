import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import VideoList from './components/videos/VideoList';
import VideoForm from './components/videos/VideoForm';
import Form from './components/session/Form';

const App = _ => (
    <Router>
        <Switch>
            <Route exact path='/session' component={Form} />
            <Route exact path='/session/:mode' component={Form} />
            <Route exact path='/'>
                <Navbar />
                <VideoList />
            </Route>
            <Route exact path='/new_video'>
                <Navbar />
                <VideoForm />
            </Route>
            <Route exact path='/update/:id'>
                <Navbar />
                <VideoForm />
            </Route>
        </Switch>
    </Router>
)

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);