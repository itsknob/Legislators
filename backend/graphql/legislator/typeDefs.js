import gql from 'graphql-tag'

const typeDefs = gql`
  type Query {
    getLegislators: [Legislator]
    getLegislatorById(personId: Int!): Legislator
  }
  type Legislator {
    personId: Id
    name: Name
    bio: Bio
    terms: [Terms]
  }
  type Id {
    bioguide: String
    thomas: String
    lis: String
    govtrack: Int
    opensecrets: String
    votesmart: Int
    fec: [String]
    cspan: Int
    wikipedia: String
    house_history: Int
    ballotpedia: String
    maplight: Int
    icpsr: Int
    google_entity_id: String
  }
  type Name {
    first: String
    last: String
    official_full: String
  }
  type Bio {
    birthday: String
    gender: String
  }
  type Terms {
    type: String
    start: String
    end: String
    state: String
    district: Int
    party: String
    class: Int
    url: String
    address: String
    phone: String
    fax: String
    contact_form: String
    office: String
  }
`

export default typeDefs
