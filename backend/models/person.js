const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Person = new Schema({
    id: {
        bioguide: {
            type: 'String'
        },
        thomas: {
            type: 'Date'
        },
        lis: {
            type: 'String'
        },
        govtrack: {
            type: 'Number'
        },
        opensecrets: {
            type: 'String'
        },
        votesmart: {
            type: 'Number'
        },
        fec: {
            type: [
                'String'
            ]
        },
        cspan: {
            type: 'Number'
        },
        wikipedia: {
            type: 'String'
        },
        house_history: {
            type: 'Number'
        },
        ballotpedia: {
            type: 'String'
        },
        maplight: {
            type: 'Number'
        },
        icpsr: {
            type: 'Number'
        },
        wikidata: {
            type: 'String'
        },
        google_entity_id: {
            type: 'String'
        }
    },
    name: {
        first: {
            type: 'String'
        },
        last: {
            type: 'String'
        },
        official_full: {
            type: 'String'
        }
    },
    bio: {
        birthday: {
            type: 'Date'
        },
        gender: {
            type: 'String'
        },
        religion: {
            type: 'String'
        }
    },
    terms: {
        type: [
            'Mixed'
        ]
    }
});

const PersonModel = mongoose.model('PersonModel', Person);