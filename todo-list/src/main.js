// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false


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
  template: '<App/>'
})
