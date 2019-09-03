
import VueRouter from 'vue-router'
import account from './components/Account.vue'
import goodslist from './components/GoodsList.vue'

var router = new VueRouter({
    routes: [
        {path: '/account' , component: account},
        {path: '/goodslist' , component: goodslist}
    ]
});

export default router