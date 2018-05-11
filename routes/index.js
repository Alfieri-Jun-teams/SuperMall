import express from 'express'
import { adminRole, userRole } from '../common/role'
import { searchUser, createUser, getUser, putUser, delUser } from '../controller/user'
import { login } from '../controller/login'
import { searchCart, createCart, getCart, putCart, destroyCart } from '../controller/cart'
import { searchGoods, createGoods, getGoods, putGoods, destroyGoods } from '../controller/goods'
import { searchOrder, createOrder, getOrder, putOrder, destroyOrder } from '../controller/order'

const api = express.Router()

// 用户
api.route('/users').get(adminRole, searchUser)
api.route('/users').post(createUser)
api.route('/users/:id').get(userRole, getUser)
api.route('/users/:id').put(userRole, putUser)
api.route('/users/:id').delete(userRole, delUser)

// 账号登录
api.route('/account/login').post(login)

// 购物车
api.route('/cart').get(userRole, searchCart)
api.route('/cart').post(userRole, createCart)
api.route('/cart/:id').get(userRole, getCart)
api.route('/cart/:id').put(userRole, putCart)
api.route('/cart/:id').delete(userRole, destroyCart)

// 商品 (需要管理员权限)
api.route('/goods').get(adminRole, searchGoods)
api.route('/goods').post(adminRole, createGoods)
api.route('/Goods/:id').get(adminRole, getGoods)
api.route('/Goods/:id').put(adminRole, putGoods)
api.route('/Goods/:id').delete(adminRole, destroyGoods)

// 订单
api.route('/order').get(userRole, searchOrder)
api.route('/order').post(userRole, createOrder)
api.route('/order/:id').get(userRole, getOrder)
api.route('/order/:id').put(userRole, putOrder)
api.route('/order/:id').delete(userRole, destroyOrder)

export default api
