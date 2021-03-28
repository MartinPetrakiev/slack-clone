import React, { useState } from 'react';
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import slackLogo from '../styles/slack-logo.png';
import { Button, Form, Header, Message, Grid, Image, Segment } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../graphql/mutations';

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
        e.preventDefault();
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
                props.history.push('/team-select');
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
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        <Image src={slackLogo} /> Log-in to your account
                     </Header>
                    <Form size='large' error={!!errorList.length}>
                        <Segment stacked>
                            <Form.Input
                                error={!!formState.emailError}
                                fluid
                                icon='user'
                                iconPosition='left'
                                placeholder='E-mail address'
                                name="email"
                                value={email}
                                onChange={(e) => handleChange(e, formState)}
                            />
                            <Form.Input
                                error={!!formState.passwordError}
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                name="password"
                                value={password}
                                onChange={(e) => handleChange(e, formState)}
                            />
                            <Button
                                color='teal'
                                fluid size='large'
                                onClick={onSubmit}
                            >
                                Login
                             </Button>
                        </Segment>
                        <Message
                            error
                            list={errorList}
                        />
                    </Form>
                    <Message>
                        New to us? <a href='/register'>Register</a>
                    </Message>
                </Grid.Column>
            </Grid>
    );
});

export default Login;
