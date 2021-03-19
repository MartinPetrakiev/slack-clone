import React from 'react';
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
    const state = observable({
        values: {
            email: '',
            password: '',
            emailError: '',
            passwordError: ''
        }
    });

    const onSubmit = async (e) => {
        const { email, password } = { ...state.values };
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
                const err = {};
                errors.forEach(({ path, message }) => {
                    err[`${path}Error`] = message;
                });
                // action(state => {
                    
                // });
                state.values =  {...state.values, ...err}
            }
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = action((e, state) => {
        const { name, value } = e.target;
        state.values[name] = value;
    });

    const { email, password } = state;
    const errorList = [];
    const formErrors = { ...state.values };
    console.log(formErrors);


    if(formErrors.emailError) {
        errorList.push(formErrors.emailError);
    }
    if(formErrors.passwordError) {
        errorList.push(formErrors.passwordError);
    } 

        return (
            <Container text>
                <Header as='h2'>Login</Header>
                <Form error={!!errorList.length}>
                    <Form.Field>
                        <Form.Input fluid label='Email' placeholder='Email...' name="email" value={email} onChange={(e) => handleChange(e, state)} />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input fluid label='Password' placeholder='Password...' name="password" type="password" value={password} onChange={(e) => handleChange(e, state)} />
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
