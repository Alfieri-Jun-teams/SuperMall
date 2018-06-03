import Joi from 'joi'

const props = {
  phone: Joi.string().regex(/^[0-9]{11}$/).description('手机号').required(),
  password: Joi.string().alphanum().min(6).max(12).description('密码').required()
}

const model = Joi.object().keys(props).description('登录')

const login = {
  method: 'post',
  summary: '登录',
  path: '/login',
  requestBody: {
    body: ['phone', 'password'],
    required: ['phone', 'password']
  }
}

export {
  model,
  login
}
