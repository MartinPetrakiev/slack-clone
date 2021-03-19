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

const history = createBrowserHistory();

const routes = () => (
    <Router history={history}>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
        </Switch>
    </Router>
);

export default routes;