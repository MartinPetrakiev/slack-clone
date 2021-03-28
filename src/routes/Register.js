import React, { useState } from 'react';
import { Button, Form, Header, Message, Grid, Image, Segment } from 'semantic-ui-react';
import slackLogo from '../styles/slack-logo.png';
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
        e.preventDefault();
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
                    props.history.push('/login');
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
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    <Image src={slackLogo} /> Register
                             </Header>
                <Form size='large' error={!!errorList.length}>
                    <Segment stacked>
                        <Form.Input
                            error={!!usernameError}
                            fluid
                            icon='user'
                            iconPosition='left'
                            placeholder='Username'
                            name="username"
                            value={username}
                            onChange={handleChange}
                        />
                        <Form.Input
                            error={!!emailError}
                            fluid
                            icon='mail'
                            iconPosition='left'
                            placeholder='Email'
                            name="email"
                            value={email}
                            onChange={handleChange}
                        />
                        <Form.Input
                            error={!!passwordError}
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            name="password"
                            value={password}
                            onChange={handleChange}
                        />
                        <Form.Input
                            error={!!rePasswordError}
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Confirm password'
                            type='password'
                            name="rePassword"
                            value={rePassword}
                            onChange={handleChange}
                        />
                        <Button
                            color='teal'
                            fluid size='large'
                            onClick={onSubmit}
                        >
                            Register
                                     </Button>
                    </Segment>
                    <Message
                        error
                        list={errorList}
                    />
                </Form>
                <Message>
                    Already have account? <a href='/login'>Login</a>
                </Message>
            </Grid.Column>
        </Grid>
    );
}

export default Register;
