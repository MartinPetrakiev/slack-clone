import { InfoOutlined } from '@material-ui/icons';
import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/Chat.module.scss';
import ChatInput from '../containers/ChatInput';
import Message from '../containers/Message';

function Chat({ channelId }) {
    const chatRef = useRef(null);
    const roomId = 1;
    const [channelMessages, setChannelMessages] = useState({
        timestamp: new Date(2021, 9, 22, 20, 15),
        message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.et consectetur adipisicing elit.et consectetur adipisicing elit.et consectetur adipisicing elit.et consectetur adipisicing elit.et consectetur adipisicing elit. Nemo dicta cum et eos voluptatibus nesciunt delectus. Earum, nisi beatae! Quo?',
        userImage: false,
        user: 'Martin Petrakiev',
        id: 1
    });

    const showDetails = () => {

    };

    chatRef?.current?.scrollIntoView({
        behavior: 'smooth'
    });

    useEffect(() => {
        chatRef?.current?.scrollIntoView({
            behavior: 'smooth'
        });
    }, [roomId]);

    const message = (<Message key={Math.floor(Math.random() * 100)}
        message={channelMessages.message}
        timestamp={channelMessages.timestamp}
        user={channelMessages.user}
        userImage={channelMessages.userImage} />);

    const messages = new Array(10).fill(message);


    return (
        <>
            {channelId ? (
                <div className={styles.container}>
                    <div className={styles.header}>
                        <div className={styles.header_left}>
                            <h4><strong># Channel 1</strong></h4>
                        </div>
                        <div className={styles.header_right}>
                            <div onClick={showDetails}>
                                <InfoOutlined />
                            </div>
                        </div>
                    </div>
                    <div className={styles.messages}>
                        {messages}
                        <div ref={chatRef} />
                    </div>
                    <ChatInput
                        chatRef={chatRef}
                        channelName={'Channel 1'}
                        channelId={roomId}
                    />
                </div>
            ) : (
                <div className={styles.container}>
                    <div className={styles.header}>Select a channel</div>
                </div>
            )}

        </>
    );
}

export default Chat;
