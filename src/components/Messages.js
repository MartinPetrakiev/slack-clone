import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHANNEL_MESSAGES_QUERY } from '../graphql/quereis';
import { NEW_CHANNEL_MESSAGE_SUBSCRIPTION } from '../graphql/subscriptions';
import { Comment } from 'semantic-ui-react';
import styles from '../styles/Message.module.scss';


function MessagesWIthData({ channelId }) {
    const { subscribeToMore, ...result } = useQuery(GET_CHANNEL_MESSAGES_QUERY, {
        variables: {
            channelId
        },
    });
    return (
        <Messages
            {...result}
            subscribeToNewMessages={() =>
                subscribeToMore({
                    document: NEW_CHANNEL_MESSAGE_SUBSCRIPTION,
                    variables: { channelId },
                    updateQuery: (prev, { subscriptionData }) => {
                        if (!subscriptionData.data) return prev;
                        console.log(subscriptionData);
                        return {
                            ...prev,
                            messages: [...prev.messages, subscriptionData.data.newChannelMessage],
                        };
                    }
                })}
        />
    );
}

class Messages extends React.Component {
    componentDidMount() {
        this.props.subscribeToNewMessages();
    }

    render() {
        const { loading, error, data } = this.props;
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
};

export default MessagesWIthData;
