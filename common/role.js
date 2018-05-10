import { Response } from './Response'

const adminRole = async (req, res, next) => {
  let account = req.session
  if (!account) {
    return res.status(400).send(Response('请登录，谢谢', 0))
  }

  if (account.user_type !== 'admin') {
    return res.status(400).send(Response('权限不够，请联系客服', 0))
  }

  if (account.user_type === 'admin') {
    next()
  }
}

export {
  adminRole
}
