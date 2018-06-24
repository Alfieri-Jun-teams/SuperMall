import { Order } from '../models/order'
import { validate } from '../common/validate'
import * as orderService from '../service/order'

const index = async (req, res) => {
  const params = req.query
  orderService.index(params, req, res)
}

const create = async (req, res) => {
  const params = req.body
  try {
    validate(params, Order)
    await orderService.create(params, req, res)
  } catch (err) {
    res.status(400).send(err)
  }
}

const show = async (req, res) => {
  const params = req.params.id
  orderService.show(params, req, res)
}

const update = async (req, res) => {
  const params = Object.assign(req.params, req.body)
  orderService.update(params, req, res)
}

const destroy = async (req, res) => {
  const params = req.params.id
  orderService.destroy(params, req, res)
}

export {
  index,
  create,
  show,
  update,
  destroy
}
