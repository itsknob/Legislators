//const jest = require('jest')
const scrape = require('../utils/scraper')
const lowdb = require('../node_modules/lowdb')
const FileSync = require('../node_modules/lowdb/adapters/FileSync')

// todo: test functions from scraper.js

const nancyTest = {
  id: {
    bioguide: 'P000197',
    thomas: '00905',
    govtrack: 400314,
    opensecrets: 'N00007360',
    votesmart: 26732,
    icpsr: 15448,
    fec: ['H8CA05035'],
    cspan: 6153,
    wikipedia: 'Nancy Pelosi',
    house_history: 19519,
    ballotpedia: 'Nancy Pelosi',
    maplight: 408,
    wikidata: 'Q170581',
    google_entity_id: 'kg:/m/012v1t',
  },
  name: {
    first: 'Nancy',
    last: 'Test',
    official_full: 'Nancy Test',
  },
  bio: {
    birthday: '1940-03-26',
    gender: 'F',
  },
  leadership_roles: [
    {
      title: 'House Minority Leader',
      chamber: 'house',
      start: '2011-01-05',
      end: '2013-01-03',
    },
    {
      title: 'House Minority Leader',
      chamber: 'house',
      start: '2013-01-03',
      end: '2015-01-03',
    },
    {
      title: 'House Minority Leader',
      chamber: 'house',
      start: '2015-01-06',
      end: '2017-01-03',
    },
    {
      title: 'House Minority Leader',
      chamber: 'house',
      start: '2017-01-03',
      end: '2019-01-03',
    },
    {
      title: 'Speaker of the House',
      chamber: 'house',
      start: '2019-01-03',
    },
  ],
  terms: [
    {
      type: 'rep',
      start: '1987-01-06',
      end: '1989-01-03',
      state: 'CA',
      district: 5,
      party: 'Democrat',
    },
    {
      type: 'rep',
      start: '1989-01-03',
      end: '1991-01-03',
      state: 'CA',
      district: 5,
      party: 'Democrat',
    },
    {
      type: 'rep',
      start: '1991-01-03',
      end: '1993-01-03',
      state: 'CA',
      district: 5,
      party: 'Democrat',
    },
    {
      type: 'rep',
      start: '1993-01-05',
      end: '1995-01-03',
      state: 'CA',
      district: 8,
      party: 'Democrat',
    },
    {
      type: 'rep',
      start: '1995-01-04',
      end: '1997-01-03',
      state: 'CA',
      district: 8,
      party: 'Democrat',
    },
    {
      type: 'rep',
      start: '1997-01-07',
      end: '1999-01-03',
      state: 'CA',
      district: 8,
      party: 'Democrat',
    },
    {
      type: 'rep',
      start: '1999-01-06',
      end: '2001-01-03',
      state: 'CA',
      district: 8,
      party: 'Democrat',
    },
    {
      type: 'rep',
      start: '2001-01-03',
      end: '2003-01-03',
      state: 'CA',
      district: 8,
      party: 'Democrat',
    },
    {
      type: 'rep',
      start: '2003-01-07',
      end: '2005-01-03',
      state: 'CA',
      district: 8,
      party: 'Democrat',
      url: 'http://www.house.gov/pelosi',
    },
    {
      type: 'rep',
      start: '2005-01-04',
      end: '2007-01-03',
      state: 'CA',
      district: 8,
      party: 'Democrat',
      url: 'http://www.house.gov/pelosi',
    },
    {
      type: 'rep',
      start: '2007-01-04',
      end: '2009-01-03',
      state: 'CA',
      district: 8,
      party: 'Democrat',
      url: 'http://www.house.gov/pelosi',
    },
    {
      type: 'rep',
      start: '2009-01-06',
      end: '2011-01-03',
      state: 'CA',
      district: 8,
      party: 'Democrat',
      url: 'http://www.house.gov/pelosi',
    },
    {
      type: 'rep',
      start: '2011-01-05',
      end: '2013-01-03',
      state: 'CA',
      district: 8,
      party: 'Democrat',
      url: 'http://www.house.gov/pelosi',
      address: '235 Cannon HOB; Washington DC 20515-0508',
      phone: '202-225-4965',
      fax: '202-225-8259',
      contact_form: 'http://www.house.gov/pelosi/contact/contact.html',
      office: '235 Cannon House Office Building',
    },
    {
      type: 'rep',
      start: '2013-01-03',
      end: '2015-01-03',
      state: 'CA',
      party: 'Democrat',
      district: 12,
      url: 'http://pelosi.house.gov',
      address: '235 Cannon HOB; Washington DC 20515-0512',
      phone: '202-225-4965',
      fax: '202-225-8259',
      contact_form: 'http://pelosi.house.gov/contact-me/email-me',
      office: '235 Cannon House Office Building',
      rss_url: 'http://pelosi.house.gov/atom.xml',
    },
    {
      type: 'rep',
      start: '2015-01-06',
      end: '2017-01-03',
      state: 'CA',
      party: 'Democrat',
      district: 12,
      url: 'http://pelosi.house.gov',
      address: '233 Cannon HOB; Washington DC 20515-0512',
      phone: '202-225-4965',
      fax: '202-225-8259',
      contact_form: 'http://pelosi.house.gov/contact-me/email-me',
      office: '233 Cannon House Office Building',
      rss_url: 'http://pelosi.house.gov/atom.xml',
    },
    {
      type: 'rep',
      start: '2017-01-03',
      end: '2019-01-03',
      state: 'CA',
      district: 12,
      party: 'Democrat',
      phone: '202-225-4965',
      url: 'https://pelosi.house.gov',
      rss_url: 'http://pelosi.house.gov/atom.xml',
      address: '233 Cannon House Office Building; Washington DC 20515-0512',
      office: '233 Cannon House Office Building',
      fax: '202-225-8259',
    },
    {
      type: 'rep',
      start: '2019-01-03',
      end: '2021-01-03',
      state: 'CA',
      district: 12,
      party: 'Democrat',
      phone: '202-225-4965',
      address: '1236 Longworth House Office Building; Washington DC 20515-0512',
      office: '1236 Longworth House Office Building',
      url: 'https://pelosi.house.gov',
      rss_url: 'http://pelosi.house.gov/atom.xml',
    },
  ],
  family: [
    {
      name: 'Thomas D?Alesandro Jr.',
      relation: 'daughter',
    },
  ],
}

describe('scraper utility', () => {
  let db
  let path

  beforeEach(() => {
    // todo: mock testing item with necessary fields
    // * Nancy has all of the top level fields available.

    // path is releative to CWD no code
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
  })

  afterEach(() => {
    try {
      db.get('legislators')
        .remove({name: {official_full: 'Nancy Test'}})
        .write()
    } catch (e) {
      console.log("Couldn't remove mock data.")
      console.log(`Error: ${e}`)
    }
  })

  test('Add to Database adds correctly (Data is transformed correctly)', () => {
    db.get('legislators')
      .push(nancyTest)
      .write()

    const result = db
      .get('legislators')
      .find({name: {official_full: 'Nancy Test'}})
      .value()

    expect(result).not.toBe(undefined)
  })

  // ! outside of my scope, no control over this endpoint (mock?)
  test('getCurrentLegislators is able to retrieve information', async () => {
    const data = await scrape.getCurrentLegislators()
    expect(data).not.toBe(undefined)
    expect(data[0]).toHaveProperty('id')
  })

  test('addNewDataToDatabase correctly adds item to database', () => {
    // todo: test scrape.addNewDataToDatabase
    const mockDataArray = {legislators: [nancyTest]}
    scrape.addNewDataToDatabase([mockDataArray])

    expect(
      db.get('legislators').find({name: {official_full: 'Nancy Test'}}),
    ).not.toBe(undefined)
  })

  test('updateLegislators correctly adds item to database', () => {
    scrape.updateLegislators()
    expect(
      db.get('legislators').find({name: {official_full: 'Nacny Pelosi'}}),
    ).not.toBe(undefined)
  })
})
