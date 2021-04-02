import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import styles from '../styles/Profile.module.scss';
import { useHistory } from 'react-router';


function Profile(props) {
    const passedState = props.location.state;
    const [userData, setUserData] = useState({
        userKey: passedState.userKey,
        username: passedState.username,
        email: passedState.email,
        teams: passedState.teams,
    });
    const history = useHistory();

    const goBack = () => {
        history.push(`${passedState.prevPath}`);
    };
    return (
        <div className={styles.container}>
            <div className={styles.inner_container}>
                <img src='https://cdn.imgbin.com/14/8/7/imgbin-avatar-user-computer-icons-software-developer-avatar-cHpTC4i4gTx3YyY9YUPpaPJGi.jpg' alt="" />
                <h1>{userData.username}</h1>
                <h3>{null || 'Add title'}</h3>
                <p>Email adresss: {userData.email}</p>
                <div>
                    Your teams:
                        {userData.teams.map(x => (<p key={x.teanKey}>{x.name}</p>))}
                </div>
                <div>
                    <Button onClick={goBack}>Return</Button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
