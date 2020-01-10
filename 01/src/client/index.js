import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, HttpLink, InMemoryCache, gql, ApolloProvider, useQuery } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:3030/graphql'
  })
});

console.log(client);

client
  .query({
    query: gql`
      {
        todos {
          id
          title
        }
      }
    `
  })
  .then(result => {
    console.log(result);
  });

const TODO_ALL = gql`
  {
    todos {
      id
      title
      description
      deadline
      isComplete
    }
  }
`;

const ToDo = () => {
  const { loading, error, data } = useQuery(TODO_ALL);

  console.log(loading, error, data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return data.todos.map(todo => {
    return (
      <div key={todo.id}>
        <p>{todo.title}</p>
        <p>{todo.description}</p>
        <input type="date" readOnly disabled value={todo.deadline} />
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
