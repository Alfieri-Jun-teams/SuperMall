import { knex } from '../config/index'
import { Response } from '../common/Response'
import { getSortSql } from '../common/sort'
import { goodsLogger } from '../common/tracerlog'
import * as base from '../common/baseService'

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
  const goods = await base.show('goods', params)
  res.json(Response('商品详情', 1, goods))
}

const update = async (params, req, res) => {
  const updateParams = Object.assign({updated_at: new Date()}, params)
  const result = await base.update('goods', updateParams)
  res.json(Response('商品更新成功', 1, result))
}

const destroy = async (params, req, res) => {
  const result = await base.destroy('goods', params)
  res.json(Response('删除成功', 1, result))
}

export {
  index,
  create,
  show,
  update,
  destroy
}
