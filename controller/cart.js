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

const getCart = async (req, res) => {
  const id = req.params.id
  const cart = await knex('cart').where('id', id).whereNull('deleted_at').first()

  if (!cart) {
    return res.status(404).send(returnClientResponse('没有找到该条记录', 0))
  }

  res.json(returnClientResponse('记录查询成功', 1, cart))
}

const putCart = async (req, res) => {
  const params = Object.assign(req.body, req.params)

  const cart = await knex('cart').where('id', params.id).whereNull('deleted_at').first()

  if (!cart) {
    return res.status(400).send(returnClientResponse('未找到该条记录', 0))
  }

  const updateParams = Object.assign({updated_at: new Date()}, params)
  const updateCart = await knex('cart').where('id', params.id).update(updateParams)
  params.updateCart = updateCart
  res.json(returnClientResponse('购物车更新成功', 1, params))
}

const destroyCart = async (req, res) => {
  const id = req.params.id
  const cart = await knex('cart').where('id', id).whereNull('deleted_at').first()

  if (!cart) {
    return res.status(400).send(returnClientResponse('未找到该条记录', 0))
  }

  await knex('cart').where('id', id).update('deleted_at', new Date())
  res.json(returnClientResponse('删除成功', 1))
}

export {
  createCart,
  getCart,
  putCart,
  destroyCart
}
