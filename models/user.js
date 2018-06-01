import Joi from 'joi'

const User = Joi.object().keys({

  phone: Joi.string().regex(/^[0-9]{11}$/).description('手机号').required(),
  username: Joi.string().description('用户名'),
  password: Joi.string().alphanum().min(6).max(12).description('密码').required(),
  created_at: Joi.date().description('创建时间'),
  updated_at: Joi.date().description('更新时间'),
  deleted_at: Joi.date().description('逻辑删除时间')

})

export {
  User
}
