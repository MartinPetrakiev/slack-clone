import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Routes from './routes';
import 'semantic-ui-css/semantic.min.css';
import registerService from './registerServiceWorker';

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
}

export default App;
