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
    output: {
      200: {
        body: {
          code: Joi.number().description('返回标识'),
          message: Joi.string().description('接口描述'),
          data: Joi.string().description('返回数据 token jwt')
        }
      }
    }
  },
  handler: async ctx => {
    ctx.body = 'hello super'
  }
})

module.exports = router
