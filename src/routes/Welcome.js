import React from 'react';
import { Button } from '@material-ui/core';
import styles from '../styles/Welcome.module.scss';
import slackLogo from '../styles/slack-logo.png';

function Welcome(props) {
    const login = () => {
        props.history.push('/login');
    };
    const register = () => {
        props.history.push('/register');
    };

    return (
        <div className={styles.container}>
            <div className={styles.inner_container}>
                <img src={slackLogo} alt="" />
                <h1>WELCOME</h1>
                <div>
                    <Button onClick={login}>LOGIN</Button>
                    <Button onClick={register}>REGISTER</Button>
                </div>
            </div>
        </div>
    );
}

export default Welcome;
