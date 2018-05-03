import express from 'express'
import { search, createUser, getUser, putUser, delUser } from '../controller/user'

const api = express.Router()

// 用户
api.route('/users').get(search)
api.route('/users').post(createUser)
api.route('/users/:id').get(getUser)
api.route('/users/:id').put(putUser)
api.route('/users/:id').delete(delUser)

export default api
