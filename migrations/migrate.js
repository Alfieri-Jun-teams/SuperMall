const migrateAdmin = require('./admin')
const migrateCart = require('./cart')
const migrateGoods = require('./goods')
const migrateOrder = require('./order')
const migrateUser = require('./user')

const migrate = () => {
  console.log('migrate start')
  migrateAdmin()
  migrateCart()
  migrateGoods()
  migrateOrder()
  migrateUser()
  console.log('migrate end')
  process.exit()
}

migrate()
