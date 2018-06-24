import { User } from '../models/user'
import { validate } from '../common/validate'
import * as userService from '../service/user'

// 数据分页功能还未添加
const index = async (req, res) => {
  const params = req.query
  await userService.index(params, req, res)
}

const create = async (req, res) => {
  const params = req.body
  try {
    validate(params, User)
    await userService.create(params, req, res)
  } catch (err) {
    res.status(400).send(err)
  }
}

const show = async (req, res) => {
  const params = req.params
  await userService.show(params, req, res)
}

const update = async (req, res) => {
  const updateUser = Object.assign({updated_at: new Date()}, req.body)
  const params = Object.assign(req.body, req.params)
  await userService.update(updateUser, params, req, res)
}

const destroy = async (req, res) => {
  const params = req.params
  await userService.destroy(params, req, res)
}

export {
  index,
  create,
  show,
  update,
  destroy
}
