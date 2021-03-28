import { AddBox } from '@material-ui/icons';
import React, { useReducer } from 'react';
import { Button, Form, Header, Modal } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { CREATE_CHANNEL_MUTATION } from '../graphql/mutations';

function reducer(state, action) {
    switch (action.type) {
        case 'OPEN_MODAL':
            return { ...state, open: true };
        case 'CLOSE_MODAL':
            return { ...state, open: false };
        default:
            throw new Error();
    }
}

function AddChannelModal({ teamId, refetch }) {
    const [state, dispatch] = useReducer(reducer, {
        open: false,
    });
    const [createChannel] = useMutation(CREATE_CHANNEL_MUTATION);
    const { open } = state;
    const addChannel = async (e) => {
        e.preventDefault();
        const name = e.target.channelName.value;
        const topic = e.target.topic.value;
        let res;
        try {
            res = await createChannel({
                variables: {
                    teamId: Number(teamId),
                    name,
                    topic
                }
            });
        } catch (error) {
            console.log([error]);
        }
        const { ok, errors } = res.data.createChannel;
        if (ok) {
            console.log('channel added');
            dispatch({ type: 'CLOSE_MODAL' });
            refetch();
        } else {
            console.log([errors]);
        }
    };

    return (
        <Modal
            as={Form}
            open={open}
            onOpen={() => dispatch({ type: 'OPEN_MODAL' })}
            onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
            trigger={<span><AddBox />Add channel</span>}
            onSubmit={e => addChannel(e)}
            size="tiny"
        >
            <Header icon="pencil" content="Create a channel" as="h2" />
            <Modal.Content>
                <Form.Input required={true} label="Name" type="text" placeholder="# e.g. budget-talks ..." name="channelName" />
                <Form.Input label="Topic" type="text" placeholder="anything useful ..." name="topic" />
            </Modal.Content>
            <Modal.Actions>
                <Button type="button" onClick={() => dispatch({ type: 'CLOSE_MODAL' })} color="red" icon="times" content="Close" />
                <Button type="submit" color="green" icon="add" content="Add" value="add" />
            </Modal.Actions>
        </Modal>
    );
}

export default AddChannelModal;
