import express from 'express'
import { searchUser, createUser, getUser, putUser, delUser } from '../controller/user'
import { adminLogin } from '../controller/admin'
import { searchCart, createCart, getCart, putCart, destroyCart } from '../controller/cart'
import { searchGoods, createGoods, getGoods, putGoods, destroyGoods } from '../controller/goods'
import { searchOrder, createOrder, getOrder, putOrder, destroyOrder } from '../controller/order'
import { verify } from '../common/token'

const api = express.Router()

// 用户
api.route('/users').get(searchUser)
api.route('/users').post(createUser)
api.route('/users/:id').get(getUser)
api.route('/users/:id').put(verify, putUser)
api.route('/users/:id').delete(verify, delUser)

// 管理员登录
api.route('/admin/login').post(adminLogin)

// 购物车
api.route('/cart').get(searchCart)
api.route('/cart').post(verify, createCart)
api.route('/cart/:id').get(verify, getCart)
api.route('/cart/:id').put(verify, putCart)
api.route('/cart/:id').delete(verify, destroyCart)

// 商品 (需要管理员权限)
api.route('/goods').get(searchGoods)
api.route('/goods').post(verify, createGoods)
api.route('/Goods/:id').get(getGoods)
api.route('/Goods/:id').put(verify, putGoods)
api.route('/Goods/:id').delete(verify, destroyGoods)

// 订单
api.route('/order').get(verify, searchOrder)
api.route('/order').post(verify, createOrder)
api.route('/order/:id').get(getOrder)
api.route('/order/:id').put(verify, putOrder)
api.route('/order/:id').delete(verify, destroyOrder)

export default api
