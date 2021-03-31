import React, { useState } from 'react';
import { Send } from '@material-ui/icons';
import styles from '../styles/ChatInput.module.scss';
import { CREATE_MESSAGE_MUTATION } from '../graphql/mutations';
import { useMutation } from '@apollo/client';

function ChatInput({ channelName, channelId, chatRef }) {
    const [input, setInput] = useState('');
    const [createMessage] = useMutation(CREATE_MESSAGE_MUTATION);
    const sendMessage = async (e) => {
        e.preventDefault();
        if (input.trim()) {
            try {
                await createMessage({
                    variables: { channelId, text: input },
                });
            setInput('');
            } catch (error) {
                console.log([error]);
            }
        }
    };
    const scrollLastMesage = () => {
        chatRef?.current?.scrollIntoView({
            behavior: 'smooth',
        });
    }
    return (
        <div className={styles.container}>
            <form onSubmit={e => sendMessage(e)}>
                <div className={styles.input}>
                    <input value={input}
                        onFocus={scrollLastMesage}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                sendMessage(e);
                            }
                        }}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={`Send a message to #${channelName ? channelName : ''}`}
                    />
                    <div className={styles.input_buttons}>
                        <button className={styles.send} type="submit" disabled={!input}>
                            <Send />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ChatInput;
