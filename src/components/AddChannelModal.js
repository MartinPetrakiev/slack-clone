import React from 'react';
import { Input, Modal } from 'semantic-ui-react';
import { AddBox } from '@material-ui/icons';

function AddChannelModal() {
    const addChannel = () => {
        console.log(1);
    }
    const Content = (
        <div>
            <Input error fluid transparent label='Name' placeholder='# e.g. budget-talks ...' name='channelName' />
        </div>
    );
    return (
        <Modal
            trigger={<span><AddBox />Add channel</span>}
            header='Create a channel'
            content={Content}
            actions={['Close', { key: 'add', content: 'Add', positive: true, onClick: addChannel}]}
        />
    );
}

export default AddChannelModal;
