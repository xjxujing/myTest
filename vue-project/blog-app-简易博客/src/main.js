// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Routes from './routes'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(VueRouter)



const router = new VueRouter({
  routes: Routes,
  mode: 'history',
})


// 在全局状态下，初始化数据库，这里我们初始化一次即可
// 在其他组件中，我们直接引入数据库，而不需要重复初始化，否则会报错
var APP_ID = "XQlut690CCSYBbUgtGh4LFwI-gzGzoHsz";
var APP_KEY = "tkxoyTifYWHkfzrVjA37TjL7";
var AV = require('leancloud-storage')
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router: router,
})
