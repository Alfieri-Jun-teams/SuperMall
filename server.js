// 导入相关模块
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import routes from './routes/index'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import conRedis from 'connect-redis'
import { config, knex } from './config/index'

const RedisStore = conRedis(session)

global._ = require('lodash')

setInterval(() => {
  console.log('--------数据库重新连接-----------')
  Promise.resolve(knex.raw('select 1'))
}, 10 * 60000)

const app = express()

// bodyParser morgan
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use(express.static('./public'))

app.use(cookieParser(config.firstSecret))
app.use(session({
  store: new RedisStore({
    host: config.redis.host,
    port: config.redis.port,
    pass: config.redis.password
  }),
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
  resave: true,
  saveUninitialized: true,
  secret: config.firstSecret
}))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use('/', routes)

// 封掉不让访问的接口
// 所有get不到信息的接口
app.route('*').get((req, res) => {
  return res.status(500).send({
    message: 'get接口有误'
  })
})

// 所有post不到信息的接口
app.route('*').post((req, res) => {
  return res.status(500).send({
    message: 'post接口有误'
  })
})

// 所有put不到信息的接口
app.route('*').put((req, res) => {
  return res.status(500).send({
    message: 'put接口有误'
  })
})

// 所有delete不到信息的接口
app.route('*').delete((req, res) => {
  return res.status(500).send({
    message: 'delete接口有误'
  })
})

app.listen(config.port)

console.log(`listening on port ${config.port}`)

export default app
