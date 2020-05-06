// const person = require('../../node_modules/express').Router()
// const all = require('./all');                   // Returns all people
// const single = require('./single');             // Returns person of {:ID}
// const lowdb = require('../../node_modules/lowdb')
// const FileSync = require('../../node_modules/lowdb/adapters/FileSync')

import Router from 'express'
// import lowdb from 'lowdb'
// import FileSync from 'lowdb'
import models from '../../models/person.js'
const {Person} = models
const person = Router()

/**
 * Use GovTrack ID to get Legislator
 * @param {*} personId
 */
async function getPersonById(personId) {
  //const adapter = new FileSync('./data/legislatorsCurrent.json')
  //const db = lowdb(adapter)

  // const connection = mongoose
  //   .connect(
  //     `mongodb://${keys.database.dbuser}:${keys.database.dbpassword}@ds147354.mlab.com:47354/government`,
  //     {useNewUrlParser: true},
  //   )
  //   .catch(err => {
  //     if (err) console.log(err)
  //   })
  // const db = connection.connection
  // console.log('Connected to Database')

  // db.on('error', console.error.bind(console, 'connection error:'))
  // db.on('open', async () => {
  // const Person = mongoose.model('Person')
  // })
  // todo: change these methods over to Mongoose calls
  return await Person.findOne({personId: {govtrack: personId}})
  // return db.get('legislators').find({id: {govtrack: personId}})
}

person.get('/all', async (req, res) => {
  // const adapter = new FileSync('./data/legislatorsCurrent.json')
  // const db = lowdb(adapter)

  // res.send(db.get('legislators'))
  res.send(await Person.find({}))
})
person.get('/:personId', async (req, res) => {
  const value = await getPersonById(Number(req.params.personId))

  res.send(value)
})

person.get('/', (req, res) => {
  res.status(200).json({message: 'Connected!'})
})

export default person
