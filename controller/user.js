import { User } from '../models/user'
import Joi from 'joi'
import { index, create, show, update, destroy } from '../service/user'

// 数据分页功能还未添加
const searchUser = async (req, res) => {
  const params = req.query
  index(params, req, res)
}

const createUser = async (req, res) => {
  const params = req.body
  Joi.validate(params, User)
  create(params, req, res)
}

const getUser = async (req, res) => {
  const params = {id: req.params.id}
  show(params, req, res)
}

const putUser = async (req, res) => {
  const updateUser = Object.assign({updated_at: new Date()}, req.body)
  const params = Object.assign(req.body, req.params)
  update(updateUser, params, req, res)
}

const delUser = async (req, res) => {
  destroy(req, res)
}

export {
  searchUser,
  createUser,
  getUser,
  putUser,
  delUser
}
