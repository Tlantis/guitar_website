const mysql = require('mysql')// 1.导入mysql模块 api_6mysql

const userdb = mysql.createPool({// 2.建立与MySQL 数据库的连接关系 api_6mysql
  host:'127.0.0.1',
  user:'root',
  password:'admin123',
  database:'user_db' // 存放用户数据的数据库.
})

module.exports = userdb