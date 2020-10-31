// backend/utils/index.js
// const fetch = require('node-fetch')
// const lowdb = require('lowdb')
// const FileSync = require('../node_modules/lowdb/adapters/FileSync')
// const JSDOM = require('jsdom')

import fetch from 'node-fetch'
// import lowdb from 'lowdb'
// import FileSync from '../node_modules/lowdb/adapters/FileSync.js'
import jsdom from 'jsdom'
import mongoose from 'mongoose'
import keys from '../config/cred.js'
import models from '../models/person.js'
const { Person, PersonSchema } = models
const { JSDOM } = jsdom

async function getMembers(connection) {
  console.log('Updating Legislators')

  console.log('Fetching new data')
  const results = await fetch(
    'https://theunitedstates.io/congress-legislators/legislators-current.json',
  )

  console.log('Fetched Legislators')
  const members = await results.json()

  members.forEach((member, index) => {
    process.stdout.write(
      `Loading Legislators ${index} of ${members.length - 1} \r`,
    )
    // Update 'id' field to 'personId'
    member.personId = member.id
    delete member.id

    // Update Database
    Person.updateOne(
      { 'personId.govtrack': member.personId.govtrack }, // condition
      member, //update
      { upsert: true }, //options
      (err) => {
        // callback
        if (err)
          console.log(
            `Error: Could not update member with GovtrackId: ${member.personId.govtrack}`,
          )
      },
    )
  })
  console.log('\nUpdated Legislators')
}

async function getBios() {
  console.log('Getting Members')
  let p
  const legislators = await Person.find().catch((err) => {
    throw err
  })
  // foreach MemberID get Bio, write bio to Member
  try {
    legislators.forEach(async (member, index) => {
      // console.log(member.personId.bioguide)

      // Fetch Page
      const data = await fetch(
        'https://bioguideretro.congress.gov/Home/MemberDetails?memIndex=' +
          member.personId.bioguide,
      ).catch((err) => {
        console.log(
          'Could not find a matching id -- ' +
            err +
            ` -- ID: ${member.personId.bioguide}`,
        )
        throw err
      })

      // Get the biography html
      const html = await data.text().catch(() => {
        console.log('Could not convert text to html')
        throw err
      })

      // Scrape the text
      const dom = new JSDOM(html)
      try {
        p = dom.window.document.querySelector('biography')
        if (p !== null) p = p.innerText
        else p = 'No Bio'
      } catch (err) {
        console.log(`Error trying to parse text content from bio: ${err}`)
        p = 'No Bio'
        throw err
      }

      // Update DB
      Person.updateOne(
        { 'personId.govtrack': member.personId.govtrack }, // condition
        { 'bio.biography': p }, // update
        { upsert: true }, // options
      ).catch((err) => console.log(err))
    })
  } catch (e) {
    console.log(e)
  }

  console.log('Updated Bios')

  return p
}

async function getBio(id) {
  // work
  const data = await fetch(
    'http://bioguide.congress.gov/scripts/biodisplay.pl?index=' + id,
    { redirect: 'follow', mode: 'no-cors' },
  ).catch((err) => {
    console.log('Could not find a matching id -- ' + err)
  })
  console.log(data)
  const html = await data.text().catch(() => {
    console.log('Could not convert text to html')
  })
  // scrape
  const dom = new JSDOM(html)
  const p = dom.window.document.querySelector('p').textContent
  return new Promise((res, rej) => {
    res(String(p))
    rej('Failed to getBio')
  }).catch((err) => {
    console.log('Failed to get bio -- ' + err)
  })
}

export { getMembers, getBios, getBio }
