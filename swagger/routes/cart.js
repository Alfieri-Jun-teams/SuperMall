const Router = require('koa-joi-router')
const Joi = Router.Joi

const router = Router()

const cart = Joi.object({
  id: Joi.number().description('id'),
  goods_id: Joi.string().description('关联商品id').required(),
  user_id: Joi.string().description('关联用户id').required(),
  amount: Joi.number().description('数量').required(),
  created_at: Joi.date().description('创建时间'),
  updated_at: Joi.date().description('更新时间'),
  deleted_at: Joi.date().description('逻辑删除时间')
}).description('购物车信息表')

const post = Joi.object({
  id: Joi.number().description('id'),
  goods_id: Joi.string().description('关联商品id'),
  user_id: Joi.string().description('关联用户id'),
  amount: Joi.number().description('数量')
})

const put = Joi.object({
  id: Joi.number().description('id'),
  amount: Joi.number().description('数量'),
  updateCart: Joi.number().description('返回标识')
})

router.get('/carts', {
  meta: {
    swagger: {
      summary: '获取商品列表',
      description: `获取商品列表信息，通过不同的查询条件得到不同的查询结果`,
      tags: ['carts']
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
        }).description('商品信息')
      }
    }
  },
  handler: async ctx => {
    ctx.body = 'hello super'
  }
})

// POST
router.post('/carts', {
  meta: {
    swagger: {
      summary: '添加购物车',
      description: '添加购物车',
      tags: ['carts']
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

router.get('/carts/:id', {
  meta: {
    swagger: {
      summary: '获取购物车详情信息',
      description: `通过id获取购物车详情信息`,
      tags: ['carts']
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
        }).description('购物车详情信息')
      }
    }
  },
  handler: async ctx => {
    ctx.body = 'hello super'
  }
})

router.put('/carts/:id', {
  meta: {
    swagger: {
      summary: '修改购物车信息',
      description: `通过id获取购物车信息，然后修改购物车信息`,
      tags: ['carts']
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
        }).description('购物车信息修改')
      }
    }
  },
  handler: async ctx => {
    ctx.body = 'hello super'
  }
})

router.delete('/carts/:id', {
  meta: {
    swagger: {
      summary: '删除购物车信息',
      description: `通过id删除购物车信息`,
      tags: ['carts']
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
        }).description('删除购物车信息')
      }
    }
  },
  handler: async ctx => {
    ctx.body = 'hello super'
  }
})

module.exports = router
