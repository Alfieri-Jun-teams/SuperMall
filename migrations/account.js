const knex = require('./setting')

console.log('account migrate start')

knex.schema.hasTable('account').then(exists => {
  if (!exists) {
    return knex.schema.createTable('account', t => {
      t.increments()
      t.string('phone', 11).comment('手机号')
      t.string('user_type').comment('用户类型')
      t.string('password').comment('密码')
      t.string('nickname').comment('昵称')
      t.text('avatar').comment('头像')
      t.timestamp('created_at').defaultTo(knex.fn.now()).comment('创建时间')
      t.datetime('updated_at').comment('更新时间')
      t.datetime('deleted_at').comment('删除时间')
      t.comment('用户信息表')
    })
  }
})

knex.schema.hasColumn('account', 'user_id').then(exists => {
  if (!exists) {
    return knex.schema.table('account', t => t.integer('user_id').comment('关联用户id').after('phone'))
  }
})

console.log('account migrate end')
process.exit()
