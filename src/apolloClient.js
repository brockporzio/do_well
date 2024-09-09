import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_HASURA_ENDPOINT,
});

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the admin secret from environment variables
  const token = process.env.REACT_APP_HASURA_ADMIN_SECRET;

  console.log("%c: token ", "color: red;", token)
  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      'x-hasura-admin-secret': token,
    }
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
