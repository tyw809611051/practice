console.log('ok');

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import 'bootstrap/dist/css/bootstrap.css'
import './css/app.css'
import './lib/mui/css/mui.min.css'

// import {Button} from 'mint-ui'
// Vue.component(Button.name,Button)

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
