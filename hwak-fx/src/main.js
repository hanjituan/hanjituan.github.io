import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
// 如果你是通过 'ant-design-vue/dist/antd.css' 引入样式的，改为 ant-design-vue/dist/antd.less。
import 'ant-design-vue/dist/antd.less'

import router from './router';
import animated from 'animate.css';

Vue.config.productionTip = false;
Vue.use(Antd);
Vue.use(animated);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
