import Schema from '../../models/person.js'
// import lowdb from 'lowdb'
// import FileSync from 'lowdb/adapters/FileSync.js'

// const adapter = new FileSync('./data/legislatorsCurrent.json')
// const db = lowdb(adapter)

// const connection = mongoose
//   .connect(
//     `mongodb://${keys.database.dbuser}:${keys.database.dbpassword}@ds147354.mlab.com:47354/government`,
//     {useNewUrlParser: true},
//   )
//   .catch(err => {
//     if (err) console.log(err)
//   })
// const db = connection.connection

const resolvers = {
  Query: {
    getLegislators: (parent, _, context) => {
      return Schema.Person.find()
      // return db.get('legislators').value()
    },
    getLegislatorById: (parent, {id}, context) => {
      const p = context.db
        .get('legislators')
        .find({personId: {govtrack: id}})
        .value()
      return p
    },
  },
}

export default resolvers
