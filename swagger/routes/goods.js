const output = require('./output')
const Router = require('koa-joi-router')
const Joi = Router.Joi

const router = Router()

const goods = Joi.object({
  id: Joi.number().description('id'),
  serial: Joi.string().description('商品编号'),
  type_id: Joi.number().description('商品配型id').required(),
  name: Joi.string().description('商品名称').required(),
  price: Joi.number().description('价格').required(),
  description: Joi.string().description('商品描述'),
  created_at: Joi.date().description('创建时间'),
  updated_at: Joi.date().description('更新时间'),
  deleted_at: Joi.date().description('逻辑删除时间')
}).description('商品信息表')

const post = Joi.object({
  id: Joi.number().description('id'),
  type_id: Joi.number().description('类型id'),
  name: Joi.string().description('商品名称'),
  price: Joi.string().description('价格'),
  description: Joi.string().description('商品描述')
})

const put = Joi.object({
  id: Joi.number().description('id'),
  type_id: Joi.number().description('类型id'),
  name: Joi.string().description('商品名称'),
  price: Joi.string().description('价格'),
  description: Joi.string().description('商品描述'),
  updateGoods: Joi.number().description('返回标识')
})

router.get('/goods', {
  meta: {
    swagger: {
      summary: '获取商品列表',
      description: `获取商品列表信息，通过不同的查询条件得到不同的查询结果，需要管理员权限`,
      tags: ['goods']
    }
  },
  validate: {
    params: {
      price: Joi.string().description('价格'),
      search: Joi.string().description('搜索 支持名字和编号 例如：name, serial'),
      sort: Joi.string().description('排序 例如：-created_at, created_at')
    },
    output: output('商品信息', goods)
  },
  handler: async ctx => {
    ctx.body = 'hello super'
  }
})

// POST
router.post('/goods', {
  meta: {
    swagger: {
      summary: '添加商品',
      description: '添加商品（管理员权限）',
      tags: ['goods']
    }
  },
  validate: {
    type: 'json',
    body: {
      type_id: Joi.number().required(),
      name: Joi.string().required(),
      price: Joi.string().description('价格').required(),
      description: Joi.string()
    },
    output: output('商品添加成功', post)
  },
  handler: async ctx => {
    ctx.body = 'hello super'
  }
})

router.get('/goods/:id', {
  meta: {
    swagger: {
      summary: '获取商品详情信息',
      description: `通过id获取商品详情信息`,
      tags: ['goods']
    }
  },
  validate: {
    params: {
      id: Joi.number().description('id')
    },
    output: output('商品详情', goods)
  },
  handler: async ctx => {
    ctx.body = 'hello super'
  }
})

router.put('/goods/:id', {
  meta: {
    swagger: {
      summary: '修改商品信息',
      description: `通过id获取商品信息，然后修改商品信息`,
      tags: ['goods']
    }
  },
  validate: {
    params: {
      id: Joi.number().description('id')
    },
    type: 'json',
    body: {
      type_id: Joi.number().description('类型id'),
      name: Joi.string().description('名称'),
      price: Joi.string().description('价格')
    },
    output: output('商品信息修改成功', put)
  },
  handler: async ctx => {
    ctx.body = 'hello super'
  }
})

router.delete('/goods/:id', {
  meta: {
    swagger: {
      summary: '删除商品信息',
      description: `通过id删除商品信息`,
      tags: ['goods']
    }
  },
  validate: {
    params: {
      id: Joi.number().description('id')
    },
    output: output('商品信息删除成功')
  },
  handler: async ctx => {
    ctx.body = 'hello super'
  }
})

module.exports = router
