import Joi from 'joi'

const admin = Joi.object().keys({

  name: Joi.string().description('用户名'),
  phone: Joi.string().regex(/^[0-9]{11}$/).description('手机号'),
  password: Joi.string().alphanum().min(6).max(12).description('密码')

})

export {
  admin
}
