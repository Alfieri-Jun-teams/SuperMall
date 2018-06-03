import { props } from '../../models/order'
import _ from 'lodash'
const output = require('./output')
const Router = require('koa-joi-router')
const Joi = Router.Joi

const router = Router()

const cart = Joi.object(props).description('订单信息表')
const post = Joi.object(_.pick(props, ['id', 'goods_id', 'user_id', 'amount']))
const put = Joi.object(Object.assign({updateOrder: Joi.number().description('返回标识')}, _.pick(props, ['id', 'amount'])))

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
    output: output('订单列表', cart)
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
    body: _.pick(props, ['goods_id', 'user_id', 'amount']),
    output: output('订单新建成功', post)
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
    output: output('订单详情', cart)
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
    output: output('订单信息修改成功', put)
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
    output: output('订单信息删除成功')
  },
  handler: async ctx => {
    ctx.body = 'hello super'
  }
})

module.exports = router
