import React from "react";
import {
    Switch,
    Route,
    BrowserRouter
} from "react-router-dom";

import Home from './Home';
import Register from './Register';

const routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" exact component={Register} />
        </Switch>
    </BrowserRouter>
);

export default routes;