import express from 'express'
import mongoose from 'mongoose'
import keys from './config/cred.js'
import routes from './routes/index.js'

// GraphQL
//const {ApolloServer, gql} = require('apollo-server-express')
//const {typeDefs, resolvers} = require('./schema')

import ApolloExpress from 'apollo-server-express'
import {ApolloServer} from 'apollo-server-express'
import gql from 'apollo-server-express'
import {typeDefs, resolvers} from './graphql'
import {getMembers, getBios, getBio} from './utils/index.js'
import tools from 'graphql-tools'
import bodyParser from 'body-parser'

//const {JSDOM} = jsdom
const app = express()
const port = 3001

// GraphQL Server
//const {typeDef, resolvers} = Config
const server = new ApolloServer({
  typeDefs,
  resolvers,
})
server.applyMiddleware({app, path: '/graphql'})

/* Data Connections */
const connection = mongoose
  .connect(
    `mongodb://${keys.database.dbuser}:${keys.database.dbpassword}@ds147354.mlab.com:47354/government`,
    {useNewUrlParser: true},
  )
  .then(con => con)

const schema = {typeDefs, resolvers}

/* Fetch Data on Server Load */
// Members
getMembers()

// Bios
//getBios()

/* Routes */
app.use('/', routes)

app.get('/legislator/:id', async (req, res) => {
  const para = await getBio(req.params.id)
  res.send(para)
})

app.listen(port, () => {
  console.log(`Listening on ${port}`)
  console.log(
    `🚀 GraphQL Server ready at http://localhost:${port}${server.graphqlPath}`,
  )
})
