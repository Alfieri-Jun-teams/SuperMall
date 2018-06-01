import { knex } from '../knex/mysql'
import { Response } from '../common/Response'
import { getSortSql } from '../common/sort'
import { goodsLogger } from '../common/tracerlog'

const index = async (params, req, res) => {
  const sql = await knex('goods').whereNull('deleted_at')
  if (params.price) sql.where('price', params.price)
  if (params.search) {
    sql.where(function () {
      this.where('goods.serial', 'like', `%${params.search}%`).orWhere('goods.name', 'like', `%${params.search}%`)
    })
  }
  if (params.sort) getSortSql(sql, params.sort)
  const data = await sql
  res.json(Response('查询成功', 1, data))
}

const create = async (params, req, res) => {
  const account = req.session.account
  if (!account) {
    return res.status(400).send(Response('请登录，谢谢', 0))
  }
  if (account.user_type !== 'admin') {
    return res.status(400).send(Response('该账号没有权限', 0))
  }
  const findGoods = await knex('goods').where('serial', params.serial).whereNull('deleted_at').first()
  if (findGoods) {
    return res.status(400).send(Response('该编号商品已存在', 0))
  }
  const [id] = await knex('goods').insert(params)
  params.id = id
  goodsLogger.info({goodsInfo: params, message: '商品添加成功'})
  res.json(Response('商品新增成功', 1, params))
}

const show = async (params, req, res) => {
  const goods = await knex('goods').where('id', params.id).whereNull('deleted_at').first()
  if (!goods) {
    return res.status(400).send(Response('没有找到该商品', 0))
  }
  res.json(Response('商品详情', 1, goods))
}

const update = async (params, req, res) => {
  if (!req.session) {
    return res.status(400).send(Response('请登录', 0))
  }
  if (req.session && req.session.account.user_type !== 'admin') {
    return res.status(400).send(Response('不好意思，您没有权限添加', 0))
  }
  const goods = await knex('goods').where('id', params.id).whereNull('deleted_at').first()
  if (!goods) {
    return res.status(400).send(Response('没有找到该商品', 0))
  }
  const updateParams = Object.assign({updated_at: new Date()}, params)
  const updateGoods = await knex('goods').where('id', params.id).update(updateParams)
  params.updateGoods = updateGoods
  res.json(Response('商品更新成功', 1, params))
}

const destroy = async (params, req, res) => {
  if (!req.session) {
    return res.status(400).send(Response('请登录', 0))
  }
  if (req.session && req.session.account.user_type !== 'admin') {
    return res.status(400).send(Response('不好意思，您没有权限添加', 0))
  }
  const goods = await knex('goods').where('id', params.id).whereNull('deleted_at').first()
  if (!goods) {
    return res.status(400).send(Response('该商品不存在，请在确定商品一定存在的时候，进行此操作', 0))
  }
  await knex('goods').where('id', params.id).update('deleted_at', new Date())
  res.json(Response('删除成功', 1))
}

export {
  index,
  create,
  show,
  update,
  destroy
}
