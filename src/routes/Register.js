import React, { useState } from 'react';
import { Button, Container, Form, Header, Input } from 'semantic-ui-react';
import { useMutation, gql } from '@apollo/client';

const registerMutation = gql`
    mutation($username: String!, $email: String!, $password: String!) {
        register(username: $username, email: $email, password: $password)
      }
`;

function Register() {
    const [register, { data, error }] = useMutation(registerMutation);
    const user = {
        username: '',
        email: '',
        password: ''
    };

    const [userState, setUserState] = useState(user);
    const { username, email, password } = userState;

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await register({ variables: userState });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserState(state => ({ ...state, [name]: value }));
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
