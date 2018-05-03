import { knex } from '../knex/mysql'
import { returnClientResponse } from '../common/returnClientResponse'
import { secret } from '../config'
import jwt from 'jsonwebtoken'
import moment from 'moment'

const createToken = phone => {
  let payload = {
    sub: phone,
    exp: moment().add(7, 'day').unix()
  }
  return jwt.sign(payload, secret)
}

const adminLogin = async (req, res) => {
  const params = req.body
  const user = await knex('admin').where('phone', params.phone).first()
  if (user.password === params.password) {
    res.json(returnClientResponse('用户验证成功', 1, createToken(user.phone)))
  }
  res.status(400).send(returnClientResponse('用户验证失败', '0'))
}

export {
  adminLogin
}
