import React from "react";
import {
    Switch,
    Route,
    BrowserRouter
} from "react-router-dom";

import Home from './Home';

const routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home} />
        </Switch>
    </BrowserRouter>
);

export default routes;