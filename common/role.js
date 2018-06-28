import { Response } from './Response'
import assert from 'assert'

const roles = options => {
  return async function role (req, res, next) {
    assert(typeof options === 'string' || Array.isArray(options),
      'must set parameters as string or array type'
    )
    if (typeof options.roles === 'string') options = [options]
    if (!req.session.account) return res.status(403).send(Response('未登录', 0))
    if (options.includes(req.session.account.user_type)) {
      await next()
    } else {
      return res.status(401).send(Response('没有权限', 0))
    }
  }
}

const needRole = (roles) => {
  return async function role (req, res, next) {
    if (!req.session.account) return res.status(403).send(Response('未登录', 0))
    if (!Array.isArray(roles)) roles = Array.from(arguments)
    const checked = roles.includes(req.session.account.user_type)
    if (!checked) return res.status(401).send(Response('没有权限', 0))
    await next()
  }
}

export {
  roles,
  needRole
}
