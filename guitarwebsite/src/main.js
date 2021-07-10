import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import installElementPlus from './plugins/element'
// 需要注意的是，elementUI样式文件需要单独引入。
import 'element-ui/lib/theme-chalk/index.css'

// 引入全局样式表
import './assets/css/global.less'
import './plugins/element.js'

import axios from 'axios'
// 配置请求的跟路径
axios.defaults.baseURL = 'http://127.0.0.1:3007'
Vue.prototype.$http = axios

axios.interceptors.request.use(function (config) {
  // 在请求头中添加了一个Authorization，向后端发送请求的时候会将token值传过去。
  // 如果不配置请求拦截器在头信息中添加token 会弹出无效token的警告。
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 固定写法 必须return
  return config
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
