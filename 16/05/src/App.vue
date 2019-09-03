<template>
    <div class="app-container">
        <mt-header fixed title="蜂鸟检测"></mt-header>
        
        <router-view></router-view> 

        <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-tyw" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-tyw" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-tyw" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">0</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-tyw" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
     
        
    },
}
</script>

<style lang="scss" scoped>
	.mint-header {
		z-index: 999;
	}
    .app-container {
        padding-top: 40px;
	}
	
	.mui-bar-tab .mui-tab-item-tyw.mui-active {
		color: #007aff;
	}

	.mui-bar-tab .mui-tab-item-tyw {
		display: table-cell;
		overflow: hidden;
		width: 1%;
		height: 50px;
		text-align: center;
		vertical-align: middle;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #929292;
	}

	.mui-bar-tab .mui-tab-item-tyw .mui-icon {
		top: 3px;
		width: 24px;
		height: 24px;
		padding-top: 0;
		padding-bottom: 0;
	}

	.mui-bar-tab .mui-tab-item-tyw .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>