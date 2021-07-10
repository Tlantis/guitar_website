
const db = require('../db/index')// 导入数据库操作模块* api_6检测用户名
const userdb = require('../db/userdb')
const bcrypt =  require('bcryptjs')// 导入密码加密包bcryptjs api_7密码加密
const jwt = require('jsonwebtoken')// 导入生成Token的包 api_login4生成Token
const config = require('../config')// 导入全局配置文件 api_login4生成Token

// 注册处理函数 api_5routerHandle
exports.register = (req, res) => {
  const userinfo = req.body  // 获取客户端提交到服务器的用户信息 api_6检测用户名
  console.log(userinfo)
  // if(!userinfo.username || !userinfo.password){  // 对表单中的数据进行合法性校验 api_6检测用户名·
  //   return res.cc(err) //return res.send({ status: 1,message:'用户名和密码不合法' })调用app.js中添加的res.cc进行result处理 api_8优化代码
  // } //使用中间件的方法进行验证的替换。

  //数据库操作
  //查询用户名是否合法
  const sqlStr_select = 'select * from ev_users where `username`=?'  // 定义 SQL语句，查询用户名是否存在 api_6检测用户名
  db.query(sqlStr_select, userinfo.username, (err, results) => {
    if (err) {  // 查询失败报错 api_6检测用户名
      return res.cc('用户名和密码不合法')// return res.send({ status: 1,message:'用户名和密码不合法' })调用app.js中添加的res.cc进行result处理 api_8优化代码
    }
    if (results.length > 0){  //判断用户名是否被占用 如果返回的数据长度大于0则表示存在该用户名 api_6检测用户名
      return res.cc('用户名已存在，请更换其他用户名') // return res.send({ status: 1,message:'用户名已存在，请更换其他用户名' })调用app.js中添加的res.cc进行result处理 api_8优化代码
    }  
    // 调用bcrypt.hashSync()函数对接收到的密码进行加密处理 api_7密码加密
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    // 插入用户
    const user = {username: userinfo.username, password: userinfo.password}
    const sqlStr_insert = 'INSERT INTO `my_db_01`.`ev_users` set ?'
    db.query(sqlStr_insert, user, (err, results) => {
      if(err) {//查询失败报错
        return res.cc(err)// return res.send({ status: 1,message: err.message })  调用app.js中添加的res.cc进行result处理 api_8优化代码
      }
      if(results.affectedRows !== 1){
        return res.cc(err)// return res.send({ status: 1,message:'注册失败 稍后再试。' })调用app.js中添加的res.cc进行result处理 api_8优化代码
      }
        // 注册成功之后 为该用户创建一个单独的表.
      // console.log(setUserChordDb(userinfo.username, res))
      return res.cc('注册成功', 200)//res.send({ status: 0,message:'注册成功。' })调用app.js中添加的res.cc进行result处理 api_8优化代码    
    })
  })
}
exports.setUserChordDb = (req, res) => { // 创建数据库函数
  const userinfo = req.body
  const UserDbName = userinfo.username
  var sql = 'CREATE TABLE `?_chord` ( `id_chord` INT NOT NULL AUTO_INCREMENT, `name_chord` VARCHAR(255) NOT NULL, `phonemicPoint_chord` VARCHAR(255) NOT NULL, `pressHorizontally_chord` TINYINT(1) NOT NULL DEFAULT 0, `grade_chord` VARCHAR(45) NOT NULL DEFAULT "1", `series` VARCHAR(45) NOT NULL DEFAULT "C",`series_id` VARCHAR(45) NOT NULL, PRIMARY KEY (`id_chord`)) COMMENT = "自定义和弦";'
    userdb.query(sql, UserDbName, (err,results)=>{
      if(err){ 
        return res.cc(err)
      }
      return res.cc('创建数据库成功', 0)
    })
}


// 登录处理函数 api_5routerHandle
exports.login = (req, res) => {//exports返回的是模块函数,可以直接调用 
  const userinfo = req.body //接收表单数据 api_login2登录数据查询
  //数据库操作 api_login2登录数据查询
  const sql = 'select * from ev_users where `username`=?'
  db.query(sql, userinfo.username, (err,results) => {
    if(err){
      return res.cc(err)// 执行SQL语句失败 api_login2登录数据查询
    }
    if(results.length !==1) return res.cc(err)// 执行SQL语句成功但是查询的数据条数不等于1 api_login2登录数据查询
    const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)// bcrypt.compareSync密码验证方法 参1是表单提交的密码 参2是数据库查询到的密码。 api_login3密码比对
    if(!compareResult) {// compareResult值为false时密码不正确。 api_login3密码比对
      return res.cc('用户名或密码不正确!')
    }
    const user = {...results[0], password:'', user_pic:''} //...展开运算符 将数组转换为对象。后俩个参数是替换原数据。剔除密码等信息提高token的安全性 api_login4生成Token
    // console.log(user)
    const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn})// 生成token字符串 api_login4生成Token
    res.send({// 响应Token字符串给客户端 api_login4生成Token
      status: 200,
      message: '登录成功！',
      results,
      token: 'Bearer ' + tokenStr,
    })
  })
}