const Router = require('koa-joi-router')
const Joi = Router.Joi

const router = Router()

const address = Joi.object({
  name: Joi.string().description('收件人').required(),
  phone: Joi.string().description('收件人手机号').required(),
  user_id: Joi.string().description('关联用户id').required(),
  fault: Joi.number().valid(0, 1).description('是否默认 0-默认 1-默认'),
  province: Joi.string().description('省').required(),
  city: Joi.string().description('城市').required(),
  district: Joi.string().description('区/县').required(),
  detail: Joi.string().description('详细地址').required(),
  created_at: Joi.date().description('创建时间'),
  updated_at: Joi.date().description('更新时间'),
  deleted_at: Joi.date().description('逻辑删除时间')
}).description('用户地址管理表')

const post = Joi.object({
  id: Joi.number().description('id'),
  name: Joi.string().description('收件人'),
  phone: Joi.string().description('收件人手机号'),
  user_id: Joi.string().description('关联用户id'),
  fault: Joi.number().valid(0, 1).description('是否默认 0-默认 1-默认'),
  province: Joi.string().description('省'),
  city: Joi.string().description('城市'),
  district: Joi.string().description('区/县'),
  detail: Joi.string().description('详细地址')
})

const put = Joi.object({
  id: Joi.number().description('id'),
  update: Joi.number().description('返回标识')
})

const destroy = Joi.object({
  id: Joi.number().description('id'),
  destroy: Joi.number().description('返回标识')
})

router.get('/addresses', {
  meta: {
    swagger: {
      summary: '获取地址列表',
      description: `获取地址列表信息，通过不同的查询条件得到不同的查询结果`,
      tags: ['address']
    }
  },
  validate: {
    params: {
      user_id: Joi.number().description('用户id'),
      page: Joi.number().description('页码').required(),
      size: Joi.number().description('条数').required(),
      pagination: Joi.number().description('是否分页').required()
    },
    output: {
      '200': {
        body: Joi.object({
          code: Joi.number().description('返回标识'),
          message: Joi.string().description('接口描述'),
          data: Joi.array().items(address).description('返回数据'),
          pagination: Joi.object().description('分页')
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

// POST
router.post('/addresses', {
  meta: {
    swagger: {
      summary: '添加地址',
      description: '添加地址 首次添加的地址自动设为默认地址',
      tags: ['address']
    }
  },
  validate: {
    type: 'json',
    body: {
      name: Joi.string().description('收件人').required(),
      phone: Joi.string().description('收件人手机号').required(),
      user_id: Joi.string().description('关联用户id').required(),
      province: Joi.string().description('省').required(),
      city: Joi.string().description('城市').required(),
      district: Joi.string().description('区/县').required(),
      detail: Joi.string().description('详细地址').required()
    },
    output: {
      200: {
        body: {
          code: Joi.number().description('返回标识'),
          message: Joi.string().description('接口描述'),
          data: Joi.array().items(post).description('返回数据')
        }
      }
    }
  },
  handler: async ctx => {
    ctx.body = 'hello super'
  }
})

router.get('/addresses/:id', {
  meta: {
    swagger: {
      summary: '获取地址详情信息',
      description: `通过id获取地址详情信息`,
      tags: ['address']
    }
  },
  validate: {
    params: {
      id: Joi.number().description('id')
    },
    output: {
      '200': {
        body: Joi.object({
          code: Joi.number().description('返回标识'),
          message: Joi.string().description('接口描述'),
          data: Joi.array().items(address).description('返回数据')
        }).options({
          allowUnknown: true
        }).description('地址详情信息')
      }
    }
  },
  handler: async ctx => {
    ctx.body = 'hello super'
  }
})

router.put('/addresses/:id', {
  meta: {
    swagger: {
      summary: '修改地址信息',
      description: `通过id获取地址信息，然后修改地址信息`,
      tags: ['address']
    }
  },
  validate: {
    params: {
      id: Joi.number().description('id')
    },
    type: 'json',
    body: {
      name: Joi.string().description('收件人'),
      phone: Joi.string().description('收件人手机号'),
      province: Joi.string().description('省'),
      city: Joi.string().description('城市'),
      district: Joi.string().description('区/县'),
      detail: Joi.string().description('详细地址'),
      default: Joi.number().valid(0, 1).description('是否设为默认地址')
    },
    output: {
      '200': {
        body: Joi.object({
          code: Joi.number().description('返回标识'),
          message: Joi.string().description('接口描述'),
          data: Joi.array().items(put).description('返回数据')
        }).options({
          allowUnknown: true
        }).description('地址信息修改')
      }
    }
  },
  handler: async ctx => {
    ctx.body = 'hello super'
  }
})

router.delete('/addresses/:id', {
  meta: {
    swagger: {
      summary: '删除地址信息',
      description: `通过id删除地址信息`,
      tags: ['address']
    }
  },
  validate: {
    params: {
      id: Joi.number().description('id')
    },
    output: {
      '200': {
        body: Joi.object({
          code: Joi.number().description('返回标识'),
          message: Joi.string().description('接口描述'),
          data: Joi.array().items(destroy).description('返回数据')
        }).options({
          allowUnknown: true
        }).description('删除地址信息')
      }
    }
  },
  handler: async ctx => {
    ctx.body = 'hello super'
  }
})

module.exports = router
