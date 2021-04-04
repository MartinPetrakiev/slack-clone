import React, { useReducer } from 'react';
import { InfoRounded } from '@material-ui/icons';
import { Button, Form, Header, Modal } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { ADD_CHANNEL_TOPIC_MUTATION } from '../graphql/mutations';
import { useHistory } from 'react-router';
import { GET_CHANNEL_QUERY } from '../graphql/quereis';
import reducer from './modalReducer';

function AddTopicModal({ channelId, channelKey }) {
    const [state, dispatch] = useReducer(reducer, {
        open: false,
    });
    const [addTopicMutation] = useMutation(ADD_CHANNEL_TOPIC_MUTATION);
    const history = useHistory();
    const addTopic = async (e) => {
        e.preventDefault();
        const topic = e.target.topic.value;
        let res;
        try {
            res = await addTopicMutation({
                variables: {
                    channelId: Number(channelId),
                    topic
                },
                refetchQueries: [{
                    query: GET_CHANNEL_QUERY,
                    variables: { channelKey }
                }]
            });
        } catch (error) {
            console.log([error]);
        }
        const { ok, errors } = res.data.addTopic;
        if (ok) {
            dispatch({ type: 'CLOSE_MODAL' });
            console.log(history.location.state);
        } else {
            console.log([errors]);
        }
    };

    return (
        <Modal
            as={Form}
            open={state.open}
            onOpen={() => dispatch({ type: 'OPEN_MODAL' })}
            onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
            trigger={<span><InfoRounded />Add Topic</span>}
            onSubmit={e => addTopic(e)}
            size="tiny"
        >
            <Header icon="talk" content="Add Topic to current channel" as="h2" />
            <Modal.Content>
                <Form.Input required={true} type="text" placeholder="e.g. Holiday planing" name="topic" />
            </Modal.Content>
            <Modal.Actions>
                <Button type="button" onClick={() => dispatch({ type: 'CLOSE_MODAL' })} color="red" icon="times" content="Close" />
                <Button type="submit" color="green" icon="add" content="Add" value="add" />
            </Modal.Actions>
        </Modal>
    );
}

export default AddTopicModal;
