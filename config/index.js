import _ from 'lodash'
import development from './config.default'
import production from './config.prod'

const env = process.env.NODE_ENV || 'development'
const configs = {
  development: development,
  production: production
}
const defaultConfig = {
  env: env
}
const config = _.merge(defaultConfig, configs[env])

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
  }
})

export {
  config,
  knex
}
