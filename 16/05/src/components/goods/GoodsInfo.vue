<template>
    <div class="goodsinfo-container">
        <!-- <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						这是一个最简单的卡片视图控件；卡片视图常用来显示完整独立的一段信息，比如一篇文章的预览图、作者信息、点赞数量等
					</div>
				</div>
		</div> -->
        <transition
         @before-enter="beforeEnter"
         @enter="enter"
         @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag"  ref="ball"></div>
        </transition>

        <div class="mui-card">
				<div class="mui-card-header">商品的名称标题</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
                            市场价：<del>¥2399</del>&nbsp;&nbsp;销售价：<span class="now_price">¥2199</span>    
                        </p>
                        <p>购买数量：<numbox @getcount="getSelectedCount" :max=60></numbox> </p>
                        <p>
                            <mt-button type="primary" size="small">立即购买</mt-button>
                            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                        </p>
					</div>
				</div>
				<div class="mui-card-footer">页脚</div>
		</div>
        
        
    </div>
</template>

<script>
import numbox from '../subcomponents/goodsinfo_numberbox.vue';

export default {
    data() {
        return {
            id: this.$route.params.id,
            lunbotu: [],
            ballFlag: false,
            selectedCount: 1
        }
    },

    methods: {
        getLunbotu() {
            this.$http.get('json/photoId.json')
            .then(result => {
                if (result.body.status == 0) {
                    this.lunbotu = result.body.message;
                }
            })
        },
        addToShopCar() {
            this.ballFlag = !this.ballFlag;
        },
        beforeEnter(el) {
            el.style.transform="translate(0,0)";
        },
        enter(el,done){
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            const badgePosition = document.getElementById('badge').getBoundingClientRect();

            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;

            el.offsetWidth;
            el.style.transform=`translate(${xDist}px,${yDist}px)`;
            el.style.transition="all 1s cubic-bezier(.4,-0.3,1,.68)";
            done();
        },
        afterEnter(el){
            this.ballFlag = !this.ballFlag;
        },
        getSelectedCount(count) {
            this.selectedCount = count;
            console.log(count);
        }
    },
    components: {
        numbox
    }
}
</script>

<style lang="scss">
    .goodsinfo-container {
        background-color: #eee;
        overflow: hidden;
        .now_price {
            color: red;
            font-size: 16px;
            font-weight: bold;
        }
        
    }
    .ball {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;
        top: 150px;
        left: 145px;
    }
</style>