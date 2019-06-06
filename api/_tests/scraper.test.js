const jest = require('jest')
const scrape = require('../utils/scraper')

// todo: test functions from scraper.js

// todo: fix tests (find types?)
test('API is reachable', () => {
  expect(scrape.getCurrentLegislators()).not.toBe(undefined)
})
