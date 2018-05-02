// 导入相关模块
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json'
import routes from './routes/index'
import { knex } from './knex/mysql'

global._ = require('lodash')

setInterval(() => {
  console.log('--------数据库重新连接-----------')
  Promise.resolve(knex.raw('select 1'))
}, 10 * 60000)

const app = express()
const port = process.env.PORT || 5000

const options = {
  explorer: true
}

// bodyParser morgan
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))

app.use(express.static('./public'))

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

app.listen(port)

console.log(`listening on port ${port}`)

export default app
