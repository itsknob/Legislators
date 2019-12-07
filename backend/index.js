import fetch from 'node-fetch'
import express from 'express'
import mongoose from 'mongoose'
import JSDOM from 'jsdom'
import keys from './config/cred.js'
import routes from './routes/index.js'

// GraphQL
//const {ApolloServer, gql} = require('apollo-server-express')
//const {typeDefs, resolvers} = require('./schema')

import { ApolloServer } from 'apollo-server-express'
import { typeDefs, resolvers } from './graphql'
import cors from 'cors'

//const {JSDOM} = jsdom
const app = express()
const port = 3001

mongoose.connect(
  `mongodb://${keys.database.dbuser}:${keys.database.dbpassword}@ds147354.mlab.com:47354/government`,
)

// GraphQL Server
//const {typeDef, resolvers} = Config
const server = new ApolloServer({
  typeDefs,
  resolvers,
})
server.applyMiddleware({ app, path: '/graphql' })

app.use(cors())

app.use('/', routes)

app.get('/legislator/:id', async (req, res) => {
  const para = await getBio(req.params.id).catch((error) => {
    console.log("Failed to await bio: ", error);
  })
  res.send(para)
})

async function getBio(id) {
  // work
  const data = await fetch(
    'http://bioguide.congress.gov/scripts/biodisplay.pl?index=' + id,
  ).catch(err => {
    console.log('Could not find a matching id -- ' + err)
  })
  const html = await data.text().catch(() => {
    console.log('Could not convert text to html')
  })

  // scrape
  const dom = new JSDOM.JSDOM(html) // else, JSDOM is not a contstructor
  const p = dom.window.document.querySelector('p').textContent

  return new Promise((res, rej) => {
    res(String(p))
    rej('Failed to getBio')
  }).catch(err => {
    console.log('Failed to get bio -- ' + err)
  })
}

app.listen(port, () => {
  console.log(`Listening on ${port}`)
  console.log(
    `🚀 GraphQL Server ready at http://localhost:${port}${server.graphqlPath}`,
  )
})
