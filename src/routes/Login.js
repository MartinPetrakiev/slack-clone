import React, { useState } from 'react';
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import { Button, Container, Form, Header, Message } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';

const LOGIN_MUTATION = gql`
    mutation($email:String!, $password:String!) {
        login( email: $email, password: $password){
          ok
          token
          refreshToken,
          errors {
            path
            message
          }
        }
      }
`;

const Login = observer((props) => {
    const [login] = useMutation(LOGIN_MUTATION);
    const [formState] = useState(() =>
        observable({
            email: '',
            password: '',
            emailError: '',
            passwordError: ''
        })
    );

    const onSubmit = async (e) => {
        //clear errors form state
        (action(state => {
            state.emailError = '';
            state.passwordError = '';
        }))(formState);

        const { email, password } = { ...formState };
        try {
            const res = await login({
                variables: {
                    email,
                    password,
                }
            });
            const { ok, token, refreshToken, errors } = res.data.login;
            if (ok) {
                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', refreshToken);
                props.history.push('/');
            } else {
                //add errors to state
                (action(state => {
                    errors.forEach(({ path, message }) => {
                        state[`${path}Error`] = message;
                    });
                }))(formState);
            }
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = action((e, state) => {
        const { name, value } = e.target;
        state[name] = value;
    });

    const { email, password } = formState;
    const errorList = [];

    if (formState.emailError) {
        errorList.push(formState.emailError);
    }
    if (formState.passwordError) {
        errorList.push(formState.passwordError);
    }

    return (
        <Container text>
            <Header as='h2'>Login</Header>
            <Form error={!!errorList.length}>
                <Form.Field>
                    <Form.Input
                        error={!!formState.emailError}
                        fluid
                        label='Email'
                        placeholder='Email...'
                        name="email"
                        value={email}
                        onChange={(e) => handleChange(e, formState)}
                    />
                </Form.Field>
                <Form.Field>
                    <Form.Input
                        error={!!formState.passwordError}
                        fluid
                        label='Password'
                        placeholder='Password...'
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => handleChange(e, formState)}
                    />
                </Form.Field>
                <Message
                    error
                    list={errorList}
                />
                <Button onClick={onSubmit}>Login</Button>
            </Form>
        </Container>
    );
});

export default Login;
