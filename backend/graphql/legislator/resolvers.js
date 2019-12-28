import Schema from '../../models/person.js'
const {Person} = Schema

const resolvers = {
  Query: {
    getLegislators: (parent, _, context) => {
      return Person.find()
    },
    getLegislatorById: async (parent, {id}, context) => {
      return await Person.find({'personId.govtrack': id})
    },
  },
}

export default resolvers
