import { knex } from '../config/index'
import { getSortSql } from '../common/sort'
import { Response } from '../common/Response'
import { userLogger } from '../common/tracerlog'
import { firstSecret, lastSecret } from '../config'
import Base64 from 'crypto-js/enc-base64'
import SHA256 from 'crypto-js/sha256'
import _ from 'lodash'
import * as base from '../common/baseService'

const index = async (params, req, res) => {
  const sql = await knex('users').whereNull('deleted_at')
  if (params.phone) sql.where('users.phone', params.phone)
  if (params.sort) getSortSql(sql, params.sort)
  const data = await sql
  res.json(Response('查询成功', 1, data))
}

const create = async (params, req, res) => {
  const exist = await knex('users').where({phone: params.phone}).whereNull('deleted_at').first()
  if (exist) {
    return res.status(400).send(Response('用户已存在', 0, exist))
  }
  const password = firstSecret + params.password + lastSecret
  const saltPassword = Base64.stringify(SHA256(password))
  const userParams = _.omit(params, ['password'])
  const promisify = (fn) => new Promise((resolve, reject) => fn(resolve))
  const trx = await promisify(knex.transaction)
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

const show = async (params, req, res) => {
  const user = await base.show('users', params)
  res.json(Response('用户查询成功', 1, user))
}

const update = async (params, req, res) => {
  const account = req.session.account
  if (account.user_type !== 'user' || account.user_id !== parseInt(params.id)) {
    return res.status(400).send(Response('权限不足', 0))
  }
  const updateUser = Object.assign({updated_at: new Date()}, req.body)
  const result = await base('users', updateUser)
  res.json(Response('用户信息修改成功', 1, result))
}

const destroy = async (params, req, res) => {
  const account = req.session.account
  if (account.user_type !== 'user' || account.user_id !== parseInt(req.params.id)) {
    return res.status(400).send(Response('该账号不是用户权限', 0))
  }
  const id = params.id
  const condition = {id: id}
  await base.exists('users', condition)
  const promisify = (fn) => new Promise((resolve, reject) => fn(resolve))
  const trx = await promisify(knex.transaction)
  try {
    const deleteUser = await trx('users')
      .where({id: req.params.id})
      .update({deleted_at: new Date()})
    await trx('account')
      .where({user_id: req.params.id, user_type: 'user'})
      .update({deleted_at: new Date()})
    await trx.commit()
    res.json(Response('用户已删除', 1, deleteUser))
  } catch (err) {
    await trx.rollback()
    userLogger.error({message: '用户删除错误', err})
    return res.status(500).send(Response('服务端错误', 0))
  }
}

export {
  index,
  create,
  show,
  update,
  destroy
}
