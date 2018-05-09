const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '106.15.230.136',
    user: 'super',
    password: 'zhazhahui',
    database: 'supermall'
  }
})

module.exports = knex
