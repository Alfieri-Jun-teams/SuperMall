import Joi from 'joi'

const cart = Joi.object().keys({

  goods_id: Joi.string().description('关联商品id').required(),
  user_id: Joi.string().description('关联用户id').required(),
  amount: Joi.number().description('数量').required(),
  created_at: Joi.date().description('创建时间'),
  updated_at: Joi.date().description('更新时间'),
  deleted_at: Joi.date().description('逻辑删除时间')

})

export {
  cart
}
