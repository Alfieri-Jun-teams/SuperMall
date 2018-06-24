import express from 'express'
import { adminRole, userRole } from '../common/role'
import * as userController from '../controller/user'
import { login } from '../controller/login'
import * as cartController from '../controller/cart'
import * as goodsController from '../controller/goods'
import * as orderController from '../controller/order'

const api = express.Router()

// 用户
api.route('/users').get(adminRole, userController.index)
api.route('/users').post(userController.create)
api.route('/users/:id').get(userRole, userController.show)
api.route('/users/:id').put(userRole, userController.update)
api.route('/users/:id').delete(userRole, userController.destroy)

// 账号登录
api.route('/login').post(login)

// 购物车
api.route('/cart').get(userRole, cartController.index)
api.route('/cart').post(userRole, cartController.create)
api.route('/cart/:id').get(userRole, cartController.show)
api.route('/cart/:id').put(userRole, cartController.update)
api.route('/cart/:id').delete(userRole, cartController.destroy)

// 商品 (需要管理员权限)
api.route('/goods').get(adminRole, goodsController.index)
api.route('/goods').post(adminRole, goodsController.create)
api.route('/Goods/:id').get(adminRole, goodsController.show)
api.route('/Goods/:id').put(adminRole, goodsController.update)
api.route('/Goods/:id').delete(adminRole, goodsController.destroy)

// 订单
api.route('/order').get(userRole, orderController.index)
api.route('/order').post(userRole, orderController.create)
api.route('/order/:id').get(userRole, orderController.show)
api.route('/order/:id').put(userRole, orderController.update)
api.route('/order/:id').delete(userRole, orderController.destroy)

export default api
