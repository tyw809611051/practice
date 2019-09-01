import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import VueResource from 'vue-resource'
Vue.use(VueResource)
// import 'bootstrap/dist/css/bootstrap.css'
import './css/app.css'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

import { Header } from 'mint-ui';
Vue.component(Header.name, Header);

import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

import app from './App.vue'

import router from './router.js'


var vm = new Vue({
 el: '#app',
 data: {
     msg:123
 },
//  components: {
//     login
//  }
render: createElements => createElements(app),
router

});
