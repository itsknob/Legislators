const person = require('express').Router();
const all = require('./all');                   // Returns all people
const single = require('./single');             // Returns person of {:ID}

// to be implemented for db access
function findObject(value) {
    return;
}

person.param('personId', findObject('person'));

person.get('/', all);
person.get('/:personId', single);

module.exports = person;
