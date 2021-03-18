import React from "react";
import {
    Switch,
    Route,
    BrowserRouter
} from "react-router-dom";
import { createBrowserHistory } from 'history';

import Home from './Home';
import Register from './Register';

const history = createBrowserHistory();

const routes = () => (
    <BrowserRouter history={history}>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" exact component={Register} />
        </Switch>
    </BrowserRouter>
);

export default routes;