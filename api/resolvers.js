const data = require("./data");
const resolvers = {
  Query: {
    movies() {
      return data.movies;
    },
    people() {
      return data.people;
    },
    person(root, { id }) {
      return data.people.find(person => person.id === parseInt(id));
    },
    movie(root, { id }) {
      return data.movies.find(movie => movie.id === parseInt(id));
    }
  },
  Mutation: {
    addPerson(root, variables, context, info) {
      const newPerson = {
        id: data.people.length + 1,
        ...variables.person
      };
      data.people.push(newPerson);
      return newPerson;
    }
  },
  Movie: {
    director(movie) {
      if (!movie.director) return null;
      return data.people.find(person => person.id === movie.director);
    },
    stars(movie) {
      return data.people.filter(person =>
        person.filmography.find(
          credit => credit === movie.id && person.id !== movie.director
        )
      );
    }
  },
  Person: {
    filmography(person) {
      return data.movies.filter(movie => {
        if (person.id === movie.director) {
          return movie;
        } else {
          return movie.stars.find(star => star === person.id);
        }
      });
    }
  }
};
module.exports = resolvers;
