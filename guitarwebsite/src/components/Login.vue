<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 登录表单区域 -->
      <!-- ref属性将loginFormRef注册成$ref中DOM元素 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <h3>LOGIN</h3>
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user" type="text"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
          <el-button type="info" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 登录表单输入的数据绑定对象
      loginForm: {
        username: 'zs',
        password: '000000'
      },
      // 表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登录按钮绑定事件。
    login () {
      // .validate()对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        // qs 提供了俩个可以转换json对象的方法
        const Qs = require('qs')
        var loginFormjsonStr = Qs.stringify(this.loginForm)// 将json对象转换成json字符串对象后端接口才能拿到
        const { data: res } = await this.$http.post('/api/login', loginFormjsonStr)
        if (res.status !== 200) return this.$message.error('登录失败！')
        this.$message.success('登录成功')
        // 将登录成功之后的token保存。token只应在当前网站打开期间生效，所以将token保存在sessionStorage中
        window.sessionStorage.setItem('token', res.token)
        window.sessionStorage.setItem('username', res.results[0].username)
        window.sessionStorage.setItem('nickname', res.results[0].nickname)
        window.sessionStorage.setItem('email', res.results[0].email)
        // 将用户的基础信息都放在sessionStorage中.
        this.$store.commit('moduleUsers/getUser', res.results[0])
        this.$emit('loginThen') // 通知父亲关闭登录窗口
        this.$store.dispatch('loginGetChordsList')
      })
      // console.log('登录成功')
    },
    resetLoginForm () { // 重置按钮绑定事件，重置登录表单.
      // console.log(this);
      // resetFields()重置数据。
      this.$refs.loginFormRef.resetFields()
    },
    register () { // 注册事件
      this.$emit('register')
      console.log('注册事件')
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../assets/css/login.less';
  .login_container {
    display: flex;
    align-items: center;
    height: 300px;
    // h2 {
    //   width: 100%;
    //   position: absolute;
    //   left: 50%;
    //   top: 10%;
    //   transform: translate(-50%, -50%);
    //   text-align: center;
    // }
  }
  .login_box {
    width: 80%;
    min-width: 300px;
    height: 300px;
    // 定位到中央
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    text-align: center;
    box-sizing: border-box;
  }
  /deep/.el-form-item__error{
    left:50%;
    transform: translate(-50%, -0%);
  }
</style>
