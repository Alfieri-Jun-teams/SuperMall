import Joi from 'joi'

const order = Joi.object().keys({

  goods_id: Joi.string().description('关联商品id'),
  user_id: Joi.string().description('关联用户id'),
  amount: Joi.number().description('数量'),
  is_fahuo: Joi.number().valid(0, 1).description('是否发货 0-默认 1-发货'),
  express_name: Joi.string().description('快递名称'),
  express_serial: Joi.string().description('快递单号'),
  created_at: Joi.date().description('创建时间'),
  updated_at: Joi.date().description('更新时间'),
  deleted_at: Joi.date().description('逻辑删除时间')

})

export {
  order
}