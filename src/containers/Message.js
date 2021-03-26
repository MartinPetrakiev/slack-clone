import React from 'react';
import styles from '../styles/Message.module.scss';

function Message({ message, timestamp, user, userImage }) {
    return (
        <div className={styles.container}>
            <div className={styles.inner_container}>
                <img src={'https://i0.wp.com/dev.slack.com/img/avatars/ava_0010-512.v1443724322.png?ssl=1'} alt="" />
                <div className={styles.msg_container}>
                    <div className={styles.info}>
                        {user} <span>{timestamp ? new Intl.DateTimeFormat('en-US', { timeStyle: 'short' }).format(timestamp) : null}</span>
                    </div>
                    <p>{message}</p>
                </div>
            </div>
        </div>
    );
}

export default Message;
