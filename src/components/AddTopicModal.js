import React from 'react';
import { Input, Modal } from 'semantic-ui-react';

function AddChannelModal() {
    const addTopic = () => {
        console.log(1);
    }
    const Content = (
        <div>
            <Input error fluid transparent placeholder='e.g. Holiday planning ...' name='topic' />
        </div>
    );
    return (
        <Modal
            trigger={<span>Add topic</span>}
            header='Add topic'
            content={Content}
            actions={['Close', { key: 'add', content: 'Add', positive: true, onClick: addTopic}]}
        />
    );
}

export default AddChannelModal;
