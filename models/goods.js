import Joi from 'joi'
import convert from 'joi-to-json-schema'

const props = {
  id: Joi.number().description('id'),
  type_id: Joi.number().description('类型id'),
  serial: Joi.string().description('商品编号').required(),
  name: Joi.string().description('商品名称').required(),
  price: Joi.number().description('价格').required(),
  description: Joi.string().description('商品描述'),
  created_at: Joi.date().description('创建时间'),
  updated_at: Joi.date().description('更新时间'),
  deleted_at: Joi.date().description('逻辑删除时间')
}

const model = Joi.object(props).description('商品信息')
const Goods = convert(model)

export {
  Goods,
  props
}
