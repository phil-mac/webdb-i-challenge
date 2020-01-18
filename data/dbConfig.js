const knex = require('knex');

const configOptions = require('../knexfile.js');

module.exports = knex(configOptions.development);