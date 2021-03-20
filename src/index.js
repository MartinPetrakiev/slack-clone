import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
import { ApolloLink, concat } from 'apollo-link';

const httpLink = new HttpLink({ uri: 'http://localhost:8080/graphql' });

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('token');
//   const refreshToken = localStorage.getItem('refreshToken');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       'x-token': token ? `Bearer ${token}` : "",
//       'x-refresh-token': refreshToken ? `Bearer ${refreshToken}` : "",
//     }
//   }
// });

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
})

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
