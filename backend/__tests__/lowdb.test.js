const data = require('../data/legislatorsCurrent.json')
const FileSync = require('../node_modules/lowdb/adapters/FileSync')
const lowdb = require('../node_modules/lowdb')

describe('database', () => {
  let db

  beforeAll(() => {
    const adapter = new FileSync(`../data/legislatorsCurrent.json`)
    db = lowdb(adapter)
  })

  test('Legislator Collection Exists', () => {
    expect(db.has('legislators').value()).toBe(true)
  })

  describe('database items', () => {
    let legs

    beforeAll(() => {
      legs = db.get('legislators')
    })

    test('All Legislators contain ID', () => {
      expect(
        legs.value().every(i => {
          return Object.keys(i).includes('id')
        }),
      ).toBe(true)
    })

    test('All Legislators contain ID -> Govtrack', () => {
      expect(
        legs.value().every(leg => {
          return Object.keys(leg.id).includes('govtrack')
        }),
      ).toBe(true)
    })
  })
})

// todo GetBio / Route Operations / Add (and) Delete
