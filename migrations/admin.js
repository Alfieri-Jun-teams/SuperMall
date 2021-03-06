const knex = require('./setting')

console.log('admin migrate start')

knex.schema.hasTable('admin').then(exists => {
  if (!exists) {
    return knex.schema.createTable('admin', t => {
      t.increments()
      t.string('phone', 11).comment('手机号')
      t.comment('管理员信息表')
    })
  }
})

knex.schema.hasColumn('admin', 'name').then(exists => {
  if (!exists) {
    return knex.schema.table('admin', t => t.string('name').comment('用户名').after('id'))
  }
})

console.log('admin migrate end')
process.exit()
