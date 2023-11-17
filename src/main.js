// 引入Vue框架和根组件
import Vue from 'vue';
import App from './App.vue';

// 引入Element UI库和样式
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入全局样式
import '@/assets/styles/reset.css';
import '@/assets/styles/base.less';

// 引入路由
import router from '@/router/index';

// 批量注册通用组件
import requireComponent from '@/plugins/requireComponent';

// 关闭生产模式下给出的提示
Vue.config.productionTip = false;

// 使用Element UI
Vue.use(ElementUI);

// 使用批量注册的通用组件
Vue.use(requireComponent);

// 创建Vue实例
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');