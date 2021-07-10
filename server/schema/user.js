//api_9验证规则
const joi = require('@hapi/joi') // 导入定义验证规则的包 api_9验证规则

const username = joi.string().alphanum().min(1).max(10).required() // 用户名验证规则 字符串 只能包含大小写字母和数字 最小长度 最大长度 必填项 api_9验证规则
const password = joi.string().pattern(/^[\S]{6,12}$/).required() // 密码验证规则 字符串 正则表达式 必填项 api_9验证规则

const id = joi.number().integer().min(1).required() //数字格式的 整数 最短为1 必填 api_/my/userinfo5定义更新验证规则
const nickname = joi.string().required()// 字符串 必填
const email = joi.string().email().required()// 字符串 emil类型的 必填

exports.reg_login_schema = {// 定义并暴露了验证注册和登录表单数据的规则函数 api_9验证规则
  body: {
    username,
    password,
  },
}

exports.update_userinfo_schema = {// 定义并暴露了验证更新表单数据的规则函数 api_/my/userinfo5定义更新验证规则
  body: {
    id: id,
    nickname,// 简写 api_/my/userinfo5定义更新验证规则
    email,
  },
}