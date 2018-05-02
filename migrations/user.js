const knex = require('./seeting')

knex.schema.hasTable('users').then(exists => {
  if (!exists) {
    return knex.schema.createTable('users', t => {
      t.increments()
      t.string('phone', 11).comment('手机号码')
      t.string('username').comment('用户名')
      t.string('password').comment('密码')
      t.timestamp('created_at').defaultTo(knex.fn.now()).comment('创建时间')
      t.datetime('updated_at').comment('更新时间')
      t.datetime('deleted_at').comment('逻辑删除时间')
      t.comment('用户信息表')
    })
  }
})

knex.schema.hasTable('goods').then(exists => {
  if (!exists) {
    return knex.schema.createTable('goods', t => {
      t.increments()
      t.string('goods_name').comment('商品名')
      t.string('price').comment('价格')
      t.text('description').comment('描述')
      t.timestamp('created_at').defaultTo(knex.fn.now()).comment('创建时间')
      t.datetime('updated_at').comment('更新时间')
      t.datetime('deleted_at').comment('逻辑删除时间')
      t.comment('商品信息表')
    })
  }
})

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

knex.schema.hasTable('admin').then(exists => {
  if (!exists) {
    return knex.schema.createTable('admin', t => {
      t.increments()
      t.string('phone', 11).comment('手机号')
      t.string('password').comment('密码')
      t.comment('管理员信息表')
    })
  }
})

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
