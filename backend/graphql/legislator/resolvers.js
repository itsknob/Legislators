import lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync.js'

// const adapter = new FileSync('./data/legislatorsCurrent.json')
// const db = lowdb(adapter)

const resolvers = {
  Query: {
    getLegislators: () => {
      return db.get('legislators').value()
    },
    getLegislatorById: (parent, {id}) => {
      const p = db
        .get('legislators')
        .find({id: {govtrack: id}})
        .value()
      return p
    },
  },
}

export default resolvers
