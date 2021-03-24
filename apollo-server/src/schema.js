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

  type Article {
    createdAt: String
    deletedAt: String
    updatedAt: String
    id: ID
    league: League!
    team: Team!
    imageUrlString: String
    body: String
    title: String
  }

  type Query {
    leagues: [League!]!
    teams: [Team!]!
    articles(args : [String!]): [Article!]!
  }
`;

module.exports = typeDefs;
