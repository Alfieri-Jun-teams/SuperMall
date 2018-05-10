import jwt from 'jsonwebtoken'
import { firstSecret } from '../config'
import { Response } from './Response'

const verify = async (req, res, next) => {
  const token = req.headers['x-access-token']
  if (token) {
    jwt.verify(token, firstSecret, (err, payload) => {
      if (err) {
        return res.status(400).send(Response('用户验证失败', 0))
      } else {
        next()
      }
    })
  } else {
    return res.status(400).send(Response('token失败', 0))
  }
}

export {
  verify
}
