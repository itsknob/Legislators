//const {Schema, model} = require('mongoose')
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const PersonSchema = new Schema(
  {
    personId: {
      bioguide: {
        type: 'String',
      },
      thomas: {
        type: 'Date',
      },
      lis: {
        type: 'String',
      },
      govtrack: {
        type: 'Number',
      },
      opensecrets: {
        type: 'String',
      },
      votesmart: {
        type: 'Number',
      },
      fec: {
        type: ['String'],
      },
      cspan: {
        type: 'Number',
      },
      wikipedia: {
        type: 'String',
      },
      house_history: {
        type: 'Number',
      },
      ballotpedia: {
        type: 'String',
      },
      maplight: {
        type: 'Number',
      },
      icpsr: {
        type: 'Number',
      },
      wikidata: {
        type: 'String',
      },
      google_entity_id: {
        type: 'String',
      },
    },
    name: {
      first: {
        type: 'String',
      },
      last: {
        type: 'String',
      },
      official_full: {
        type: 'String',
      },
    },
    bio: {
      birthday: {
        type: 'Date',
      },
      gender: {
        type: 'String',
      },
      religion: {
        type: 'String',
      },
    },
    terms: {
      type: ['Mixed'],
    },
  },
  {collection: 'Members'},
)

//const Person = mongoose.model('Person', PersonSchema)

// module.exports = {
//   PersonModel: PersonModel,
// }
export default {PersonSchema}
