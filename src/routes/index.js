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
import TeamSelect from './TeamSelect';
import Welcome from './Welcome';

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

function PrivateRoute({ component: Component, ...rest }) {
    const isAuth = isAuthenticated();
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuth ? (
                    <Component {...props} />
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
                <Route exact path="/" component={Welcome} />
                <PrivateRoute exact path="/client/:teamKey?" component={Home} />
                <PrivateRoute exact path="/team-select" component={TeamSelect} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/create-team" component={CreateTeam} />
            </Switch>
        </Router>
    );
}

export default Routes;