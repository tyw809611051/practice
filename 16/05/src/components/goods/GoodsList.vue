<template>
    <div>
        <div class="goods-list">
            
            <router-link class="goods-item" v-for="item in goodslist" :key="item.id" to="/home/goodsinfo" tag="div">
                <img :src="item.img_url" alt="">
                <h1 class="title">{{item.title}}</h1>
                <div class="info">
                    <p class="price">
                        <span class="now">¥{{item.sell_price}}</span>
                        <span class="old">¥{{item.market_price}}</span>
                    </p>
                    <p class="sell">
                        <span>热卖中</span><span>剩{{item.stock_quantity}}件</span>
                    </p>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pageindex: 1,
            goodslist: []
        }
    },
    mounted() {
        this.getGoodsList();
    },
    methods: {
        getGoodsList() {
            this.$http.get('json/shopList.json')
            .then(result => {
                if (result.body.status == 0) {
                    this.goodslist = result.body.message;
                }
            })
        }
    },
}
</script>

<style lang="scss">
    .goods-list {
        display: flex;
        flex-wrap: wrap;
        padding: 8px;
        justify-content: space-between;
        .goods-item {
            width: 49%;
            border : 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            margin: 4px 0;
            padding: 2px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 293px;
            img {
                width: 100%;
                min-height: 160px;
            }

            .title {
                font-size: 14px;
            }

            .info {
                background-color: #eee;
                p {
                    margin: 0;
                    padding: 5px;
                }
                .price {
                    .now {
                        color: red;
                        font-weight: bold;
                        font-size: 16px;
                    }
                    .old {
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }

                .sell {
                    display: flex;
                    justify-content: space-between;

                }
            }
        }
    }
</style>