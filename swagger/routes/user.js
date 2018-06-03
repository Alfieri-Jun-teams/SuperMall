const Router = require('koa-joi-router')
const Joi = Router.Joi

const router = Router()

const user = Joi.object({
  id: Joi.number().description('id'),
  phone: Joi.string().description('手机号'),
  username: Joi.string().description('用户名'),
  created_at: Joi.date().description('创建时间'),
  updated_at: Joi.date().description('更新时间'),
  deleted_at: Joi.date().description('逻辑删除时间')
}).description('用户信息表')

const post = Joi.object({
  id: Joi.number().description('id'),
  phone: Joi.string().description('手机号'),
  insertAccount: Joi.number().description('account对应的id')
})

const put = Joi.object({
  id: Joi.number().description('id'),
  username: Joi.string().description('手机号'),
  update: Joi.number().description('返回标识')
})

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
    output: {
      '200': {
        body: Joi.object({
          code: Joi.number().description('返回标识'),
          message: Joi.string().description('接口描述'),
          data: Joi.array().items(user).description('返回数据'),
          pagination: Joi.object().description('分页')
        }).options({
          allowUnknown: true
        }).description('用户信息')
      }
    }
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
    body: {
      phone: Joi.string().required(),
      password: Joi.string().alphanum().min(6).max(30).required()
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
    output: {
      '200': {
        body: Joi.object({
          code: Joi.number().description('返回标识'),
          message: Joi.string().description('接口描述'),
          data: Joi.array().items(user).description('返回数据')
        }).options({
          allowUnknown: true
        }).description('用户详情信息')
      }
    }
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
    output: {
      '200': {
        body: Joi.object({
          code: Joi.number().description('返回标识'),
          message: Joi.string().description('接口描述'),
          data: Joi.array().items(put).description('返回数据')
        }).options({
          allowUnknown: true
        }).description('用户信息修改')
      }
    }
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
    output: {
      '200': {
        body: Joi.object({
          code: Joi.number().description('返回标识'),
          message: Joi.string().description('接口描述'),
          data: Joi.array().description('返回数据')
        }).options({
          allowUnknown: true
        }).description('删除用户信息')
      }
    }
  },
  handler: async ctx => {
    ctx.body = 'hello super'
  }
})

module.exports = router
