import React, { useReducer } from 'react';
import { AssignmentInd } from '@material-ui/icons';
import { Button, Form, Header, Modal } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { ADD_USER_TITLE_MUTATION } from '../graphql/mutations';
import reducer from './modalReducer';

function AddUserTitleModal({ setUserData }) {
    const [state, dispatch] = useReducer(reducer, {
        open: false,
    });
    const [addUserTitle] = useMutation(ADD_USER_TITLE_MUTATION);
    const { open } = state;
    const addTitle = async (e) => {
        e.preventDefault();
        const title = e.target.title.value;

        let res;
        try {
            res = await addUserTitle({
                variables: {
                    title
                },
            });
        } catch (error) {
            console.log([error]);
        }
        const { ok, title: titleName, errors } = res.data.addTitle;
        if (ok) {
            dispatch({ type: 'CLOSE_MODAL' });
            setUserData((oldState) => {
                return { ...oldState, title: titleName }
            })
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
            trigger={<span><AssignmentInd />Add Title</span>}
            onSubmit={e => addTitle(e)}
            size="tiny"
        >
            <Header icon="user circle" content="Add Title" as="h2" />
            <Modal.Content>
                <Form.Input required={true} type="text" placeholder="Title..." name="title" />
            </Modal.Content>
            <Modal.Actions>
                <Button type="button" onClick={() => dispatch({ type: 'CLOSE_MODAL' })} color="red" icon="times" content="Close" />
                <Button type="submit" color="green" icon="add" content="Add" value="add" />
            </Modal.Actions>
        </Modal>
    );
}

export default AddUserTitleModal;
