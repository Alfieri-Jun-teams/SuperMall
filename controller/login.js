import { knex } from '../knex/mysql'
import { Response } from '../common/Response'
import { secret } from '../config'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import Base64 from 'crypto-js/enc-base64'
import SHA256 from 'crypto-js/sha256'
import { loginLogger } from '../common/tracerlog'

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
    loginLogger.log(params.phone + '登录成功')
    req.session.account = account
    // logger.info({time: new Date(), userLogin: params.phone, message: '用户登录成功'})
    return res.status(200).send(Response('用户验证成功', 1, createToken(account.phone)))
  }
  loginLogger.error(params.phone + '登录失败')
  return res.status(400).send(Response('用户验证失败', '0'))
}

export {
  login
}
