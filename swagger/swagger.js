const { SwaggerAPI } = require('koa-joi-router-docs')
const Router = require('koa-joi-router')
const router = Router()

const login = require('./routes/login')
const user = require('./routes/user')
const goods = require('./routes/goods')
const cart = require('./routes/cart')
const order = require('./routes/order')
const address = require('./routes/address')
const areaData = require('./routes/areaData')
const recover = require('./routes/recover')
/**
   * Generate Swagger json from the router object
   */
const generator = new SwaggerAPI()
generator.addJoiRouter(login)
generator.addJoiRouter(user)
generator.addJoiRouter(goods)
generator.addJoiRouter(cart)
generator.addJoiRouter(order)
generator.addJoiRouter(address)
generator.addJoiRouter(areaData)
generator.addJoiRouter(recover)

const spec = generator.generateSpec({
  info: {
    title: 'express-supermall API',
    description: 'supermall',
    version: '1.0.0'
  },
  basePath: '/',
  tags: [{name: 'users'}]
}, {
  defaultResponses: {} // Custom default responses if you don't like default 200
})

/**
   * Swagger JSON API
   */
router.get('/_api.json', async ctx => {
  ctx.body = JSON.stringify(spec, null, '  ')
})

/**
   * API documentation
   */
router.get('/apiDocs', async ctx => {
  ctx.body = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>SuperMall API</title>
    </head>
    <body>
      <redoc spec-url='/_api.json' lazy-rendering></redoc>
      <script src="https://rebilly.github.io/ReDoc/releases/latest/redoc.min.js"></script>
    </body>
    </html>
    `
})

module.exports = router
