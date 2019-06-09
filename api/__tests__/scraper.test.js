//const jest = require('jest')
const scrape = require('../utils/scraper')
const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

// todo: test functions from scraper.js

// todo: fix tests (find types?)
describe('scraper utility', () => {
  beforeAll(() => {
    const adapter = new FileSync('./data/legislatorsCurrent.json')
    const db = lowdb(adapter)
  })

  beforeEach(() => {
    // todo: mock testing item with necessary fields
  })

  afterEach(() => {
    // todo: remove testing item from database
  })

  describe('basic operations', () => {
    test('Add to Database adds correctly', () => {
      // todo: add testing item to
    })
  })

  test('getCurrentLegislators is able to retrieve information', () => {
    expect(scrape.getCurrentLegislators()).not.toBe(undefined)
  })

  test('addNewDataToDatabase correctly adds item to database', () => {
    // todo: test scrape.addNewDataToDatabase
  })

  test('getAndSetCurrentLegislators correctly formats and adds', () => {
    // todo: integration test?
  })
})
