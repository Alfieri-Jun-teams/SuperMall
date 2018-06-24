import { knex } from '../config/index'

const exists = async (table, params) => {
  const entity = await knex(table)
    .where(params)
    .whereNull('deleted_at')
    .first()

  if (!entity) throw new Error('NO EXISTS')

  return entity
}

const create = async (table, params) => {
  const [id] = await knex(table).insert(params)
  return id
}

const show = async (table, params) => {
  const id = params.id
  let condition = {id: id}
  const result = await exists(table, condition)
  return result
}

const update = async (table, params) => {
  const id = params.id
  let condition = {id: id}
  await exists(table, condition)
  const updateResult = await knex(table)
    .where('id', params.id)
    .update(params)
  params.updateResult = updateResult
  return params
}

const destroy = async (table, params) => {
  const id = params.id
  let condition = {id: id}
  await exists(table, condition)
  const destroyResult = await knex(table)
    .where(id, id)
    .update({deleted_at: new Date()})
  return destroyResult
}

export {
  exists,
  create,
  show,
  update,
  destroy
}
