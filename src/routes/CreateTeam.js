import React, { useState } from 'react';
import { Button, Container, Form, Header, Message } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { CREAT_TEAM_MUTATION } from '../graphql/mutations';

function CreateTeam(props) {
    const [createTeam] = useMutation(CREAT_TEAM_MUTATION);
    const [formState, setFormState] = useState({
        name: '',
        nameError: '',
        otherError: '',
    }
    );

    const onSubmit = async (e) => {
        e.preventDefault();
        //clear errors form state
        setFormState(state => {
            return { ...state, nameError: '' };
        });
        let res;
        const { name } = { ...formState };
        try {
            if (!name) {
                return;
            }
            res = await createTeam({
                variables: { name }
            });
        } catch (error) {
            console.log([error]);
            props.history.push('/login');
            return;
        }

        const { ok, errors } = res.data.createTeam;
        if (ok) {
            props.history.push({
                pathname: '/team-select',
                state: { refetch: true }
            });
        } else {
            //add errors to state
            const err = {};
            errors.forEach(({ path, message }) => {
                err[`${path}Error`] = message;
            });
            setFormState((state) => {
                return { ...state, ...err };
            });
        }
        console.log(res);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(state => {
            return { ...state, [name]: value };
        });
    };

    const { name } = formState;
    const errorList = [];

    if (formState.nameError) {
        errorList.push(formState.nameError);
    }
    if (formState.otherError) {
        errorList.push(formState.otherError);
    }

    return (
        <Container text>
            <Header as='h2'>Create Team</Header>
            <Form error={!!errorList.length}>
                <Form.Field>
                    <Form.Input error={!!formState.nameError} fluid label='Team Name' placeholder='Name...' name="name" value={name} onChange={handleChange} />
                </Form.Field>
                <Message
                    error
                    list={errorList}
                />
                <Button onClick={onSubmit}>Submit</Button>
            </Form>
        </Container>
    );
};

export default CreateTeam;
