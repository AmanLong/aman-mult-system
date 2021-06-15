import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import SvgIcon from '@/components/SvgIcon/index.vue'// svg组件
Vue.component('svg-icon', SvgIcon)
import '@/components/SvgIcon/index.js'

Vue.use(ElementUI);

// tabs
import TabRoute from './layout/components/tabs/TabRoute'
import RouterMethods from './layout/components/tabs/RouterMethods'
Vue.use(TabRoute)
Vue.use(RouterMethods);

// 引入echarts
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
