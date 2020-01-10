const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type ToDo {
    id: Int!
    title: String!
    description: String
    deadline: String
    isComplete: Boolean
  }

  type Query {
    todos: [ToDo]
  }
`;

module.exports = typeDefs;
