<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item>1</mt-swipe-item>
            <mt-swipe-item>2</mt-swipe-item>
            <mt-swipe-item>3</mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
    data() {

    },
    created() {
        // this.getBar();
    },
    methods: {
        getBar() {
            this.$http.get("https://baidu.com").then(resolve => {
                console.log(resolve);
            });
        }
    },
}
</script>

<style lang="scss">
    .mint-swipe {
        height: 200px;  

        .mint-swipe-item {

            &:nth-child(1) {
                background-color: red;
            }

            &:nth-child(2) {
                background-color: blue;
            }

            &:nth-child(3) {
                background-color: yellow;
            }
        }
    }
</style>