$(function () {

    // 获取产品ID
    var productId = parseInt(CT.getParamsByUrl().productId);
    if (!productId || productId === 0) {
        mui.toast('无此产品');
        setTimeout(function () {
            location.href = 'index.html';
        }, 2000);
    }

    /*获取数据渲染*/
    getProductData(productId, function (data) {
        /*清除加载状态*/
        $('.loading').remove();
        /*渲染商品详情页*/
        $('.mui-scroll').html(template('detail', data));
        /*轮播图*/
        mui('.mui-slider').slider({
            interval: 2000
        });
        /*区域滚动*/
        mui('.mui-scroll-wrapper').scroll({
            indicators: false
        });
        /*尺码的选择*/
        $('.btn_size').on('tap', function () {
            $(this).addClass('now').siblings().removeClass('now');
        });
        /*数量的选择*/
        $('.p_number span').on('tap', function () {
            /*获取总数量*/
            var $input = $(this).siblings('input');
            var currNum = $input.val();
            /*字符串 转数字*/
            var maxNum = parseInt($input.attr('data-max'));
            if ($(this).hasClass('jian')) {

                if (currNum === 0) {
                    return false;
                }
                currNum--;
            } else {
                if (currNum >= maxNum) {
                    setTimeout(function () {
                        mui.toast('库存不足');
                    },1000);
                    return false;
                }
                currNum++;
            }
            $input.val(currNum);
        });

        /*加入购物车*/
        $('.btn_addCart').on('tap', function () {
            /*检查是否选择尺码*/
            var $changeBtn = $('.btn_size.now');
            if (!$changeBtn.length) {
                mui.toast('请您选择尺码');
                return false;
            }
            /*检查是否选择数量,并且数量不能大于最大数量*/
            var num = $('.p_number input').val();
            if (num <= 0) {
                mui.toast('请您选择数量');
                return false;
            }

            /*提交数据*/
            CT.loginAjax({
                url:'/cart/addCart',
                type: 'post',
                data: {
                    productId: productId,
                    num: num,
                    size: $changeBtn.html()
                },
                dataType: 'json',
                success: function (data) {
                    if (data.success === true) {
                        mui.confirm('添加成功,去购物车看看?','温馨提示',['是','否'],function () {
                            if (e.index === 0) {
                                location.href = CT.cartUrl;
                            }
                        });
                    }
                }
            });
        });
    });
});

/*获取详情数据*/
var getProductData = function (productId, callback) {
    $.ajax({
        url: '/product/queryProductDetail',
        type: 'get',
        data: {
            id: productId
        },
        dataType: 'json',
        success: function (data) {
            setTimeout(function () {
                callback && callback(data);
            }, 1000);
        }
    });
};