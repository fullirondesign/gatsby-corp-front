import ApolloClient from 'apollo-boost';
import fetch from 'isomorphic-fetch';

export const client = new ApolloClient({

  uri: 'https://fulliron.herokuapp.com/graphql',
  
  fetch,
    fetchOptions: {
    mode: 'cors',
  },
});