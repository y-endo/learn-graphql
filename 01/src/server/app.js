const express = require('express');
const { ApolloServer, PubSub } = require('apollo-server-express');
const http = require('http');
const typeDefs = require('./typedefs');
const resolvers = require('./resolvers');

const app = express();
const port = 3030;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { pubsub: new PubSub() }
});
server.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port }, () => {
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
});
