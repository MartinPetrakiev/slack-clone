import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHANNEL_MESSAGES_QUERY } from '../graphql/quereis';
import { NEW_CHANNEL_MESSAGE_SUBSCRIPTION } from '../graphql/subscriptions';
import { Comment } from 'semantic-ui-react';
import styles from '../styles/Message.module.scss';



function Messages({ channelId }) {
    const { subscribeToMore, loading, error, data } = useQuery(GET_CHANNEL_MESSAGES_QUERY, {
        variables: {
            channelId
        },
        fetchPolicy: "network-only"
    });

    useEffect(() => {
        //subscribe to new msg and store unsub fn
        let unsubscribe;
        if (subscribeToMore) {
            unsubscribe = subscribeToMore({
                document: NEW_CHANNEL_MESSAGE_SUBSCRIPTION,
                variables: { channelId },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    return {
                        ...prev,
                        messages: [...prev.messages, subscriptionData.data.newChannelMessage],
                    };
                }
            });
        }
        return function cleanup() {
            //unsubscirbe on component unmount
            unsubscribe();
        };
    }, [channelId, subscribeToMore]);

    return (loading || error) ? null : (
        <>
            {data.messages.map(m => (
                <div className={styles.container} key={m.msgKey}>
                    <Comment.Group>
                        <Comment>
                            <Comment.Avatar src='https://i0.wp.com/dev.slack.com/img/avatars/ava_0010-512.v1443724322.png?ssl=1' />
                            <Comment.Content>
                                <Comment.Author as="a">{m.user.username}</Comment.Author>
                                <Comment.Metadata>
                                    <div>{new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(m.createdAt)}</div>
                                </Comment.Metadata>
                                <Comment.Text>{m.text}</Comment.Text>
                                {/* <Comment.Actions>
                                <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions> */}
                            </Comment.Content>
                        </Comment>
                    </Comment.Group>
                </div>
            ))}
        </>
    );
}


export default Messages;