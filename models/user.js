import Joi from 'joi'

const props = {
  phone: Joi.string().regex(/^[0-9]{11}$/).description('手机号').required(),
  username: Joi.string().description('用户名'),
  password: Joi.string().alphanum().min(6).max(12).description('密码').required(),
  created_at: Joi.date().description('创建时间'),
  updated_at: Joi.date().description('更新时间'),
  deleted_at: Joi.date().description('逻辑删除时间')
}

const model = Joi.object().keys(props).description('用户信息')

export {
  model
}
