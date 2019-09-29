import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import axios from '@/plugins/axios'
import router from '@/routes/router'

Vue.config.productionTip = false

Vue.prototype.$http = axios

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
