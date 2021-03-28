import { InfoOutlined } from '@material-ui/icons';
import React, { useEffect, useRef } from 'react';
import ChatInput from '../components/ChatInput';
import Message from '../components/Message';
import { useLazyQuery } from '@apollo/client';
import { GET_CHANNEL_MESSAGES_QUERY } from '../graphql/quereis';
import AddTopicModal from '../components/AddTopicModal';
import { Icon } from 'semantic-ui-react';
import styles from '../styles/Chat.module.scss';

function Chat({ channelKey }) {
    const chatRef = useRef(null);
    chatRef?.current?.scrollIntoView({
        behavior: 'smooth'
    });
    const [getChannels, { loading, error, data }] = useLazyQuery(GET_CHANNEL_MESSAGES_QUERY, {
        variables: {
            channelKey
        },
    });

    useEffect(() => {
        chatRef?.current?.scrollIntoView({
            behavior: 'smooth'
        });
        if (channelKey) {
            getChannels();
        }
    }, [channelKey, getChannels]);

    const messages = [];
    let channelName = '';
    let topic = '';

    if (error) return (
        <div className={styles.container}>
            <div className={styles.header}>Select a channel</div>
        </div>
    );

    if (data && data.hasOwnProperty('getChannel')) {
        channelName = data.getChannel.name;
        topic = data.getChannel.topic;
        data.getChannel.messages?.forEach(msg => {
            messages.push({
                timestamp: new Date(Number(msg.createdAt)),
                text: msg.text,
                userImage: false,
                user: msg.user.username,
                id: msg.id,
                msgKey: msg.msgKey
            });
        });
    }

    const showDetails = () => {

    };

    return (
        <div className={styles.container}>
            {loading && (<div className={styles.loading}>  <Icon loading name='spinner' size="big" /></div>)}
            {data && channelName ? (
                <>
                    <div className={styles.header}>
                        <div className={styles.header_left}>
                            <h4><strong># {channelName}</strong></h4>
                            <p>{topic ? topic : (<AddTopicModal />)}</p>
                        </div>
                        <div className={styles.header_right}>
                            <div onClick={showDetails}>
                                <InfoOutlined />
                            </div>
                        </div>
                    </div>
                    {messages.length ?
                        (<div className={styles.messages}>
                            {messages.map(x => {
                                return (
                                    <Message key={x.msgKey}
                                        message={x.text}
                                        timestamp={x.timestamp}
                                        user={x.user}
                                        userImage={x.userImage} />
                                );
                            })}
                            <div ref={chatRef} />
                        </div>)
                        :
                        (<div className={styles.messages}></div>)
                    }
                    <ChatInput
                        chatRef={chatRef}
                        channelName={channelName}
                        channelKey={channelKey}
                    />
                </>
            ) : (
                    <div className={styles.header}>Select a channel</div>
            )}

        </div>
    );
}

export default Chat;
