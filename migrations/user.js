const knex = require('./setting')

console.log('admin migrate start')

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
console.log('user migrate end')
process.exit()
