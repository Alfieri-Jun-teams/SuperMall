import { knex } from '../knex/mysql'
import { returnClientResponse } from '../common/returnClientResponse'

const createOrder = async (req, res) => {
  const params = req.body
  const [id] = await knex('order').insert(params)

  params.id = id
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

  const updateParams = Object.assign({updated_at: new Date()}, params)
  const updateOrder = await knex('order').where('id', params.id).update(updateParams)

  params.updateOrder = updateOrder
  res.json(returnClientResponse('订单修改成功', 1, params))
}

// 删除订单先不写

export {
  createOrder,
  getOrder,
  putOrder
}
