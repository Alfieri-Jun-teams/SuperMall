import { model } from '../models/login'
import { validate } from '../common/validate'
import { userLogin } from '../service/login'

const login = async (req, res) => {
  const params = req.body
  try {
    await validate(params, model)
    await userLogin(params, req, res)
  } catch (err) {
    res.status(400).send(err)
  }
}

export {
  login
}
