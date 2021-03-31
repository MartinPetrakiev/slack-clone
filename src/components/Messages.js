import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHANNEL_MESSAGES_QUERY } from '../graphql/quereis';
import { Comment } from 'semantic-ui-react';
import styles from '../styles/Message.module.scss';

function Messages({ channelId }) {
    const { loading, error, data } = useQuery(GET_CHANNEL_MESSAGES_QUERY, {
        variables: {
            channelId
        },
    });
    if (error) {
        console.log([error]);
    }
    return ((loading || error) ? null : (
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
    ));

    // return (
    //     <div className={styles.container}>
    //         <Comment.Group>
    //             <Comment>
    //                 <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
    //                 <Comment.Content>
    //                     <Comment.Author as='a'>Matt</Comment.Author>
    //                     <Comment.Metadata>
    //                         <div>Today at 5:42PM</div>
    //                     </Comment.Metadata>
    //                     <Comment.Text>How artistic!</Comment.Text>
    //                     <Comment.Actions>
    //                         <Comment.Action>Reply</Comment.Action>
    //                     </Comment.Actions>
    //                 </Comment.Content>
    //             </Comment>
    //         </Comment.Group>

    // );
}

export default Messages;
