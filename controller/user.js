import { knex } from '../knex/mysql'
import { user } from '../models/user'
import { getSortSql } from '../common/sort'
import { Response } from '../common/Response'
// import { logger } from '../common/log'
import validate from 'express-validation'
import { userLogger } from '../common/tracerlog'
import { firstSecret, lastSecret } from '../config'
import Base64 from 'crypto-js/enc-base64'
import SHA256 from 'crypto-js/sha256'
import _ from 'lodash'

const searchUser = async (req, res) => {
  const params = req.query

  const sql = await knex('users').whereNull('deleted_at')
  if (params.phone) sql.where('users.phone', params.phone)

  if (params.sort) getSortSql(sql, params.sort)

  const data = await sql

  res.json(Response('查询成功', 1, data))
}

const createUser = async (req, res) => {
  const params = req.body
  validate(user, params)
  const exist = await knex('users').where({phone: params.phone}).whereNull('deleted_at').first()
  if (exist) {
    return res.status(400).send(Response('用户已存在', 0, exist))
  }
  const password = firstSecret + params.password + lastSecret
  const saltPassword = Base64.stringify(SHA256(password))
  const userParams = _.omit(params, ['password'])
  const trx = await knex.transaction()
  try {
    const [id] = await trx('users').insert(userParams)
    const [insertAccount] = await trx('account').insert({
      phone: params.phone,
      password: saltPassword,
      user_type: 'user',
      user_id: id
    })
    await trx.commit()
    userParams.id = id
    userParams.insertAccount = insertAccount
    userLogger.info({userInfo: userParams, message: '用户创建成功'})
    res.json(Response('用户创建成功', 1, userParams))
  } catch (err) {
    await trx.rollback()
    userLogger.error({message: '用户创建错误', err})
    return res.status(500).send(Response('服务端错误', 0))
  }
}

const getUser = async (req, res) => {
  const params = {_id: req.params.id}
  const user = await knex('users').where(params).whereNull('deleted_at').first()

  res.json(Response('用户查询成功', 1, user))
}

const putUser = async (req, res) => {
  const updateUser = Object.assign({updated_at: new Date()}, req.body)
  const params = Object.assign(req.body, req.params)
  const exist = await knex('users').where({_id: params.id}).whereNull('deleted_at').first()

  if (!exist) {
    return res.status(400).send(Response('用户不存在', 0))
  }

  const updateResult = await knex('users').where({_id: params.id}).update(updateUser)

  updateUser.updateResult = updateResult

  res.json(Response('用户信息修改成功', 1, updateUser))
}

const delUser = async (req, res) => {
  const exist = await knex('users').where({_id: req.params.id}).whereNull('deleted_at').first()

  if (!exist) {
    return res.status(400).send(Response('用户不存在', 0))
  }

  const deleteUser = await knex('users')
    .where({_id: req.params.id})
    .update({deleted_at: new Date()})

  res.json(Response('用户已删除', 1, deleteUser))
}

export {
  searchUser,
  createUser,
  getUser,
  putUser,
  delUser
}
