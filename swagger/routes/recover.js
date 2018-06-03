const Router = require('koa-joi-router')
const Joi = Router.Joi

const router = Router()

router.post('/accounts/code', {
  meta: {
    swagger: {
      summary: '获取验证码',
      description: `输入手机号获取验证码`,
      tags: ['recover']
    }
  },
  validate: {
    type: 'json',
    body: {
      phone: Joi.string().description('手机号').required()
    },
    output: {
      '200': {
        body: Joi.object({
          code: Joi.number().description('返回标识'),
          message: Joi.string().description('接口描述'),
          data: Joi.array().description('返回数据'),
          pagination: Joi.object().description('分页')
        }).options({
          allowUnknown: true
        }).description('返回信息')
      }
    }
  },
  handler: async ctx => {
    ctx.body = 'hello super'
  }
})

// POST
router.post('/accounts/compare', {
  meta: {
    swagger: {
      summary: '校验验证码',
      description: '输入手机号和验证码，验证手机和验证码的准确性',
      tags: ['recover']
    }
  },
  validate: {
    type: 'json',
    body: {
      phone: Joi.string().description('手机号').required(),
      code: Joi.string().alphanum(6).description('验证码').required()
    },
    output: {
      200: {
        body: {
          code: Joi.number().description('返回标识'),
          message: Joi.string().description('接口描述'),
          data: Joi.array().description('返回数据'),
          pagination: Joi.object().description('分页')
        }
      }
    }
  },
  handler: async ctx => {
    ctx.body = 'hello super'
  }
})

router.put('/accounts/recover', {
  meta: {
    swagger: {
      summary: '修改该手机号的账号密码',
      description: `通过当前的手机号查询用户信息，然后更新用户密码`,
      tags: ['recover']
    }
  },
  validate: {
    type: 'json',
    body: {
      phone: Joi.string().description('手机号').required(),
      new_password: Joi.string().description('密码').required(),
      new_password_again: Joi.string().description('再次输入密码').required()
    },
    output: {
      '200': {
        body: Joi.object({
          code: Joi.number().description('返回标识'),
          message: Joi.string().description('接口描述'),
          data: Joi.array().description('返回数据'),
          pagination: Joi.object().description('分页')
        }).options({
          allowUnknown: true
        }).description('修改密码')
      }
    }
  },
  handler: async ctx => {
    ctx.body = 'hello super'
  }
})

module.exports = router
