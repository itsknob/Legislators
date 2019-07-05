const person = require('../../node_modules/express').Router()
// const all = require('./all');                   // Returns all people
// const single = require('./single');             // Returns person of {:ID}
const lowdb = require('../../node_modules/lowdb')
const FileSync = require('../../node_modules/lowdb/adapters/FileSync')

function getPersonById(personId) {
  const adapter = new FileSync('./data/legislatorsCurrent.json')
  const db = lowdb(adapter)

  return db.get('legislators').find({id: {govtrack: personId}})
}

person.get('/all', (req, res) => {
  const adapter = new FileSync('./data/legislatorsCurrent.json')
  const db = lowdb(adapter)

  res.send(db.get('legislators'))
})
person.get('/:personId', (req, res) => {
  const value = getPersonById(Number(req.params.personId))

  res.send(value)
})

person.get('/', (req, res) => {
  res.status(200).json({message: 'Connected!'})
})

module.exports = person
