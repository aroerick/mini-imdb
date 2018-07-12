const { gql } = require("apollo-server-express");

module.exports = gql`
  type Person {
    id: ID!
    name: String!
    birthday: String
    placeOfBirth: String
    bio: String
    filmography: [Movie]
  }
  type Movie {
    id: ID!
    title: String!
    releaseDate: String
    stars: [Person]
    director: Person
  }
  #   type Mutation {
  #     addPerson(
  #       name: String!
  #       birthday: String
  #       placeOfBirth: String
  #       bio: String
  #       filmography: [ID]
  #     ): Person
  #   }
  type Query {
    people: [Person]
    person(id: ID!): Person
    movies: [Movie]
    movie(id: ID!): Movie
  }
  input PersonInput {
    name: String!
    birthday: String
    placeOfBirth: String
    bio: String
    filmography: [ID]
  }
  type Mutation {
    addPerson(person: PersonInput!): Person
  }
`;
