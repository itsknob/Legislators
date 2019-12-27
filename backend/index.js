import express from 'express'
import mongoose from 'mongoose'
import keys from './config/cred.js'
import routes from './routes/index.js'
import dotenv from 'dotenv'

// GraphQL
//const {ApolloServer, gql} = require('apollo-server-express')
//const {typeDefs, resolvers} = require('./schema')

// import ApolloExpress from 'apollo-server-express'
import ApolloServer from 'apollo-server-express'
// import gql from 'apollo-server-express'
import {typeDefs, resolvers} from './graphql/index.js'
import {getMembers, getBios, getBio} from './utils/index.js'
// import tools from 'graphql-tools'
// import bodyParser from 'body-parser'
// import Person from '../frontend/src/components/Staffers/PersonHook.js'
// import PersonList from '../frontend/src/components/Staffers/PersonList.js'
// import PersonSchema from './models/person.js'
import Person from './models/person.js'

// Environment Variables
dotenv.config()

//const {JSDOM} = jsdom
const app = express()
const port = 3001

/* Data Connections */
async function createConnection() {
  return await mongoose.connect(
    `mongodb://${keys.database.dbuser}:${keys.database.dbpassword}@ds147354.mlab.com:47354/government`,
    {useNewUrlParser: true, useUnifiedTopology: true},
  )
}
const connection = createConnection()
// const schema = {typeDefs, resolvers}

// GraphQL Server
//const {typeDef, resolvers} = Config
const server = new ApolloServer.ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    db: connection,
  }),
})
server.applyMiddleware({app, path: '/graphql'})

//const schema = {typeDefs, resolvers}

/* Fetch Data on Server Load */
if (!process.env.SKIP_STARTUP_FETCH) {
  async function updateApp() {
    // Members
    await getMembers(connection).catch(err => `Error getting Members: ${err}`)
    // Bios
    await getBios(connection).catch(err =>
      console.log(`Error getting Bios: ${err}`),
    )
  }
  updateApp()
}

/* Routes */
app.use('/', routes)

app.get('/legislator/:id', async (req, res) => {
  const resp = await Person.findOne({id: {govtrack: req.params.id}})
})
// app.get('/legislator/:id', async (req, res) => {
//   const para = await getBio(req.params.id)
//   res.send(para)
// })

app.listen(port, () => {
  console.log(`Listening on ${port}`)
  console.log(
    `🚀 GraphQL Server ready at http://localhost:${port}${server.graphqlPath}`,
  )
})
