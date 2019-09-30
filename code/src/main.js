import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'
import axios from 'axios'

import i18n from './i18n/index';

Vue.prototype.axios = axios
Vue.prototype.$echarts = echarts

Vue.use(ElementUI, {
    i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false
// Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    i18n,
    components: { App },
    template: '<App/>'
})
