import { model } from '../models/cart'
import { validate } from '../common/validate'
import { index, create, show, update, destroy } from '../service/cart'

const searchCart = async (req, res) => {
  const params = req.query
  index(params, req, res)
}

const createCart = async (req, res) => {
  const params = req.body
  try {
    await validate(params, model)
    await create(params, req, res)
  } catch (err) {
    res.status(400).send(err)
  }
}

const getCart = async (req, res) => {
  const params = req.params.id
  show(params, req, res)
}

const putCart = async (req, res) => {
  const params = Object.assign(req.body, req.params)
  update(params, req, res)
}

const destroyCart = async (req, res) => {
  const params = req.params.id
  destroy(params, req, res)
}

export {
  searchCart,
  createCart,
  getCart,
  putCart,
  destroyCart
}
