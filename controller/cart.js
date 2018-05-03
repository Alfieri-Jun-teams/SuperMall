import { knex } from '../knex/mysql'
import { returnClientResponse } from '../common/returnClientResponse'

const createCart = async (req, res) => {
  const params = req.body

  if (params.amount === 0) {
    return res.status(400).send(returnClientResponse('商品数目不能为零', 0))
  }

  const cart = await knex('cart').where({
    user_id: params.user_id,
    goods_id: params.goods_id
  }).whereNull('deleted_at')

  if (!cart) {
    const [id] = await knex('cart').insert(params)
    params.id = id
  }

  await knex('cart').where({
    user_id: params.user_id,
    goods_id: params.goods_id
  }).update({amount: knex.raw('??-??', ['amount', 'params.amount'])})

  res.json(returnClientResponse('购物车操作成功', 1, params))
}

export {
  createCart
}
