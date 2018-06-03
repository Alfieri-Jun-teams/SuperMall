import { props } from '../../models/user'
import _ from 'lodash'
const output = require('./output')
const Router = require('koa-joi-router')
const Joi = Router.Joi

const router = Router()

const user = Joi.object(props).description('用户信息表')
const post = Joi.object(Object.assign(
  {
    id: Joi.number().description('id'),
    insertAccount: Joi.number().description('account对应的id')
  },
  _.pick(props, ['phone'])
))
const put = Joi.object(Object.assign(
  {
    id: Joi.number().description('id'),
    update: Joi.number().description('返回标识')
  },
  _.pick(props, ['phone'])
))

router.get('/users', {
  meta: {
    swagger: {
      summary: '获取用户列表',
      description: `获取用户信息，通过不同的查询条件得到不同的查询结果`,
      tags: ['users']
    }
  },
  validate: {
    params: {
      phone: Joi.string().description('手机号'),
      sort: Joi.string().description('排序 例如：-created_at, created_at')
    },
    output: output('用户信息列表', user)
  },
  handler: async ctx => {
    ctx.body = 'hello super'
  }
})

// POST
router.post('/users', {
  meta: {
    swagger: {
      summary: '创建用户',
      description: '创建用户，关联account表，采用事务，同时产生，同时失败',
      tags: ['users']
    }
  },
  validate: {
    type: 'json',
    body: _.pick(props, ['phone', 'password']),
    output: output('新增用户信息', post)
  },
  handler: async ctx => {
    ctx.body = 'hello super'
  }
})

router.get('/users/:id', {
  meta: {
    swagger: {
      summary: '获取用户详情信息',
      description: `通过id获取用户信息`,
      tags: ['users']
    }
  },
  validate: {
    params: {
      id: Joi.number().description('id')
    },
    output: output('用户详情信息', user)
  },
  handler: async ctx => {
    ctx.body = 'hello super'
  }
})

router.put('/users/:id', {
  meta: {
    swagger: {
      summary: '修改用户信息',
      description: `通过id获取用户信息，然后修改用户信息`,
      tags: ['users']
    }
  },
  validate: {
    params: {
      id: Joi.number().description('id')
    },
    type: 'json',
    body: {
      username: Joi.string().description('用户名')
    },
    output: output('用户信息修改成功', put)
  },
  handler: async ctx => {
    ctx.body = 'hello super'
  }
})

router.delete('/users/:id', {
  meta: {
    swagger: {
      summary: '删除用户',
      description: `通过id删除用户信息`,
      tags: ['users']
    }
  },
  validate: {
    params: {
      id: Joi.number().description('id')
    },
    output: output('用户信息删除成功')
  },
  handler: async ctx => {
    ctx.body = 'hello super'
  }
})

module.exports = router
