const express = require('express') // 导入 express api_1express
const app = express() // 创建 express 的服务器实例 api_1express

const Joi = require('@hapi/joi') // 导入验证规则的包 api_9验证规则

const cors = require('cors') // 导入 cors 中间件 api_2cors
app.use(cors()) // 配置 cors 中间件 api_2cors

app.use(express.urlencoded({ extended: false })) // 配置解析表单数据的中间件(能解析application/x-www-form-urlencoded) api_3urlencoded

app.use(function(req, res, next) { // 声明一个全局中间件 为所有访问路径的res对象都挂载一个res.cc的函数。api_8优化代码
  res.cc = function(err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err, // instanceof判断err的类型是不是Error对象。
    })
  }
  next()
})

const expressJWT = require('express-jwt') // 解析 token 的中间件 api_login5解析Token字符串
const config = require('./config') // 导入配置文件 api_login5解析Token字符串

// app.use(expressJWT({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({ path: [/^\/api/] }))
  // secret指定秘钥 algorithms: ["HS256"]在6.0版本之后需要指定解密规则 .unless指定了除api外所有的路径都要经过认证 api_login5解析Token字符串

// 路由
const userRouter = require('./router/user') // 导入用户路由模块 api_4router
app.use('/api', userRouter) // 使用用户路由模块  (路径为(根路径)/api/login(router中的路径)) api_4router

const userinfoRouter = require('./router/userinfo') // api_/my/userinfo1初始化router
app.use('/my', userinfoRouter) // api_/my/userinfo1初始化router

const chordlistRouter = require('./router/chordlist') // 导入和弦模块
app.use('/chord', chordlistRouter) // 初始化和弦router

// 错误级别中间件
app.use((err, req, res, next) => {
  if (err instanceof Joi.ValidationError) { // 返回验证失败的错误 api_9验证规则
    return res.cc(err) // 如果不加return 在执行完该次res.cc(err)之后还会继续往下执行会下面的res.cc(err)。服务器会报俩次sent的错误
  }
  if (err.name === 'UnauthorizedError') { // 身份认证失败的错误 api_login5解析Token字符串
    return res.cc('身份认证失败！')
  }
  res.cc(err) // 返回未知错误
})

app.listen(3007, function() { // 调用app.listen 方法，指定端口号并启动web服务器 api_1express
  console.log('api server running at http://127.0.0.1:3007');
})