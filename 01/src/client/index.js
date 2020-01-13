import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, HttpLink, InMemoryCache, gql, ApolloProvider, useQuery } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:3030/graphql'
  })
});

client
  .query({
    query: gql`
      {
        users {
          id
          name
          age
        }
      }
    `
  })
  .then(result => {
    console.log(result);
  });

const users = gql`
  {
    users {
      id
      name
      age
    }
  }
`;

const ToDo = () => {
  const { loading, error, data } = useQuery(users);

  console.log(loading, error, data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return data.todos.map(todo => {
    return (
      <div key={todo.id}>
        <p>{todo.name}</p>
        <p>{todo.age}</p>
      </div>
    );
  });
};

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h1>React</h1>
      <ToDo />
    </div>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.querySelector('#app'));
