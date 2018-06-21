import { Login } from '../models/login'
import { validate } from '../common/validate'
import { userLogin } from '../service/login'

const login = async (req, res) => {
  const params = req.body
  try {
    validate(params, Login)
    await userLogin(params, req, res)
  } catch (err) {
    res.status(400).send('登录失败')
  }
}

export {
  login
}
