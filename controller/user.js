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
    res.status(400).send('用户创建失败')
  }
}

const show = async (req, res) => {
  const params = req.params
  try {
    await userService.show(params, req, res)
  } catch (err) {
    res.status(400).send('用户详情获取失败')
  }
}

const update = async (req, res) => {
  const params = Object.assign(req.body, req.params)
  try {
    await userService.update(params, req, res)
  } catch (err) {
    res.status(400).send('用户更新错误')
  }
}

const destroy = async (req, res) => {
  const params = req.params
  try {
    await userService.destroy(params, req, res)
  } catch (err) {
    res.status(400).send('用户删除错误')
  }
}

export {
  index,
  create,
  show,
  update,
  destroy
}
