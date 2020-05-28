import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

Vue.config.devtools = true // 打开Vue Devtools调试


new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
