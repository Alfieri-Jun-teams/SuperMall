import { Login } from '../models/login'
import Joi from 'joi'
import { userLogin } from '../service/login'

const login = async (req, res) => {
  const params = req.body
  Joi.validate(params, Login)
  userLogin(params, req, res)
}

export {
  login
}
