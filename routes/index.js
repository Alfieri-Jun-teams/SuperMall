import express from 'express'
import { search, createUser, getUser, putUser, delUser } from '../controller/user'
import { adminLogin } from '../controller/admin'

const api = express.Router()

// 用户
api.route('/users').get(search)
api.route('/users').post(createUser)
api.route('/users/:id').get(getUser)
api.route('/users/:id').put(putUser)
api.route('/users/:id').delete(delUser)

// 管理员登录
api.route('/admin/login').post(adminLogin)

export default api
