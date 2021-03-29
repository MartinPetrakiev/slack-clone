import React, { useReducer } from 'react';
import { PersonAdd } from '@material-ui/icons';
import { Button, Form, Header, Modal } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { ADD_TEAM_MEMBER_MUTATION } from '../graphql/mutations';

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

function AddPeopleModal({ teamId, refetch }) {
    const [state, dispatch] = useReducer(reducer, {
        open: false,
    });
    const [addMember] = useMutation(ADD_TEAM_MEMBER_MUTATION);
    const { open } = state;
    const addUser = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        let res;
        try {
            res = await addMember({
                variables: {
                    teamId: Number(teamId),
                    email
                }
            });
        } catch (error) {
            console.log([error]);
        }
        const { ok, errors } = res.data.addTeamMember;
        if (ok) {
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
            trigger={<span><PersonAdd />Add Team Member</span>}
            onSubmit={e => addUser(e)}
            size="tiny"
        >
            <Header icon="add user" content="Add People to your Team" as="h2" />
            <Modal.Content>
                <Form.Input required={true} type="text" placeholder="User's email" name="email" />
            </Modal.Content>
            <Modal.Actions>
                <Button type="button" onClick={() => dispatch({ type: 'CLOSE_MODAL' })} color="red" icon="times" content="Close" />
                <Button type="submit" color="green" icon="add" content="Add" value="add" />
            </Modal.Actions>
        </Modal>
    );
}

export default AddPeopleModal;
