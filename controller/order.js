import { Order } from '../models/order'
import Joi from 'joi'
import { index, create, show, update, destroy } from '../service/order'

const searchOrder = async (req, res) => {
  const params = req.query
  index(params, req, res)
}

const createOrder = async (req, res) => {
  const params = req.body
  Joi.validate(params, Order)
  create(params, req, res)
}

const getOrder = async (req, res) => {
  const params = req.params.id
  show(params, req, res)
}

const putOrder = async (req, res) => {
  const params = Object.assign(req.params, req.body)
  update(params, req, res)
}

const destroyOrder = async (req, res) => {
  const params = req.params.id
  destroy(params, req, res)
}

export {
  searchOrder,
  createOrder,
  getOrder,
  putOrder,
  destroyOrder
}
