// todo: npm i node-cron fs
// todo: setup scrapers
// todo: https://scotch.io/tutorials/nodejs-cron-jobs-by-examples

// todo: pull JSON for legislators from api and update db
// todo: scrape bio and update db
// todo: set up cron

const cron = require('node-cron')
const fetch = require('node-fetch')
const lowdb = require('lowdb')
const _ = require('lodash')
const FileSync = require('lowdb/adapters/FileSync')

/*
function getPersonById(personId) {
  const adapter = new FileSync('./data/legislatorsCurrent.json')
  const db = lowdb(adapter)

  return db.get('legislators').find({id: {govtrack: personId}})
}
*/

// pull json form api
async function getCurrentLegislators() {
  const response = await fetch(
    'https://theunitedstates.io/congress-legislators/legislators-current.json',
  )
  const data = await response.json()

  return await data
}

// update db with data from API
/* data comes in as 
  [
    {
      id: {
        govtrack:0001
      }
    },
    {
      id: {
        govtrack:0002
      }
    },
    ...
  ]
*/

// todo: refactor to accept database
function addNewDataToDatabase(data) {
  // init db
  const adapter = new FileSync('./data/legislatorsCurrent.json')
  const db = lowdb(adapter)

  const legislators = data.legislators

  for (let legislator in legislators) {
    console.log(legislator)
    let legId = legislator.id.govtrack
    let curLeg = db.find({id: {govtrack: legId}})

    // assign to update
    curLeg
      .assign({id: legislator.id})
      .assign({name: legislator.name})
      .assign({bio: legislator.bio})
      .assign({terms: legislator.terms})

    if (legislator.leadership_roles) {
      curLeg.assign({leadership_roles: legislator.leadership_roles})
    }
    curLeg.write()
  }
}

function getAndSetCurrentLegislators(...data) {
  const curData = data['0'] | getCurrentLegislators()
  console.log(`Data: ${JSON.stringify(curData)}`)
  addNewDataToDatabase(curData)
  // * idea: add log, and update it after this runs.
}

const task = cron.schedule(
  '*/1 * * * *',
  () => {
    console.log('Running DB Update')
    getAndSetCurrentLegislators()
  },
  {scheduled: false},
)

console.log('Starting')
task.start()

module.exports = {
  addNewDataToDatabase: addNewDataToDatabase,
  getCurrentLegislators: getCurrentLegislators,
  getAndSetCurrentLegislators: getAndSetCurrentLegislators,
}
