// todo: npm i node-cron fs
// todo: setup scrapers
// todo: https://scotch.io/tutorials/nodejs-cron-jobs-by-examples

// todo: pull JSON for legislators from api and update db -- done
// todo: scrape bio and update db
// todo: set up cron -- done

const cron = require('../node_modules/node-cron/src/node-cron')
const fetch = require('../node_modules/node-fetch/lib')
const lowdb = require('../node_modules/lowdb')
const FileSync = require('../node_modules/lowdb/adapters/FileSync')

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
  return await response.json()
}

async function getLegislatorBioguide(id) {
  const url = `http://bioguide.congress.gov/scripts/biodisplay.pl?index=${id}`
  const resp = await fetch(url)
  const data = await resp.json()
  return data
}

// update db with data from API
/* data comes in as 
  [
    {
      id: { 
    {
      id: {
        govtrack:0002
      }
    },
    ...
  ]
*/

function addNewDataToDatabase(data) {
  // todo: extract db, pass as argument
  // init db

  // For Testing
  const cwd = process.cwd()
  console.log(process.cwd())
  if (cwd.search(/Project002$/) !== -1) {
    path = './backend/data/legislatorsCurrent.json'
  } else if (cwd.search(/backend$/) !== -1) {
    path = './data/legislatorsCurrent.json'
  } else if (cwd.search(/frontend$/) !== -1) {
    path = '../backend/data/legislatorsCurrent.json'
  } else {
    path = '../data/legislatorsCurrent.json'
  }
  const adapter = new FileSync(path)
  db = lowdb(adapter)

  const legislators = data.legislators

  for (let legislator in legislators) {
    console.log(legislator)
    let legId = legislator.id.govtrack
    let curLeg = db.find({id: {govtrack: legId}})
    let curLegBio = getLegislatorBioguide(legId)
    console.log(JSON.stringify(curLegBio))
    // assign to update
    curLeg
      .assign({id: legislator.id})
      .assign({name: legislator.name})
      .assign({bio: legislator.bio})
      .assign({terms: legislator.terms})
      .assign({biograph: curLegBio})

    if (legislator.leadership_roles) {
      curLeg.assign({leadership_roles: legislator.leadership_roles})
    }
    curLeg.write()
    console.log(JSON.stringify(curLeg))
  }
}

function updateLegislators() {
  const data = getCurrentLegislators()
  addNewDataToDatabase(data)
}

const task = cron.schedule(
  '*/1 * * * *',
  () => {
    console.log('Running DB Update')
    updateLegislators()
    console.log('Updated Legislators')
    // * idea: add log, and update it after this runs.
  },
  {scheduled: false},
)

console.log('Starting')
task.start()

module.exports = {
  addNewDataToDatabase: addNewDataToDatabase,
  getCurrentLegislators: getCurrentLegislators,
  updateLegislators: updateLegislators,
}
