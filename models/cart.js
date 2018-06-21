import Joi from 'joi'
import convert from 'joi-to-json-schema'

const props = {
  id: Joi.number().description('id'),
  goods_id: Joi.string().description('关联商品id').required(),
  user_id: Joi.string().description('关联用户id').required(),
  amount: Joi.number().description('数量').required(),
  created_at: Joi.date().description('创建时间'),
  updated_at: Joi.date().description('更新时间'),
  deleted_at: Joi.date().description('逻辑删除时间')
}

const model = Joi.object(props).description('购物车')
const Cart = convert(model)

export {
  Cart,
  props
}
