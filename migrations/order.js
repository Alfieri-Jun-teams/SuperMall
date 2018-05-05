const knex = require('./setting')

const migrateOrder = () => {
  knex.schema.hasTable('order').then(exists => {
    if (!exists) {
      return knex.schema.createTable('order', t => {
        t.increments()
        t.string('goods_id').comment('关联商品id')
        t.string('user_id').comment('关联用户id')
        t.float('amount', 9, 1).comment('数目')
        t.boolean('is_fahuo').comment('是否发货')
        t.string('express_name').comment('快递公司')
        t.string('express_serial').comment('快递单号')
        t.timestamp('created_at').defaultTo(knex.fn.now()).comment('创建时间')
        t.datetime('updated_at').comment('更新时间')
        t.datetime('deleted_at').comment('逻辑删除时间')
        t.comment('订单信息表')
      })
    }
  })
}

module.exports = migrateOrder
