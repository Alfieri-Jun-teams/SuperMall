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
    res.status(400).send('创建商品错误')
  }
}

const show = async (req, res) => {
  const params = req.params
  try {
    await goodsService.show(params, req, res)
  } catch (err) {
    res.status(400).send('商品详情错误')
  }
}

const update = async (req, res) => {
  const params = Object.assign(req.params, req.body)
  try {
    await goodsService.update(params, req, res)
  } catch (err) {
    res.status(400).send('商品更新错误')
  }
}

const destroy = async (req, res) => {
  const params = req.params
  try {
    await goodsService.destroy(params, req, res)
  } catch (err) {
    res.status(400).send('商品删除错误')
  }
}

export {
  index,
  create,
  show,
  update,
  destroy
}
