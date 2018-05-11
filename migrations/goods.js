const knex = require('./setting')

console.log('goods migrate start')

knex.schema.hasTable('goods').then(exists => {
  if (!exists) {
    return knex.schema.createTable('goods', t => {
      t.increments()
      t.string('name').comment('商品名')
      t.string('price').comment('价格')
      t.text('description').comment('描述')
      t.timestamp('created_at').defaultTo(knex.fn.now()).comment('创建时间')
      t.datetime('updated_at').comment('更新时间')
      t.datetime('deleted_at').comment('逻辑删除时间')
      t.comment('商品信息表')
    })
  }
})

knex.schema.hasColumn('goods', 'serial').then(exists => {
  if (!exists) {
    return knex.schema.table('goods', t => t.string('serial').comment('商品编号').after('id'))
  }
})

knex.schema.hasColumn('goods', 'imgs').then(exists => {
  if (!exists) {
    return knex.schema.table('goods', t => t.text('imgs').comment('商品图片').after('description'))
  }
})

console.log('goods migrate end')
process.exit()
