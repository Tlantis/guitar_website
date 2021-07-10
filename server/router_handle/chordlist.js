const db = require('../db/index')// 导入数据库操作模块
const userdb = require('../db/userdb')

exports.getchordlist = (req, res) =>{ // 获取基础和弦函数
    const sql = 'select * from `my_db_01`.`resume_chord`'//要执行的sql语句
    db.query(sql,  (err, results) => {
        if(err){// 执行SQL语句失败
            return res.cc(err)
        }
        if(results.length ==0){// 执行成功但是查询结果为空
            console.log(results);
            return res.cc('获取和弦信息失败!')
        }
        res.send({// 获取成功时
            status: 200,
            message: '获取和弦信息成功',
            data: results
        })
    })
}

exports.getCustomChordlist = (req, res) =>{ // 获取自定义和弦函数
  const username = req.body.username
  const sql = 'select * from `?_chord`' //要执行的sql语句
  userdb.query(sql, username, (err, results) => {
        if(err){// 执行SQL语句失败
            return res.cc(err)
        }
        if(results.length ==0){// 执行成功但是查询结果为空
            console.log(results);
            return res.cc('获取自定义和弦信息失败!')
        }
        res.send({// 获取成功时
            status: 200,
            message: '获取自定义和弦信息成功',
            data: results,
        })
    })
}

exports.setChordList = (req, res) =>{ // 添加和弦函数
  // 以下是查询和弦是否存在
  const Chord = req.body
  const selectData = [
    Chord.username,
    Chord.name_chord
  ]
  const sql_select = 'select * from `?_chord` where `name_chord`=?'//要执行的sql语句
  userdb.query(sql_select, selectData, (err, results) => {
    if (err) {
      return res.cc('查询失败')
    }
    if (results.length > 0) {
      return res.cc('和弦已存在')
    }
    //以下是添加和弦信息
    const data = [
      Chord.username,
      Chord.name_chord,
      Chord.phonemicPoint_chord,
      Chord.pressHorizontally_chord,
      Chord.grade_chord,
      Chord.series,
      Chord.series_id
    ]
    const sql_insert = 'INSERT INTO `?_chord` (`name_chord`, `phonemicPoint_chord`, `pressHorizontally_chord`, `grade_chord`,`series`, `series_id` ) VALUES (?, ?, ?, ?, ?, ?);'
    userdb.query(sql_insert, data, (err, results) => {
      if (err) {
        return res.cc(err+'添加和弦失败')
      }
      if (results) {
        res.send({// 添加成功时
          status: 200,
          message: '添加和弦成功',
          data: Chord
        })
      }
    })
  })
}

exports.deleteChordList = (req, res) =>{ // 删除和弦函数
}

exports.updateChordList = (req, res) =>{ // 修改和弦函数
}