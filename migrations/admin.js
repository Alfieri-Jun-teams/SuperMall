const knex = require('./setting')

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
