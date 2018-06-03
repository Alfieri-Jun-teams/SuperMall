const Router = require('koa-joi-router')
const Joi = Router.Joi

const router = Router()

const cart = Joi.object({
  id: Joi.number().description('id'),
  serial: Joi.string().description('订单编号'),
  goods_id: Joi.string().description('关联商品id').required(),
  user_id: Joi.string().description('关联用户id').required(),
  amount: Joi.number().description('数量').required(),
  is_fahuo: Joi.number().valid(0, 1).description('是否发货 0-默认 1-发货'),
  express_name: Joi.string().description('快递名称'),
  express_serial: Joi.string().description('快递单号'),
  created_at: Joi.date().description('创建时间'),
  updated_at: Joi.date().description('更新时间'),
  deleted_at: Joi.date().description('逻辑删除时间')
}).description('订单信息表')

const post = Joi.object({
  id: Joi.number().description('id'),
  goods_id: Joi.string().description('关联商品id'),
  user_id: Joi.string().description('关联用户id'),
  amount: Joi.number().description('数量')
})

const put = Joi.object({
  id: Joi.number().description('id'),
  amount: Joi.number().description('数量'),
  updateOrder: Joi.number().description('返回标识')
})

router.get('/orders', {
  meta: {
    swagger: {
      summary: '获取订单列表',
      description: `获取订单列表信息，通过不同的查询条件得到不同的查询结果`,
      tags: ['orders']
    }
  },
  validate: {
    params: {
      name: Joi.string().description('商品名称'),
      user_id: Joi.number().description('用户id'),
      sort: Joi.string().description('排序 例如：-created_at, created_at')
    },
    output: {
      '200': {
        body: Joi.object({
          code: Joi.number().description('返回标识'),
          message: Joi.string().description('接口描述'),
          data: Joi.array().items(cart).description('返回数据'),
          pagination: Joi.object().description('分页')
        }).options({
          allowUnknown: true
        }).description('订单信息')
      }
    }
  },
  handler: async ctx => {
    ctx.body = 'hello super'
  }
})

// POST
router.post('/orders', {
  meta: {
    swagger: {
      summary: '创建订单',
      description: '创建订单',
      tags: ['orders']
    }
  },
  validate: {
    type: 'json',
    body: {
      goods_id: Joi.string().description('关联商品id').required(),
      user_id: Joi.string().description('关联用户id').required(),
      amount: Joi.number().description('数量').required()
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

router.get('/orders/:id', {
  meta: {
    swagger: {
      summary: '获取订单详情信息',
      description: `通过id获取订单详情信息`,
      tags: ['orders']
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
          data: Joi.array().items(cart).description('返回数据')
        }).options({
          allowUnknown: true
        }).description('订单详情信息')
      }
    }
  },
  handler: async ctx => {
    ctx.body = 'hello super'
  }
})

router.put('/orders/:id', {
  meta: {
    swagger: {
      summary: '修改订单信息',
      description: `通过id获取订单信息，然后修改订单信息`,
      tags: ['orders']
    }
  },
  validate: {
    params: {
      id: Joi.number().description('id')
    },
    type: 'json',
    body: {
      amount: Joi.number().description('数量')
    },
    output: {
      '200': {
        body: Joi.object({
          code: Joi.number().description('返回标识'),
          message: Joi.string().description('接口描述'),
          data: Joi.array().items(put).description('返回数据')
        }).options({
          allowUnknown: true
        }).description('订单信息修改')
      }
    }
  },
  handler: async ctx => {
    ctx.body = 'hello super'
  }
})

router.delete('/orders/:id', {
  meta: {
    swagger: {
      summary: '删除订单信息',
      description: `通过id删除订单信息`,
      tags: ['orders']
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
          data: Joi.array().description('返回数据')
        }).options({
          allowUnknown: true
        }).description('删除订单信息')
      }
    }
  },
  handler: async ctx => {
    ctx.body = 'hello super'
  }
})

module.exports = router
