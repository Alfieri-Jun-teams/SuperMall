const migrateAdmin = require('./admin')
const migrateCart = require('./cart')
const migrateGoods = require('./goods')
const migrateOrder = require('./order')
const migrateUser = require('./user')
const migrateAccount = require('./account')

const migrate = () => {
  console.log('migrate start')
  migrateAdmin()
  migrateCart()
  migrateGoods()
  migrateOrder()
  migrateUser()
  migrateAccount()
  console.log('migrate end')
  process.exit()
}

migrate()
