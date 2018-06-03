import { props } from '../../models/goods'
import _ from 'lodash'
const output = require('./output')
const Router = require('koa-joi-router')
const Joi = Router.Joi

const router = Router()

const goods = Joi.object(props).description('商品信息表')
const post = Joi.object(_.pick(props, ['id', 'type_id', 'name', 'price', 'description']))
const put = Joi.object(
  Object.assign(
    {updateGoods: Joi.number().description('返回标识')},
    _.pick(props, ['id', 'type_id', 'name', 'price', 'description'])
  )
)

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
    body: _.pick(props, ['type_id', 'name', 'price', 'description']),
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
    body: _.pick(props, ['type_id', 'name', 'price', 'description']),
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
