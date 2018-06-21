import Joi from 'joi'
import convert from 'joi-to-json-schema'

const props = {
  id: Joi.number().description('id'),
  serial: Joi.string().description('订单编号'),
  goods_id: Joi.string().description('关联商品id').required(),
  user_id: Joi.string().description('关联用户id').required(),
  amount: Joi.number().description('数量').required(),
  is_fahuo: Joi.number().valid(0, 1).description('是否发货 0-默认 1-发货'),
  express_name: Joi.string().description('快递名称'),
  express_serial: Joi.string().description('快递单号'),
  created_at: Joi.date().description('创建时间'),
  updated_at: Joi.date().description('更新时间'),
  deleted_at: Joi.date().description('逻辑删除时间')
}

const model = Joi.object(props).description('订单信息')
const Order = convert(model)

export {
  Order,
  props
}
