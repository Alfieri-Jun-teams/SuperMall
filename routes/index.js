import express from 'express'
// controller
import * as userController from '../controller/user'
import * as loginController from '../controller/login'
import * as cartController from '../controller/cart'
import * as goodsController from '../controller/goods'
import * as orderController from '../controller/order'

const api = express.Router()

// 用户
api.route('/users').get(userController.index)
api.route('/users').post(userController.create)
api.route('/users/:id').get(userController.show)
api.route('/users/:id').put(userController.update)
api.route('/users/:id').delete(userController.destroy)

// 账号登录
api.route('/login').post(loginController.login)

// 购物车
api.route('/cart').get(cartController.index)
api.route('/cart').post(cartController.create)
api.route('/cart/:id').get(cartController.show)
api.route('/cart/:id').put(cartController.update)
api.route('/cart/:id').delete(cartController.destroy)

// 商品 (需要管理员权限)
api.route('/goods').get(goodsController.index)
api.route('/goods').post(goodsController.create)
api.route('/Goods/:id').get(goodsController.show)
api.route('/Goods/:id').put(goodsController.update)
api.route('/Goods/:id').delete(goodsController.destroy)

// 订单
api.route('/order').get(orderController.index)
api.route('/order').post(orderController.create)
api.route('/order/:id').get(orderController.show)
api.route('/order/:id').put(orderController.update)
api.route('/order/:id').delete(orderController.destroy)

export default api
