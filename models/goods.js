import Joi from 'joi'

const goods = Joi.object().keys({

  serial: Joi.string().description('商品编号'),
  name: Joi.string().description('商品名称'),
  price: Joi.number().description('价格'),
  description: Joi.string().description('商品描述'),
  created_at: Joi.date().description('创建时间'),
  updated_at: Joi.date().description('更新时间'),
  deleted_at: Joi.date().description('逻辑删除时间')

})

export {
  goods
}
