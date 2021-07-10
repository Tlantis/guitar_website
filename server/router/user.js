
const express = require('express') // 导入 express api_4router
const router = express.Router() // 创建router路由实例对象 api_4router
const router_handle = require('../router_handle/user') // 导入 router 方法 api_5routerHandle

const expressJoi = require('@escook/express-joi')// 导入验证数据的中间件 api_9验证规则
const {reg_login_schema} = require('../schema/user')// 导入需要的验证规则对象 api_9验证规则

// router.post('/reguser', expressJoi(reg_login_schema), router_handle.regUser) // 注册新用户 api_4router api_9验证规则
// router.post('/login', expressJoi(reg_login_schema), router_handle.login) // 登录 api_4router api_login2登录验证规则

router.post('/register', router_handle.register)
router.post('/login', router_handle.login)
router.post('/setUserChordDb', router_handle.setUserChordDb)

module.exports = router // 返回的是模块对象本身，返回的是一个类.需要new对象之后才可以调用 api_4router 