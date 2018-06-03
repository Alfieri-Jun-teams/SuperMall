import { props } from '../../models/login'
const output = require('./output')
const Router = require('koa-joi-router')

const router = Router()

router.post('/login', {
  meta: {
    swagger: {
      summary: '登录',
      description: '登录产生token token日期为一星期',
      tags: ['login']
    }
  },
  validate: {
    type: 'json',
    body: props,
    output: output('登录成功')
  },
  handler: async ctx => {
    ctx.body = 'hello super'
  }
})

module.exports = router
