import { knex } from '../config/index'
import { Response } from '../common/Response'
import { getSortSql } from '../common/sort'
import { orderLogger } from '../common/tracerlog'

const index = async (params, req, res) => {
  const sql = await knex('order').whereNull('deleted_at')
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

  if (params.is_fahuo) sql.where('order.is_fahuo', params.is_fahuo)
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
  const promisify = (fn) => new Promise((resolve, reject) => fn(resolve))
  const trx = await promisify(knex.transaction)
  try {
    const [id] = await trx('order').insert(params)
    const cart = await trx('cart').where({goods_id: params.goods_id, user_id: params.user_id}).first()
    if (cart) {
      await trx('cart').where({goods_id: params.goods_id, user_id: params.user_id}).update({deleted_at: new Date()})
    }
    await trx.commit()
    params.id = id
    orderLogger.info({time: new Date(), orderInfo: params, message: '下单成功'})
    res.json(Response('订单创建成功', 1, params))
  } catch (err) {
    await trx.rollback()
    orderLogger.error({message: '订单创建错误', err})
    return res.status(500).send(Response('订单创建错误', 0))
  }
}

const show = async (params, req, res) => {
  const order = await knex('order').where('id', params.id).whereNull('deleted_at')
  if (!order) {
    return res.status(400).send(Response('订单不存在', 0))
  }
  res.json(Response('订单查询成功', 1, order))
}

const update = async (params, req, res) => {
  const order = await knex('order').where('id', params.id).whereNull('deleted_at').first()
  if (!order) {
    return res.status(400).send(Response('订单不存在', 0))
  }
  if (order.is_fahuo === 1) {
    return res.status(400).send(Response('已发货，不能修改订单哦', 0))
  }
  const updateParams = Object.assign({updated_at: new Date()}, params)
  const updateOrder = await knex('order').where('id', params.id).update(updateParams)
  params.updateOrder = updateOrder
  res.json(Response('订单修改成功', 1, params))
}

const destroy = async (params, req, res) => {
  const order = await knex('order').where('id', params.id).whereNull('deleted_at').first()
  if (!order) {
    return res.status(400).send(Response('订单不存在', 0))
  }
  if (order.is_fahuo === 1) {
    return res.status(400).send(Response('已经发货的订单不能删除哦', 0))
  }
  await knex('order').where('id', params.id).update('deleted_at', new Date())
  res.json(Response('订单删除成功', 1))
}

export {
  index,
  create,
  show,
  update,
  destroy
}
