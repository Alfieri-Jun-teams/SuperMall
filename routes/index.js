import express from 'express'
import { search, createUser, getUser, putUser, delUser } from '../controller/user'
import { adminLogin } from '../controller/admin'
import { createCart, getCart, putCart, destroyCart } from '../controller/cart'
import { createGoods } from '../controller/goods'

const api = express.Router()

// 用户
api.route('/users').get(search)
api.route('/users').post(createUser)
api.route('/users/:id').get(getUser)
api.route('/users/:id').put(putUser)
api.route('/users/:id').delete(delUser)

// 管理员登录
api.route('/admin/login').post(adminLogin)

// 购物车
// api.route('/cart').get(search)
api.route('/cart').post(createCart)
api.route('/cart/:id').get(getCart)
api.route('/cart/:id').put(putCart)
api.route('/cart/:id').delete(destroyCart)

// 商品
api.route('/goods').post(createGoods)

export default api
