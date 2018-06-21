import Joi from 'joi'
import convert from 'joi-to-json-schema'

const props = {
  phone: Joi.string().regex(/^[0-9]{11}$/).description('手机号').required(),
  password: Joi.string().alphanum().min(6).max(12).description('密码').required()
}

const model = Joi.object(props).description('登录')
const Login = convert(model)

export {
  Login,
  props
}
