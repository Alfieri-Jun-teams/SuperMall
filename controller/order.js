import { Order } from '../models/order'
import { validate } from '../common/validate'
import * as orderService from '../service/order'

const index = async (req, res) => {
  const params = req.query
  await orderService.index(params, req, res)
}

const create = async (req, res) => {
  const params = req.body
  try {
    validate(params, Order)
    await orderService.create(params, req, res)
  } catch (err) {
    res.status(400).send('订单创建错误')
  }
}

const show = async (req, res) => {
  const params = req.params
  try {
    await orderService.show(params, req, res)
  } catch (err) {
    res.status(400).send('订单获取错误')
  }
}

const update = async (req, res) => {
  const params = Object.assign(req.params, req.body)
  try {
    await orderService.update(params, req, res)
  } catch (err) {
    res.status(400).send('订单更新错误')
  }
}

const destroy = async (req, res) => {
  const params = req.params
  try {
    await orderService.destroy(params, req, res)
  } catch (err) {
    res.status(400).send('订单删除错误')
  }
}

export {
  index,
  create,
  show,
  update,
  destroy
}
