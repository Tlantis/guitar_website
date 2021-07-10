const express = require('express')
const router = express.Router()
const chordlist_handler = require('../router_handle/chordlist')

const expressJoi = require('@escook/express-joi')

router.get('/chordlist', chordlist_handler.getchordlist)
// router.post('/chordinfo',expressJoi(update_userinfo_schema), userinfo_handler.updataUserInfo)
router.post('/getCustomChordlist', chordlist_handler.getCustomChordlist)

router.post('/setChordList', chordlist_handler.setChordList) // 添加自定义和弦路由

module.exports = router 