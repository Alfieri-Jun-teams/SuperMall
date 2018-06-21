import { Login } from '../models/login'
import { validate } from '../common/validate'
import { userLogin } from '../service/login'

const login = async (req, res) => {
  const params = req.body
  try {
    console.log(Login)
    validate(params, Login)
    console.log('111111')
    await userLogin(params, req, res)
  } catch (err) {
    res.status(400).send(err)
  }
}

export {
  login
}
