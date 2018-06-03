const output = require('./output')
const Router = require('koa-joi-router')
const Joi = Router.Joi

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
    body: {
      phone: Joi.string().required(),
      password: Joi.string().alphanum().min(6).max(30).required()
    },
    output: output('登录成功')
  },
  handler: async ctx => {
    ctx.body = 'hello super'
  }
})

module.exports = router
