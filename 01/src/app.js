const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./typedefs");
const resolvers = require("./resolvers");

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: 3030 }, () =>
  console.log(`Server ready at http://localhost:3030${server.graphqlPath}`)
);
