import { knex } from '../knex/mysql'
import { returnClientResponse } from '../common/returnClientResponse'
import { secret } from '../config'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import Base64 from 'crypto-js/enc-base64'
import SHA256 from 'crypto-js/sha256'

const createToken = phone => {
  let payload = {
    sub: phone,
    exp: moment().add(7, 'day').unix()
  }
  return jwt.sign(payload, secret)
}

const login = async (req, res) => {
  const params = req.body
  const compare = Base64.stringify(SHA256(params.password))
  const account = await knex('account').where('phone', params.phone).first()
  if (account.password === compare) {
    req.session.account = account
    res.json(returnClientResponse('用户验证成功', 1, createToken(account.phone)))
  }
  res.status(400).send(returnClientResponse('用户验证失败', '0'))
}

export {
  login
}
