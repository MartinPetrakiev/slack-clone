import React from "react";
import {
    Switch,
    Route,
    Router,
    Redirect
} from "react-router-dom";
import { createBrowserHistory } from 'history';
import jwt_decode from "jwt-decode";

import Home from './Home';
import Register from './Register';
import Login from './Login';
import CreateTeam from './CreateTeam';

const history = createBrowserHistory();

function isAuthenticated() {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    try {
        jwt_decode(token);
        jwt_decode(refreshToken);
    } catch (error) {
        return false;
    }
    return true;
}

function PrivateRoute({ children, ...rest }) {
    const isAuth = isAuthenticated();
    return (
        <Route
            {...rest}
            render={({ }) =>
                isAuth ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                        }}
                    />
                )
            }
        />
    );
}



function Routes() {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={Login} />
                <PrivateRoute path="/create-team" exact>
                    <CreateTeam />
                </PrivateRoute>
            </Switch>
        </Router>
    );
}

export default Routes;