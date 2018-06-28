import express from 'express'
// controller
import * as userController from '../controller/user'
import * as loginController from '../controller/login'
import * as cartController from '../controller/cart'
import * as goodsController from '../controller/goods'
import * as orderController from '../controller/order'

import { roles } from '../common/role'

const api = express.Router()

// 用户
api.route('/users').get(roles(['admin']), userController.index)
api.route('/users').post(userController.create)
api.route('/users/:id').get(userController.show)
api.route('/users/:id').put(userController.update)
api.route('/users/:id').delete(userController.destroy)

// 账号登录
api.route('/login').post(loginController.login)

// 购物车
api.route('/cart').get(roles(['admin', 'user']), cartController.index)
api.route('/cart').post(roles(['admin', 'user']), cartController.create)
api.route('/cart/:id').get(roles(['admin', 'user']), cartController.show)
api.route('/cart/:id').put(roles(['admin', 'user']), cartController.update)
api.route('/cart/:id').delete(roles(['admin', 'user']), cartController.destroy)

// 商品 (需要管理员权限)
api.route('/goods').get(roles(['admin']), goodsController.index)
api.route('/goods').post(roles(['admin']), goodsController.create)
api.route('/Goods/:id').get(roles(['admin']), goodsController.show)
api.route('/Goods/:id').put(roles(['admin']), goodsController.update)
api.route('/Goods/:id').delete(roles(['admin']), goodsController.destroy)

// 订单
api.route('/order').get(roles(['admin', 'user']), orderController.index)
api.route('/order').post(roles(['admin', 'user']), orderController.create)
api.route('/order/:id').get(roles(['admin', 'user']), orderController.show)
api.route('/order/:id').put(roles(['admin', 'user']), orderController.update)
api.route('/order/:id').delete(roles(['admin', 'user']), orderController.destroy)

export default api
