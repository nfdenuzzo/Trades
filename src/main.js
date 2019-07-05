import Vue from 'vue'
import 'babel-polyfill'
import 'isomorphic-fetch'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugins/element.js'
import './plugins/customConfig.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
