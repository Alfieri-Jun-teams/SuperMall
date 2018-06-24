import { Cart } from '../models/cart'
import { validate } from '../common/validate'
import * as cartService from '../service/cart'

const index = async (req, res) => {
  const params = req.query
  await cartService.index(params, req, res)
}

const create = async (req, res) => {
  const params = req.body
  try {
    validate(params, Cart)
    await cartService.create(params, req, res)
  } catch (err) {
    res.status(400).send('购物车新建错误')
  }
}

const show = async (req, res) => {
  const params = req.params
  try {
    await cartService.show(params, req, res)
  } catch (err) {
    res.status(400).send('购物车不存在')
  }
}

const update = async (req, res) => {
  const params = Object.assign(req.body, req.params)
  try {
    await cartService.update(params, req, res)
  } catch (err) {
    res.status(400).send('购物车更新失败')
  }
}

const destroy = async (req, res) => {
  const params = req.params
  try {
    await cartService.destroy(params, req, res)
  } catch (err) {
    res.status(400).send('购物车删除失败')
  }
}

export {
  index,
  create,
  show,
  update,
  destroy
}
