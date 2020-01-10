const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./typedefs");
const resolvers = require("./resolvers");

const app = express();
const PORT = 3030;
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app, path: "/graphql" });

app.listen(PORT, () =>
  console.log(`Server ready at http://localhost:3030${server.graphqlPath}`)
);
