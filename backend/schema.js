import gql from 'graphql-tools'

const typeDefs = `
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => 'world',
  },
}

export {typeDefs, resolvers}
