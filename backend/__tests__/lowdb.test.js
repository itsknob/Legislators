const FileSync = require('../node_modules/lowdb/adapters/FileSync')
const lowdb = require('../node_modules/lowdb')

describe('database', () => {
  let db
  let path

  beforeEach(() => {
    // path is releative to CWD no code
    const cwd = process.cwd()
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
