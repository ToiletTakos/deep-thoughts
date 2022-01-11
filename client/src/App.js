import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';

// new link to the GraphQl server at its graphql endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

//use ApolloClient() constructor to instantiate the Apollo Client instance and create the connection to the Api endpoint.
//we also instantiate a new cache object
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    // wrap all JSX code with the <ApolloProvider> because we are passing the client variable in as the value for client prop in the provider
    // everything else with have access to the server's API data through the client we set up.
    <ApolloProvider client={client}>
      <div className='flex-column justify-flex-start min-100-vh'>
        <Header />
        <div className='container'>
          <Home />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
