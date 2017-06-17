// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import Axios from 'axios';
import ElementUI from 'element-ui'; // 引入element-ui
import 'element-ui/lib/theme-default/index.css';
import App from './App';
import Login from './components/Login';
import todoMenu from './components/menu';

Vue.use(ElementUI); // Vue全局使用

Vue.use(VueRouter);
Vue.prototype.$http = Axios;

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: Login,
    },
    {
      path: '/todolist',
      component: todoMenu,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token');
  if (to.path === '/') { // 如果是跳转到登录页的
    if (token !== 'null' && token !== null) {
      next('/todolist'); // 如果有token就转向todolist不返回登录页
    }
    next(); // 否则跳转回登录页
  } else if (token !== 'null' && token !== null) {
    Vue.prototype.$http.defaults.headers.common.Authorization = `Bearer ${token}`;
    next(); // 如果有token就正常转向
  } else {
    next('/'); // 否则跳转回登录页
  }
});

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
