const fetch = require('node-fetch')
const jsdom = require('jsdom')
const {JSDOM} = jsdom
const express = require('express')
const routes = require('./routes') // index.js
const mongoose = require('mongoose')
const app = express()
const keys = require('./config/cred')
const port = 3001

mongoose.connect(
  `mongodb://${keys.database.dbuser}:${
    keys.database.dbpassword
  }@ds147354.mlab.com:47354/government`,
)

app.use('/', routes)

app.get('/senator/:id', async (req, res) => {
  const para = await getBio(req.params.id)
  // console.log(typeof para);

  // console.log(`Para: ${para}`);

  res.send(para)
})

async function getBio(id) {
  const data = await fetch(
    'http://bioguide.congress.gov/scripts/biodisplay.pl?index=' + id,
  ).catch(err => {
    console.log('Could not find a matching id -- ' + err)
  })
  const html = await data.text().catch(() => {
    console.log('Could not convert text to html')
  })
  const dom = new JSDOM(html)
  const p = dom.window.document.querySelector('p').textContent
  // console.log(p);

  return new Promise((res, rej) => {
    res(String(p))
    rej('Failed to getBio')
  }).catch(err => {
    console.log('Failed to get bio -- ' + err)
  })
}

app.listen(port, () => console.log(`Listening on ${port}`))
