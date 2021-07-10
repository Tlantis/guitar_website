// api_/my/userinfo1初始化router
const express = require('express')
const router = express.Router()
const userinfo_handler = require('../router_handle/userinfo')// 导入 router 方法 api_/my/userinfo2router_handle抽取函数

const expressJoi = require('@escook/express-joi')// 导入验证数据合法性的中间件
const {update_userinfo_schema} = require('../schema/user')// 导入需要的验证规则对象

router.get('/userinfo', userinfo_handler.getUserInfo)// 查询路由 api_/my/userinfo1初始化查询router
router.post('/userinfo',expressJoi(update_userinfo_schema), userinfo_handler.updataUserInfo)// 更新路由 api_/my/userinfo4初始化更新router api_/my/userinfo5定义更新验证规则

module.exports = router 