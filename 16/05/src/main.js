import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.http.options.root = 'http://localhost:3000';
// import 'bootstrap/dist/css/bootstrap.css'
import './css/app.css'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// import { Header, Swipe, SwipeItem, Toast, Button, Lazyload } from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Toast.name, Toast);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
import MintUI from 'mint-ui'
Vue.use(MintUI);
import 'mint-ui/lib/style.css';


import app from './App.vue'


import VuePreview from 'vue-preview'
Vue.use(VuePreview)

import Vuex from 'vuex'
Vue.use(Vuex)
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
