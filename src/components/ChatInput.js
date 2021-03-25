import React, { useState } from 'react';
import { Send } from '@material-ui/icons';
import styles from '../component-styles/ChatInput.module.scss';

function ChatInput({ channelName }) {
    const [input, setInput] = useState('');
    const sendMessage = () => {

    };
    return (
        <div className={styles.container}>
            <div className={styles.input}>
                <input value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Send a message to #${channelName ? channelName : ''}`} />
                <div className={styles.input_buttons}>
                    <div className={styles.send} onClick={sendMessage}>
                        <Send />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ChatInput;
