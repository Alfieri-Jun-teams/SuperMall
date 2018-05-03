import { knex } from '../knex/mysql'
import { returnClientResponse } from '../common/returnClientResponse'

const createGoods = async (req, res) => {
  const params = req.body
  const goods = await knex('goods').where('serial', params.serial).whereNull('deleted_at').first()

  if (goods) {
    return res.status(400).send(returnClientResponse('该编号已存在', 0))
  }

  const [id] = await knex('goods').insert(params)
  params.id = id
  res.json(returnClientResponse('商品新增成功', 1, params))
}

export {
  createGoods
}
