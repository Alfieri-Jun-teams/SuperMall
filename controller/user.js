import { knex } from '../knex/mysql'
import { user, userValidate } from '../models/user'
import { getSortSql } from '../common/sort'
import { returnClientResponse } from '../common/returnClientResponse'

import { logger } from '../common/log'

const search = async (req, res) => {
  const params = req.query
  userValidate(params, user)

  const sql = await knex('users').whereNull('deleted_at')
  if (params.phone) sql.where('users.phone', params.phone)
  if (params.password) sql.where('users.password', params.password)

  if (params.sort) getSortSql(sql, params.sort)

  const data = await sql

  res.json(returnClientResponse('查询成功', 1, data))
}

const createUser = async (req, res) => {
  try {
    const params = req.body
    userValidate(params, user)

    const exist = await knex('users').where({phone: params.phone}).whereNull('deleted_at').first()
    if (exist) {
      return res.status(400).send(returnClientResponse('用户已存在', 0, exist))
    }

    const [id] = await knex('users').insert(params)
    params.id = id

    logger.info({time: new Date(), userInfo: params, message: '用户创建成功'})
    res.json(returnClientResponse('用户创建成功', 1, params))
  } catch (err) {
    logger.error({time: new Date(), message: '用户创建错误', err})
    return res.status(500).send(returnClientResponse('服务端错误', 0))
  }
}

const getUser = async (req, res) => {
  const params = {_id: req.params.id}
  const user = await knex('users').where(params).whereNull('deleted_at').first()

  res.json(returnClientResponse('用户查询成功', 1, user))
}

const putUser = async (req, res) => {
  const updateUser = Object.assign({updated_at: new Date()}, req.body)
  const params = Object.assign(req.body, req.params)
  const exist = await knex('users').where({_id: params.id}).whereNull('deleted_at').first()

  if (!exist) {
    return res.status(400).send(returnClientResponse('用户不存在', 0))
  }

  const updateResult = await knex('users').where({_id: params.id}).update(updateUser)

  updateUser.updateResult = updateResult

  res.json(returnClientResponse('用户信息修改成功', 1, updateUser))
}

const delUser = async (req, res) => {
  const exist = await knex('users').where({_id: req.params.id}).whereNull('deleted_at').first()

  if (!exist) {
    return res.status(400).send(returnClientResponse('用户不存在', 0))
  }

  const deleteUser = await knex('users')
    .where({_id: req.params.id})
    .update({deleted_at: new Date()})

  res.json(returnClientResponse('用户已删除', 1, deleteUser))
}

export {
  search,
  createUser,
  getUser,
  putUser,
  delUser
}
