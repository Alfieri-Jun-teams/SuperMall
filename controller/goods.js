import { knex } from '../knex/mysql'
import { returnClientResponse } from '../common/returnClientResponse'
import { getSortSql } from '../common/sort'
import { goods } from '../models/goods'
import validate from 'express-validation'

const searchGoods = async (req, res) => {
  const params = req.query

  const sql = await knex('goods').whereNull('deleted_at')

  if (params.price) sql.where('price', params.price)
  if (params.search) {
    sql.where(function () {
      this.where('goods.serial', 'like', `%${params.search}%`).orWhere('goods.name', 'like', `%${params.search}%`)
    })
  }

  if (params.sort) getSortSql(sql, params.sort)

  const data = await sql

  res.json(returnClientResponse('查询成功', 1, data))
}

const createGoods = async (req, res) => {
  if (!req.session) {
    return res.status(400).send(returnClientResponse('请登录', 0))
  }
  if (req.session && req.session.account.user_type !== 'admin') {
    return res.status(400).send(returnClientResponse('不好意思，您没有权限添加', 0))
  }
  const params = req.body
  validate(goods, params)
  const findGoods = await knex('goods').where('serial', params.serial).whereNull('deleted_at').first()

  if (findGoods) {
    return res.status(400).send(returnClientResponse('该编号商品已存在', 0))
  }

  const [id] = await knex('goods').insert(params)
  params.id = id
  res.json(returnClientResponse('商品新增成功', 1, params))
}

const getGoods = async (req, res) => {
  const id = req.params.id
  const goods = await knex('goods').where('id', id).whereNull('deleted_at').first()

  if (!goods) {
    return res.status(400).send(returnClientResponse('没有找到该商品', 0))
  }

  res.json(returnClientResponse('商品详情', 1, goods))
}

const putGoods = async (req, res) => {
  if (!req.session) {
    return res.status(400).send(returnClientResponse('请登录', 0))
  }
  if (req.session && req.session.account.user_type !== 'admin') {
    return res.status(400).send(returnClientResponse('不好意思，您没有权限添加', 0))
  }
  const params = Object.assign(req.params, req.body)
  const goods = await knex('goods').where('id', params.id).whereNull('deleted_at').first()

  if (!goods) {
    return res.status(400).send(returnClientResponse('没有找到该商品', 0))
  }

  const updateParams = Object.assign({updated_at: new Date()}, params)
  const updateGoods = await knex('goods').where('id', params.id).update(updateParams)
  params.updateGoods = updateGoods
  res.json(returnClientResponse('商品更新成功', 1, params))
}

const destroyGoods = async (req, res) => {
  if (!req.session) {
    return res.status(400).send(returnClientResponse('请登录', 0))
  }
  if (req.session && req.session.account.user_type !== 'admin') {
    return res.status(400).send(returnClientResponse('不好意思，您没有权限添加', 0))
  }
  const id = req.params.id
  const goods = await knex('goods').where('id', id).whereNull('deleted_at').first()

  if (!goods) {
    return res.status(400).send(returnClientResponse('该商品不存在，请在确定商品一定存在的时候，进行此操作', 0))
  }

  await knex('goods').where('id', id).update('deleted_at', new Date())
  res.json(returnClientResponse('删除成功', 1))
}

export {
  searchGoods,
  createGoods,
  getGoods,
  putGoods,
  destroyGoods
}
