const db = require('../db/index')// api_/my/userinfo3数据库查询操作

exports.getUserInfo = (req, res) =>{//获取用户基本信息路由 api_/my/userinfo2router_handle抽取函数
  //数据库操作 api_/my/userinfo3数据库查询操作
  const sql = 'select id, username, nickname, email ,user_pic from `my_db_01`.`ev_users` where id = ?'
  db.query(sql, req.user.id, (err, results) => {//Token解析成功之后会为req对象挂载一个user属性。 api_/my/userinfo3数据库查询操作
    if(err){// 执行SQL语句失败
      return res.cc(err)
    }
    if(results.length !==1){// 执行SQL语句成功但查询结果可能为空
      return res.cc('获取用户信息失败！')
    }
    res.send({// 用户信息获取成功
      status: 200,
      message:'获取用户信息成功',
      data: results[0],
    })
  })
}

exports.updataUserInfo = (req, res) =>{//更新用户基本信息路由 api_/my/userinfo4router_handle抽取处理函数
  // 数据库操作
  const sqlStr_update = 'UPDATE `my_db_01`.`ev_users` SET ? WHERE (`id` = ?)'
  db.query(sqlStr_update, [req.body, req.body.id], (err, results) => {
    if(err){// 执行SQL语句失败
      return res.cc(err)
    }
    // 执行SQL语句成功但是影响的函数不为1
    if(results.affectedRows !== 1){
      res.cc('修改用户信息失败')
    }
    // 执行成功
    res.cc('修改用户信息成功！',0)
  })
}