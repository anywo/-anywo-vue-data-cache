import Vue from 'vue'
import App from './App.vue'
import router from './router'
import dataCache from '../util/dataCache.umd.js'

Vue.config.productionTip = false

Vue.use(dataCache)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
