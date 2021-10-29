const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    _id: ID
    authors: String
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  type Profile {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]!
  }

  type Auth {
    token: ID!
    profile : Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    me: Profile
  }

  type Mutation {
    createProfile(profilename: String!, email: String!, password: String!) : Auth
    login(email: String!, password: String!) : Auth
    saveBook(profileId: ID!, savedBook: Array!): Profile
    deleteBook(savedBook: Array!): Profile
  }
`;

module.exports = typeDefs;
