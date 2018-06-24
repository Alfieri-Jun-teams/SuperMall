import { Goods } from '../models/goods'
import { validate } from '../common/validate'
import * as goodsService from '../service/goods'

const index = async (req, res) => {
  const params = req.query
  await goodsService.index(params, req, res)
}

const create = async (req, res) => {
  const params = req.body
  try {
    validate(params, Goods)
    await goodsService.create(params, req, res)
  } catch (err) {
    res.status(400).send(err)
  }
}

const show = async (req, res) => {
  const params = req.params.id
  await goodsService.show(params, req, res)
}

const update = async (req, res) => {
  const params = Object.assign(req.params, req.body)
  await goodsService.update(params, req, res)
}

const destroy = async (req, res) => {
  const params = req.params.id
  await goodsService.destroy(params, req, res)
}

export {
  index,
  create,
  show,
  update,
  destroy
}
