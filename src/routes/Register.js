import React, { useState } from 'react';
import { Button, Container, Form, Header, Input } from 'semantic-ui-react';
import { useMutation, gql } from '@apollo/client';

const REGISTER_MUTATION = gql`
    mutation($username: String!, $email: String!, $password: String!) {
        register(username: $username, email: $email, password: $password) {
            token
        }
      }
`;

function Register() {
    const [register] = useMutation(REGISTER_MUTATION);
    const user = {
        username: '',
        email: '',
        password: ''
    };

    const [formState, setformState] = useState(user);
    const { username, email, password } = formState;

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await register({ variables: formState });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformState(state => ({ ...state, [name]: value }));
    };

    return (
        <Container text>
            <Header as='h2'>Register</Header>
            <Form>
                <Form.Field>
                    <label>Username</label>
                    <Input fluid onChange={handleChange} value={username} placeholder='Username...' name="username" />
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <Input fluid onChange={handleChange} value={email} placeholder='Email...' name="email" />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <Input fluid onChange={handleChange} value={password} type="password" placeholder='Password...' name="password" />
                </Form.Field>
                <Button onClick={onSubmit}>Register</Button>
            </Form>
        </Container>
    );
}

export default Register;
