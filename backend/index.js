//const fetch = require('./node_modules/node-fetch/lib')
//const express = require('./node_modules/express')
//const mongoose = require('mongoose')
//const {JSDOM} = require('./node_modules/jsdom/lib/api')
//const keys = require('./config/cred')
//const routes = require('./routes') // index.js

import fetch1 from 'node-fetch'
import express1 from 'express'
import mongoose1 from 'mongoose'
import JSDOM from 'jsdom'
import keys from './config/cred.js'
import routes from './routes/index.js'

// GraphQL
//const {ApolloServer, gql} = require('apollo-server-express')
//const {typeDefs, resolvers} = require('./schema')

import ApolloServer from 'apollo-server-express'
import gql from 'apollo-server-express'
import {typeDefs, resolvers} from './schema.js'

//const {JSDOM} = jsdom
const app = express1()
const port = 3001

mongoose1.connect(
  `mongodb://${keys.database.dbuser}:${
    keys.database.dbpassword
  }@ds147354.mlab.com:47354/government`,
)

// GraphQL Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
})
server.applyMiddleware({app})

app.use('/', routes1)

app.get('/legislator/:id', async (req, res) => {
  const para = await getBio(req.params.id)
  res.send(para)
})

async function getBio(id) {
  // work
  const data = await fetch1(
    'http://bioguide.congress.gov/scripts/biodisplay.pl?index=' + id,
  ).catch(err => {
    console.log('Could not find a matching id -- ' + err)
  })
  const html = await data.text().catch(() => {
    console.log('Could not convert text to html')
  })

  // scrape
  const dom = new JSDOM(html)
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
