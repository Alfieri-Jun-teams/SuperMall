import Joi from 'joi'

const admin = Joi.object().keys({

  phone: Joi.number().regex(/^[0-9]{11}$/, 'phone').description('手机号'),
  password: Joi.string().alphanum().min(6).max(12).description('密码')

})

export {
  admin
}
