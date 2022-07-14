import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant, { Lazyload } from 'vant';
import 'amfe-flexible'
import 'vant/lib/index.css'
import '@/style/index.less'
import '@/assets/font-awesome-4.7.0/css/font-awesome.css'
Vue.use(Vant);
Vue.use(Lazyload);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
