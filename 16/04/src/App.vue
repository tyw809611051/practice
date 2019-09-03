<template>
    <div>
        <h1>这是app组件</h1>
        <mt-button type="primary">primary</mt-button>
        <router-link to="/account">account</router-link>
        <router-link to="/goodslist">goodslist</router-link>

        <router-view></router-view>
        </div>
</template>

<script>
export default {
    data() {
        return {msg: 123}
    },
    methods: {
        show() {
            console.log('login.vue里的show方法');
        }
        
    },
}
</script>

<style lang="">
    
</style>