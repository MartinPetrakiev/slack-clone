import React, { useState } from 'react';
import { Button, Container, Form, Header, Message } from 'semantic-ui-react';
import { useMutation, gql } from '@apollo/client';

const REGISTER_MUTATION = gql`
    mutation($username: String!, $email: String!, $password: String!) {
        register(username: $username, email: $email, password: $password) {
            ok
            errors {
                path
                message
            }
        }
      }
`;

function Register(props) {
    const [register] = useMutation(REGISTER_MUTATION);
    const user = {
        username: '',
        usernameError: '',
        email: '',
        emailError: '',
        password: '',
        passwordError: '',
        rePassword: '',
        rePasswordError: ''
    };

    const [formState, setformState] = useState(user);
    const {
        username,
        email,
        password,
        usernameError,
        emailError,
        passwordError,
        rePassword,
        rePasswordError
    } = formState;

    const onSubmit = async (e) => {

        setformState((state) => {
            state.usernameError = '';
            state.emailError = '';
            state.passwordError = '';
            state.rePasswordError = '';
            return state;
        });

        if (password !== rePassword) {
            errorList.push(rePasswordError);
            setformState({
                ...formState,
                rePassword: '',
                rePasswordError: 'Passwords don\'t match'
            });
        } else {
            try {
                const res = await register({
                    variables: {
                        username,
                        email,
                        password
                    }
                });
                const { ok, errors } = res.data.register;
                if (ok) {
                    props.history.push('/');
                } else {
                    const err = {};
                    errors.forEach(({ path, message }) => {
                        err[`${path}Error`] = message;
                    });
                    setformState({ ...formState, ...err });
                }
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformState(state => ({ ...state, [name]: value }));
    };

    const errorList = [];

    if (usernameError) {
        errorList.push(usernameError);
    }
    if (emailError) {
        errorList.push(emailError);
    }
    if (passwordError) {
        errorList.push(passwordError);
    }
    if (rePasswordError) {
        errorList.push(rePasswordError);
    }

    return (
        <Container text>
            <Header as='h2'>Register</Header>
            <Form error={!!errorList.length}>
                <Form.Field>
                    <Form.Input error={!!usernameError} fluid label='Username' placeholder='Username...' name="username" value={username} onChange={handleChange} />
                </Form.Field>
                <Form.Field>
                    <Form.Input error={!!emailError} fluid label='Email' placeholder='Email...' name="email" value={email} onChange={handleChange} />
                </Form.Field>
                <Form.Field>
                    <Form.Input error={!!passwordError} fluid label='Password' placeholder='Password...' name="password" type="password" value={password} onChange={handleChange} />
                </Form.Field>
                <Form.Field>
                    <Form.Input error={!!rePasswordError} fluid label='Password Confirmation' placeholder='Confirm password...' name="rePassword" type="password" value={rePassword} onChange={handleChange} />
                </Form.Field>
                <Message
                    error
                    list={errorList}
                />
                <Button onClick={onSubmit}>Register</Button>
            </Form>
        </Container>
    );
}

export default Register;
