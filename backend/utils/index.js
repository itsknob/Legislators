// backend/utils/index.js
// const fetch = require('node-fetch')
// const lowdb = require('lowdb')
// const FileSync = require('../node_modules/lowdb/adapters/FileSync')
// const JSDOM = require('jsdom')

import fetch from 'node-fetch'
// import lowdb from 'lowdb'
// import FileSync from '../node_modules/lowdb/adapters/FileSync.js'
import JSDOM from 'jsdom'
import mongoose from 'mongoose'
import keys from '../config/cred.js'
// import PersonSchema from '../models/person.js'

async function getMembers() {
  console.log('Updating Legislators')
  const connection = await mongoose.connect(
    `mongodb://${keys.database.dbuser}:${keys.database.dbpassword}@ds147354.mlab.com:47354/government`,
    {useNewUrlParser: true},
  )
  const db = connection.connection
  console.log('Connected to Database')

  db.on('error', console.error.bind(console, 'connection error:'))
  db.on('open', async () => {
    const Schema = mongoose.Schema
    const PersonSchema = new Schema(
      {
        personId: {
          bioguide: {
            type: 'String',
          },
          thomas: {
            type: 'Date',
          },
          lis: {
            type: 'String',
          },
          govtrack: {
            type: 'Number',
          },
          opensecrets: {
            type: 'String',
          },
          votesmart: {
            type: 'Number',
          },
          fec: {
            type: ['String'],
          },
          cspan: {
            type: 'Number',
          },
          wikipedia: {
            type: 'String',
          },
          house_history: {
            type: 'Number',
          },
          ballotpedia: {
            type: 'String',
          },
          maplight: {
            type: 'Number',
          },
          icpsr: {
            type: 'Number',
          },
          wikidata: {
            type: 'String',
          },
          google_entity_id: {
            type: 'String',
          },
        },
        name: {
          first: {
            type: 'String',
          },
          last: {
            type: 'String',
          },
          official_full: {
            type: 'String',
          },
        },
        bio: {
          birthday: {
            type: 'Date',
          },
          gender: {
            type: 'String',
          },
          religion: {
            type: 'String',
          },
        },
        terms: {
          type: ['Mixed'],
        },
      },
      {collection: 'Members'},
    )
    const Person = mongoose.model('Person', PersonSchema)

    console.log('Fetching new data')
    fetch(
      'https://theunitedstates.io/congress-legislators/legislators-current.json',
    )
      .then(results => {
        console.log('Fetched Legislators')
        return results.json()
      })
      .then(members => {
        console.log('Loading Legislators')
        members.forEach((member, index) => {
          console.log(`${index} of ${members.length}`)
          member.personId = member.id
          delete member.id
          console.log(JSON.stringify(member))
          // if (
          //   db
          //     .find()
          //     .where({
          //       name: {official_full: member.name.official_full},
          //     })
          //     .exists(true)
          // ) {
          //   console.log(`Updating ${member.name.official_full}`)
          //   // Update Current Model
          //   // Todo Fill in Update Code
          //   /*  let m = db.findOne({id: {govtrack: member.id.govtrack}})
          //   if(JSON.stringify(m) === JSON.stringify(member)) {
          //     continue
          //   } else {
          //     console.log(`Updating ${member.name.official_full}`)
          //     //m.update(member) field that needs to be updated
          //   } */
          // } else {
          let mem = new Person({...member})
          // Person.create(member, (err, m) => {
          //   if (err) console.log(err)
          // })
          mem.save()
          // }
        })
      })
      .then(() => {
        console.log('Updated Legislators')
        mongoose.disconnect()
      })
      .catch(error => {
        console.error(error)
      })
  })
}

async function getBios(id) {
  /*
  // DB Connection
  const adapter = new FileSync('../data/legislatorsCurrent.json')
  const db = lowdb(adapter)

  console.log('Updating Bios')

  // Get Members and MemberIds
  const members = db.get('Legislators')
  members = members.value()
  const memberIds = members.map('id[bioguide]')
  memberIds = memberIds.value()

  console.log(memberIds)

  // foreach MemberID get Bio, write bio to Member
  memberIds.forEach(async (memberId, index) => {
    const data = await fetch(
      'http://bioguide.congress.gov/scripts/biodisplay.pl?index=' + memberId,
    ).catch(err => {
      console.log('Could not find a matching id -- ' + err)
    })
    const html = await data.text().catch(() => {
      console.log('Could not convert text to html')
    })
    const dom = new JSDOM(html)
    const p = dom.window.document.querySelector('p').textContent

    db.get('Legislators')
      .find({id: {bioguide: memberId}})
      .set({bio: p})
      .write()
  })

  console.log('Updated Bios')

  return new Promise((res, rej) => {
    res(String(p))
    rej('Failed to getBio')
  }).catch(err => {
    console.log('Failed to get bio -- ' + err)
  })
  */
}

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
  const dom = new JSDOM(html)
  const p = dom.window.document.querySelector('p').textContent
  return new Promise((res, rej) => {
    res(String(p))
    rej('Failed to getBio')
  }).catch(err => {
    console.log('Failed to get bio -- ' + err)
  })
}

export {getMembers, getBios, getBio}
