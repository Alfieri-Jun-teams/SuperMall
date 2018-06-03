const Router = require('koa-joi-router')
const Joi = Router.Joi

const router = Router()

router.get('/area_data', {
  meta: {
    swagger: {
      summary: '获取省市数据',
      description: `获取省市数据`,
      tags: ['area_data']
    }
  },
  validate: {
    output: {
      '200': {
        body: Joi.object({
          code: Joi.number().description('返回标识'),
          message: Joi.string().description('接口描述'),
          data: Joi.object().description('返回数据')
        }).options({
          allowUnknown: true
        }).description('地址信息')
      }
    }
  },
  handler: async ctx => {
    ctx.body = 'hello super'
  }
})

module.exports = router
