import { knex } from '../knex/mysql'
import { returnClientResponse } from '../common/returnClientResponse'
import { secret } from '../config'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import Base64 from 'crypto-js/enc-base64'
import SHA256 from 'crypto-js/sha256'
import { logger } from '../common/log'

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
    logger.info({time: new Date(), userLogin: params.phone, message: '用户登录成功'})
    return res.status(200).send(returnClientResponse('用户验证成功', 1, createToken(account.phone)))
  }
  return res.status(400).send(returnClientResponse('用户验证失败', '0'))
}

export {
  login
}
