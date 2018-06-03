import { props } from '../../models/cart'
import _ from 'lodash'
const output = require('./output')
const Router = require('koa-joi-router')
const Joi = Router.Joi

const router = Router()

const cart = Joi.object(props).description('购物车信息表')
const post = Joi.object(_.pick(props, ['id', 'goods_id', 'user_id', 'amount']))
const put = Joi.object(
  Object.assign(
    {updateCart: Joi.number().description('返回标识')},
    _.pick(props, ['id', 'amount'])
  )
)

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
    output: output('商品信息', cart)
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
    body: _.pick(props, ['goods_id', 'user_id', 'amount']),
    output: output('添加购物车成功', post)
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
    output: output('购物车详情信息', cart)
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
    output: output('购物车修改成功', put)
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
    output: output('删除购物车信息')
  },
  handler: async ctx => {
    ctx.body = 'hello super'
  }
})

module.exports = router
