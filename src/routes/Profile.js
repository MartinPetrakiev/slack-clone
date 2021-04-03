import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import styles from '../styles/Profile.module.scss';
import { useHistory } from 'react-router';
import AddUserTitleModal from '../components/AddUserTitleModal';


function Profile(props) {
    const passedState = props.location.state;
    const [userData, setUserData] = useState({ ...passedState });
    const history = useHistory();
    const goBack = () => {
        history.push(`${passedState.prevPath}`);
    };
    return (
        <div className={styles.container}>
            <div className={styles.inner_container}>
                <img src='https://cdn.imgbin.com/14/8/7/imgbin-avatar-user-computer-icons-software-developer-avatar-cHpTC4i4gTx3YyY9YUPpaPJGi.jpg' alt="" />
                <h1>{userData.username}</h1>
                <h3>{userData.title || <AddUserTitleModal userId={userData.id} setUserData={setUserData}/>}</h3>
                {userData.admin ?
                    (<span>Owner of {userData.currentTeam}</span>)
                    :
                    (<span>Member of {userData.currentTeam}</span>)
                }
                <hr />
                <p>Email adresss: <span>{userData.email}</span></p>
                <hr />
                <div className={styles.teams_list}>
                    Your teams:
                    <ul>
                        {userData.teams && userData.teams?.map(x => (<li key={x.teamKey}>{x.name}</li>))}
                    </ul>
                </div>
                <div>
                    <Button onClick={goBack}>Return</Button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
