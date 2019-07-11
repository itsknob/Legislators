// const routes = require('../node_modules/express').Router()
// const person = require('./person')

import Router from 'express'
import person from './person/index.js'

const routes = Router()

routes.use('/person', person)

routes.get('/', (req, res) => {
  res.status(200).json({message: 'Connected!'})
})

export default routes
