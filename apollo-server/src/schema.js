const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type League {
    id: ID!
    name: String!
    shortName: String!
    sportType: String!
    title: String!
    createdAt: String!
    deletedAt: String
    updatedAt: String
  }

  type Team {
    id: ID!
    league: League!
    name: String!
    shortName: String!
    createdAt: String!
    deletedAt: String
    updatedAt: String
  }

  type Query {
    leagues: [League!]!
    teams: [Team!]!
  }
`;

module.exports = typeDefs;
