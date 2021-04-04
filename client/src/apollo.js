import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    split
} from '@apollo/client';
import { ApolloLink } from 'apollo-link';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

//regular httpLink with authMiddleware
const httpLink = new HttpLink({ uri: 'http://localhost:8080/graphql' });
const authMiddleware = new ApolloLink((operation, forward) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    // add the authorization to the headers
    operation.setContext({
        headers: {
            'x-token': token ? token : "",
            'x-refresh-token': refreshToken ? refreshToken : "",
        }
    });

    return forward(operation);
});
const httpLinkWithMiddleware = authMiddleware.concat(httpLink);

//websocket and split to specify which link - when to use
const wsLink = new WebSocketLink({
    uri: 'ws://localhost:8080/subscriptions',
    options: {
        reconnect: true,
        connectionParams: {
            token: localStorage.getItem('token'),
            refreshToken: localStorage.getItem('refreshToken')
          },
    },
});
const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLinkWithMiddleware,
);

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
    partialResultsOnError: true
});

export default client;