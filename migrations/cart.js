const knex = require('./setting')

knex.schema.hasTable('cart').then(exists => {
  if (!exists) {
    return knex.schema.createTable('cart', t => {
      t.increments()
      t.string('goods_id').comment('关联商品id')
      t.float('amount', 9, 1).comment('数目')
      t.timestamp('created_at').defaultTo(knex.fn.now()).comment('创建时间')
      t.datetime('updated_at').comment('更新时间')
      t.comment('购物车信息表')
    })
  }
})
