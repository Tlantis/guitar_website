<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 登录表单区域 -->
      <!-- ref属性将loginFormRef注册成$ref中DOM元素 -->
      <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules" label-width="0px" class="login_form">
        <h3>REGISTER</h3>
        <!-- 用户名 -->
        <el-form-item prop="username">
          <h4>用户名</h4>
          <el-input v-model="registerForm.username" prefix-icon="el-icon-user" type="text"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <h4>密码</h4>
          <el-input v-model="registerForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
        </el-form-item>
        <!-- nickname昵称 -->
        <el-form-item prop="nickname">
          <h4>昵称</h4>
          <el-input v-model="registerForm.nickname" prefix-icon="el-icon-lock" type="text"></el-input>
        </el-form-item>
        <!-- email邮箱 -->
        <el-form-item prop="email">
          <h4>邮箱</h4>
          <el-input v-model="registerForm.email" prefix-icon="el-icon-lock" type="text"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="button-form-item">
          <el-button type="primary" @click="register">注册</el-button>
          <el-button type="info" @click="resetregisterForm">重置</el-button>
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
      registerForm: {
        username: 'zs',
        password: '000000',
        nickname: '王二狗',
        email: '913167748@qq.com'
      },
      // 表单的验证规则对象
      registerFormRules: {
      // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入昵称名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    register () { // 注册事件
      console.log('注册事件')
      this.$refs.registerFormRef.validate(valid => {
        if (!valid) return
        const Qs = require('qs')
        var registerFormjsonStr = Qs.stringify(this.registerForm)
        this.$http.post('/api/register', registerFormjsonStr)
          .then(res => {
            console.log(res)
            if (res.data.status !== 200) {
              return this.$message.error(res.data.message)
            }
            this.$message.success('注册成功')
          })
      })
    },
    resetregisterForm () { // 重置按钮绑定事件，重置登录表单.
      // console.log(this);
      // resetFields()重置数据。
      this.$refs.registerFormRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../assets/css/login.less';
  h3 {
    margin: 10px;
  }
  .login_container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .login_box {
    width: 80%;
    min-width: 400px;
  }
  .login_form {
    // width: 100%;
    padding: 0 20px;
    text-align: center;
    box-sizing: border-box;
  }
  .el-form-item {
    margin: 0;
  }
  /deep/.el-form-item__error{
    left:50%;
    transform: translate(-50%, -0%);
  }
  .button-form-item{
    margin: 20px;
  }
</style>
