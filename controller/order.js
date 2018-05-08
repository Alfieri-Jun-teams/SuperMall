import { knex } from '../knex/mysql'
import { returnClientResponse } from '../common/returnClientResponse'
// import { logger } from '../common/log'
import { getSortSql } from '../common/sort'
import { order } from '../models/order'
import validate from 'express-validation'
import { orderLogger } from '../common/tracerlog'

const searchOrder = async (req, res) => {
  const params = req.query

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

  res.json(returnClientResponse('查询成功', 1, data))
}

const createOrder = async (req, res) => {
  const params = req.body
  validate(order, params)
  const [id] = await knex('order').insert(params)

  params.id = id
  orderLogger.info({time: new Date(), orderInfo: params, message: '下单成功'})
  res.json(returnClientResponse('订单创建成功', 1, params))
}

const getOrder = async (req, res) => {
  const id = req.params.id
  const order = await knex('order').where('id', id).whereNull('deleted_at')

  if (!order) {
    return res.status(400).send(returnClientResponse('订单不存在', 0))
  }

  res.json(returnClientResponse('订单查询成功', 1, order))
}

// 如果已发货 不能修改订单（未实现）
const putOrder = async (req, res) => {
  const params = Object.assign(req.params, req.body)
  const order = await knex('order').where('id', params.id).whereNull('deleted_at').first()

  if (!order) {
    return res.status(400).send(returnClientResponse('订单不存在', 0))
  }

  if (order.is_fahuo === 1) {
    return res.status(400).send(returnClientResponse('已发货，不能修改订单哦', 0))
  }

  const updateParams = Object.assign({updated_at: new Date()}, params)
  const updateOrder = await knex('order').where('id', params.id).update(updateParams)

  params.updateOrder = updateOrder
  res.json(returnClientResponse('订单修改成功', 1, params))
}

// 删除订单先不写
const destroyOrder = async (req, res) => {
  const id = req.params.id
  const order = await knex('order').where('id', id).whereNull('deleted_at').first()

  if (!order) {
    return res.status(400).send(returnClientResponse('订单不存在', 0))
  }

  if (order.is_fahuo === 1) {
    return res.status(400).send(returnClientResponse('已经发货的订单不能删除哦', 0))
  }

  await knex('order').where('id', id).update('deleted_at', new Date())
  res.json(returnClientResponse('订单删除成功', 1))
}

export {
  searchOrder,
  createOrder,
  getOrder,
  putOrder,
  destroyOrder
}
