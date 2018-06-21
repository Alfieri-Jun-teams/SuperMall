import { knex } from '../config/index'
import { Response } from '../common/Response'
import { getSortSql } from '../common/sort'

const index = async (params, req, res) => {
  const sql = await knex('cart').whereNull('deleted_at')
    .leftJoin('goods', 'goods.id', 'goods_id')
    .leftJoin('users', 'users.id', 'user_id')
    .select(
      'order.*',
      'goods.serial as serial',
      'goods.name as goods_name',
      'goods.price as price',
      'users.username as username',
      'users.phone as phone'
    )

  if (params.search) {
    sql.where(function () {
      this.where('goods.serial', 'like', `%${params.search}%`).orWhere('goods.name', 'like', `%${params.search}%`)
    })
  }
  if (params.sort) getSortSql(sql, params.sort)

  const data = await sql
  res.json(Response('查询成功', 1, data))
}

const create = async (params, req, res) => {
  if (params.amount === 0) {
    return res.status(400).send(Response('商品数目不能为零', 0))
  }
  const findCart = await knex('cart').where({
    user_id: params.user_id,
    goods_id: params.goods_id
  }).whereNull('deleted_at')
  if (!findCart) {
    const [id] = await knex('cart').insert(params)
    params.id = id
  }
  await knex('cart').where({
    user_id: params.user_id,
    goods_id: params.goods_id
  }).update({amount: knex.raw('??-??', ['amount', 'params.amount'])})
  res.json(Response('购物车操作成功', 1, params))
}

const show = async (params, req, res) => {
  const cart = await knex('cart').where('id', params.id).whereNull('deleted_at').first()
  if (!cart) {
    return res.status(404).send(Response('没有找到该条记录', 0))
  }
  res.json(Response('记录查询成功', 1, cart))
}

const update = async (params, req, res) => {
  const cart = await knex('cart').where('id', params.id).whereNull('deleted_at').first()
  if (!cart) {
    return res.status(400).send(Response('未找到该条记录', 0))
  }
  const updateParams = Object.assign({updated_at: new Date()}, params)
  const updateCart = await knex('cart').where('id', params.id).update(updateParams)
  params.updateCart = updateCart
  res.json(Response('购物车更新成功', 1, params))
}

const destroy = async (params, req, res) => {
  const cart = await knex('cart').where('id', params.id).whereNull('deleted_at').first()
  if (!cart) {
    return res.status(400).send(Response('未找到该条记录', 0))
  }
  await knex('cart').where('id', params.id).update('deleted_at', new Date())
  res.json(Response('删除成功', 1))
}

export {
  index,
  create,
  show,
  update,
  destroy
}
