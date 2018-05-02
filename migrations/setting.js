const expressKnex = require('knex')

const knex = expressKnex({
  client: 'mysql',
  connection: {
    host: '106.15.230.136',
    user: 'super',
    password: 'zhazhahui',
    database: 'supermall'
  }
})

module.exports = knex
