const routes = require('../node_modules/express').Router();
const person = require('./person');

routes.use('/person', person);

routes.get('/', (req, res) => {
    res.status(200).json({message: "Connected!" });
});

module.exports = routes;