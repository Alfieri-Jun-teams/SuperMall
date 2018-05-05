import jwt from 'jsonwebtoken'
import { secret } from '../config'
import { returnClientResponse } from './returnClientResponse'

const verify = async (req, res, next) => {
  const token = req.headers['x-access-token']
  if (token) {
    jwt.verify(token, secret, (err, payload) => {
      if (err) {
        return res.status(400).send(returnClientResponse('用户验证失败', 0))
      } else {
        next()
      }
    })
  } else {
    return res.status(400).send(returnClientResponse('token失败', 0))
  }
}

export {
  verify
}
