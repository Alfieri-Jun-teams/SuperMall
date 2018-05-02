import Joi from 'joi'

const user = Joi.object().keys({

  phone: Joi.number().regex(/^[0-9]{11}$/, 'phone').description('手机号'),
  username: Joi.string().description('用户名'),
  password: Joi.string().alphanum().min(6).max(12).description('密码'),
  created_at: Joi.date().description('创建时间'),
  updated_at: Joi.date().description('更新时间'),
  deleted_at: Joi.date().description('逻辑删除时间')

})

const userValidate = (params) => {
  const result = Joi.validate(params, user)
  return result
}

export {
  user,
  userValidate
}
