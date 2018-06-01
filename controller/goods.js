import { Goods } from '../models/goods'
import Joi from 'joi'
import { index, create, show, update, destroy } from '../service/goods'

const searchGoods = async (req, res) => {
  const params = req.query
  index(params, req, res)
}

const createGoods = async (req, res) => {
  const params = req.body
  Joi.validate(params, Goods)
  create(params, req, res)
}

const getGoods = async (req, res) => {
  const params = req.params.id
  show(params, req, res)
}

const putGoods = async (req, res) => {
  const params = Object.assign(req.params, req.body)
  update(params, req, res)
}

const destroyGoods = async (req, res) => {
  const params = req.params.id
  destroy(params, req, res)
}

export {
  searchGoods,
  createGoods,
  getGoods,
  putGoods,
  destroyGoods
}
