<template>
  <div>
    <el-container>
      <el-header class="home_header">
      <div class="search"></div>
        <div class="w">
          <el-menu class="el-menu-demo" mode="horizontal" active-text-color="#909399" router>
            <el-menu-item index="/Welcome">主页</el-menu-item>
            <el-menu-item index="/chord">和弦图</el-menu-item>
            <el-menu-item index="/score">吉他谱</el-menu-item>
            <el-menu-item index="/scalemap">音阶图</el-menu-item>
          </el-menu>
          <div class="avatar" @mouseover="mouseAvatar('over')" @mouseleave="mouseAvatar('leave')">
            <div>
              <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            </div>
            <div class="avatarinfo" ref="avatarinfo">
              <div ref="info" v-show="token != null">
                <span class="loginButton" @click="eg('个人中心')">
                  个人中心
                </span>
                <span class="loginButton" @click="eg('账号设置')">
                  账号设置
                </span>
                <span class="loginButton" @click="eg('退出登录')">
                  退出登录
                </span>
              </div>
              <div ref="login" v-show="token == null">
                <span class="loginButton" @click="dialogVisible = true">
                  登录
                </span>
              </div>
            </div>
          </div>
        </div>
      </el-header>
      <el-main class="home_main">
        <!--过渡效果 路由占位符 -->
        <transition name="bounce" mode="out-in">
          <router-view ref="child"></router-view>
        </transition>
      </el-main>
    </el-container>

    <el-dialog title="登录" width="30%" :visible.sync="dialogVisible" :before-close="handleClose">
      <login @loginThen="dialogVisible = false" @register="register"></login>
    </el-dialog>
    <el-dialog title="注册" width="30%" :visible.sync="registerDialogVisible" :before-close="handleClose">
      <register @loginThen="registerDialogVisible = false"></register>
    </el-dialog>
  </div>
</template>

<script>
import Login from './Login'
import Register from './Register'
export default {
  components: { Login, Register },
  data () {
    return {
      dialogVisible: false,
      registerDialogVisible: false,
      token: null
    }
  },
  created () {
    if (window.sessionStorage.token) { // 实时获取token值来判断 后期维护.
      this.token = window.sessionStorage.token
    } else {
      this.token = null
    }
  },
  updated () {
    // if (this.$refs.child.cascaderKeyChange()) { // 重新加载某个组件
    //   console.log(this.$refs.child.cascaderKeyChange)
    // }
    if (window.sessionStorage.token) { // 实时获取token值来判断 后期维护.
      this.token = window.sessionStorage.token
    } else {
      this.token = null
    }
  },
  methods: {
    eg (what) { // 用户信息info中三个按钮触发的事件
      if (what === '退出登录') {
        this.$store.commit('moduleUsers/cleanUser') // 清除Vuex中的用户信息
        this.$store.commit('initializationChordsListOptionsCustomChordChildren') // 退出登录清空自定义和弦相关数据
        window.sessionStorage.clear() // 清除浏览器存储的token凭证
        this.token = null
      }
    },
    mouseAvatar (behavior) { // 鼠标经过头像函数
      if (behavior === 'over') {
        this.$refs.avatarinfo.style.display = 'block'
      } else if (behavior === 'leave') {
        this.$refs.avatarinfo.style.display = 'none'
      } else { return null }
    },
    handleClose (done) { // 登录页面关闭事件
      this.$confirm('确认关闭登录页面？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    register () { // 注册事件发生
      this.dialogVisible = false
      this.registerDialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
  // 路由过渡效果
  .bounce-enter-active{
    animation: bounce-in 0.5s;
  }
  .bounce-leave-active{
    animation: bounce-in 0.5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: translateX(200px);
      opacity: 0;
    }
    100% {
      transform: translateX(0px);
      opacity: 1;
    }
  }
  .home_header{
    background: rgb(51, 51, 51);
    height: 88px !important;
    padding: 0px;
    .search{
      background-color: rgb(68, 68, 68);
      height: 44px;
    }
    div{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    ul {
      background: rgba(255, 255, 255, 0.2);
    }
    .el-menu, .el-menu--horizontal, .el-menu-item {
      border-bottom: 0px;
      background: rgba(255, 255, 255, 0);
      height: 44px;
      line-height: 44px;
    }
    .el-menu-item {
      &:hover{
        background-color: rgb(6, 35, 43);
      }
      &:focus{
        background-color: rgb(6, 35, 43);
      }
    }
    .avatar{// 包裹头像的div
      padding: 0px 30px;
      display: flex;
      position: relative;
      flex-wrap: wrap;
      .el-avatar{// 头像组件
        &:hover{
          cursor:pointer;
        }
      }
      .avatarinfo{// 头像弹出信息div
        display: none;
        position: absolute;
        top: 39px;
        right: -20px;
        width: 100px;
        // height: 100px;
        background-color: #fff;
        box-shadow: 0 2px 10px 0 rgb(0 0 0 / 15%);
        -webkit-box-shadow: 0 2px 10px 0 rgb(0 0 0 / 15%);
        border: 0;
        border-radius: 12px;
        z-index:101;
        div{
          display: flex;
          flex-direction: column;
          padding: 10px 0;
          span {
            padding: 5px 0;
          }
        }
        .loginButton {
          &:hover{
          color: #ccc;
          cursor:pointer;
          }
        }
      }
    }
  }
  .home_main {
  //  width: 1200px;
  //  margin: auto;
  padding:  0px;
  overflow-x: hidden;
  }
</style>
