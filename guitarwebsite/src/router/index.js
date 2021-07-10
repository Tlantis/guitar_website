import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  { path: '/Register', component: () => import('../components/Register.vue') },
  { path: '/', redirect: '/home' },
  // { path: '/login', component: () => import('../components/Login.vue') },
  {
    path: '/home',
    redirect: '/welcome',
    component: () => import('../components/Home.vue'),
    children: [
      { path: '/welcome', component: () => import('../components/Home/Welcome.vue') },
      { path: '/chord', component: () => import('../components/Home/Chord.vue') },
      { path: '/score', name: 'score', component: () => import('../components/Home/Score.vue') },
      { path: '/scalemap', component: () => import('../components/Home/ScaleMap.vue') },
      { path: '/eg', name: 'eg', component: () => import('../components/Home/eg.vue') },
      { path: '/AddChord', name: 'AddChord', component: () => import('../components/Home/AddChord.vue') }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// // 全局守卫
// router.beforeEach((to, form, next) => {
//   if (to.path === '/login') {
//     next()
//   } else if (form.path === 'login') {
//     next()
//   } else {
//     next('login')
//   }
// })

export default router
