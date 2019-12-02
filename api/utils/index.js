// Utils.js
const fetch = require('node-fetch')
const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

async function getMembers() {
  const adapter = new FileSync('../data/legislatorsCurrent.json')
  const db = lowdb(adapter)

  console.log('Updating Legislators')

  await fetch(
    'https://theunitedstates.io/congress-legislators/legislators-current.json',
  )
    .then(results => {
      return results.json()
    })
    .then(members => {
      for (let member in members) {
        db.get('legislators').push(member)
      }
      db.write()
    })
    .then(() => {
      console.log('Updated Legislators')
    })
}

async function getBios(id) {
  const adapter = new FileSync('../data/legislatorsCurrent.json')
  const db = lowdb(adapter)

  console.log('Updating Bios')

  const memberIds = db.get('Legislators').map('id[bioguide]')
  console.log(memberIds);

  memberIds.forEach((memberId) => {
    const data = await fetch(
      'http://bioguide.congress.gov/scripts/biodisplay.pl?index=' + memberId,
    ).catch(err => {
      console.log('Could not find a matching id -- ' + err)
    })
  })
      
  const html = await data.text().catch(() => {
    console.log('Could not convert text to html')
  })

  const dom = new JSDOM(html)
  const p = dom.window.document.querySelector('p').textContent
  // console.log(p);

  console.log('Updated Bios')

  return new Promise((res, rej) => {
    res(String(p))
    rej('Failed to getBio')
  }).catch(err => {
    console.log('Failed to get bio -- ' + err)
  })
}

module.exports = {
  getMembers,
  getBios,
}
