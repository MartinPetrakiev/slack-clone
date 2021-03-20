import React from "react";
import {
    Switch,
    Route,
    Router
} from "react-router-dom";
import { createBrowserHistory } from 'history';

import Home from './Home';
import Register from './Register';
import Login from './Login';
import CreateTeam from './CreateTeam';

const history = createBrowserHistory();

const routes = () => (
    <Router history={history}>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="/create-team" exact component={CreateTeam} />
        </Switch>
    </Router>
);

export default routes;