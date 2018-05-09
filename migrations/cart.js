const knex = require('./setting')

console.log('cart migrate start')

knex.schema.hasTable('cart').then(exists => {
  if (!exists) {
    return knex.schema.createTable('cart', t => {
      t.increments()
      t.string('goods_id').comment('关联商品id')
      t.string('user_id').comment('关联用户id')
      t.float('amount', 9, 1).comment('数目')
      t.timestamp('created_at').defaultTo(knex.fn.now()).comment('创建时间')
      t.datetime('updated_at').comment('更新时间')
      t.comment('购物车信息表')
    })
  }
})

knex.schema.hasColumn('cart', 'user_id').then(exists => {
  if (!exists) {
    return knex.schema.table('cart', t => t.string('user_id').comment('关联用户id').after('goods_id'))
  }
})

knex.schema.hasColumn('cart', 'deleted_at').then(exists => {
  if (!exists) {
    return knex.schema.table('cart', t => t.date('deleted_at').comment('逻辑删除时间').after('updated_at'))
  }
})

console.log('cart migrate end')
process.exit()
