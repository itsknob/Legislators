const jest = require('jest')
const data = require('legislatorsCurrent.json')

describe('database', () => {
  let db

  beforeAll(() => {
    const adapter = new FileSync('./data/legislatorsCurrent.json')
    db = lowdb(adapter)
  })

  test('Legislator Collection Exists', () => {
    expect(db.get('legislators')).not.toBe(undefined)
  })
})
