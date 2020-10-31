import Schema from '../../models/person.js'
const {Person} = Schema

const resolvers = {
  Query: {
    getLegislators: (_parent, _args, _context) => {
      return Person.find()
    },
    getLegislatorById: async (_parent, {id}, _context) => {
      return await Person.find({'personId.govtrack': id})
    },
  },
}

export default resolvers
