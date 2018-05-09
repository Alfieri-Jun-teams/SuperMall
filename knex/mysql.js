// import mysql from 'mysql'
import { db } from '../config'

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database
  }
})

export {
  knex
}
