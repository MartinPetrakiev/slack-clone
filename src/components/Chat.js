import { InfoOutlined } from '@material-ui/icons';
import React, { useEffect, useRef, useState } from 'react';
import styles from '../component-styles/Chat.module.scss';
import ChatInput from './ChatInput';
import Message from './Message';

function Chat({ channelId }) {
    const chatRef = useRef(null);
    const roomId = 1;
    const [channelDetails, setChannelDetails] = useState(false);
    const [channelMessages, setChannelMessages] = useState({
        timestamp: new Date(2021, 9, 22, 20, 15),
        message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.et consectetur adipisicing elit.et consectetur adipisicing elit.et consectetur adipisicing elit.et consectetur adipisicing elit.et consectetur adipisicing elit. Nemo dicta cum et eos voluptatibus nesciunt delectus. Earum, nisi beatae! Quo?',
        userImage: false,
        user: 'Martin Petrakiev',
        id: 1
    });

    const showDetails = () => {
        !channelDetails ? setChannelDetails(true) : setChannelDetails(false);
    };
    chatRef?.current?.scrollIntoView({
        behavior: 'smooth'
    });
    useEffect(() => {
        chatRef?.current?.scrollIntoView({
            behavior: 'smooth'
        });
    }, [roomId]);
    const message = (<Message key={channelMessages.id}
        message={channelMessages.message}
        timestamp={channelMessages.timestamp}
        user={channelMessages.user}
        userImage={channelMessages.userImage} />);

    const messages = new Array(10).fill(message);


    return (
        <div className={styles.container}>
            {channelId ? (
                <>
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
                        channelName={channelDetails || 'Channel 1'}
                        channelId={roomId}
                    />
                </>
            ) : (
                <div className={styles.header}>Select a channel</div>
            )}

        </div>
    );
}

export default Chat;
