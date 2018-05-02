const expressKnex = require('knex')

const knex = expressKnex({
  client: 'mysql',
  connection: {
    host: '106.15.230.136',
    user: 'aj_dev',
    password: 'zhazhahui',
    database: 'aj'
  }
})

module.exports = knex
