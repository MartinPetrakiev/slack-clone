import React, { useReducer } from 'react';
import { PersonAdd } from '@material-ui/icons';
import { Button, Form, Header, Modal } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { ADD_TEAM_MEMBER_MUTATION } from '../graphql/mutations';
import reducer from './modalReducer';

function AddPeopleModal({ teamId, admin, refetch }) {
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
                    admin,
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
            //handle error optional
            console.log(errors);
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
