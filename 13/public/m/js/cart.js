$(function () {
    /*区域滚动*/
    mui('.mui-scroll-wrapper').scroll({
        indicators: false
    });
    /*初始化上下拉*/
    /*1.初始化页面，自动下拉刷新*/
    mui.init({
        pullRefresh: {
            container: '#refreshContainer',
            down: {
                auto: true,
                callback: function () {
                    /*初始化页面，自动下拉刷新*/
                    var that = this;
                    setTimeout(function () {
                        getCartData(function (data) {
                            /*渲染页面*/
                            $('.mui-table-view').html(template('cart', data));
                            /*加载状态隐藏*/
                            that.endPulldownToRefresh();
                            /*注册刷新，防止多次绑定 先解绑再次绑定*/
                            $('.fa-refresh').off('click').on('tap', function () {
                                that.pulldownLoading();
                            });
                        });
                    }, 1000);
                }
            }
        }
    });

    /*3.侧滑的时候，点击编辑 弹出对话框（尺码、数量）*/
    $('.mui-table-view').on('tap','.mui-icon-compose',function () {
        var id = $(this).parent().attr('data-id');
        var item = CT.getItemById(window.cartData.data,id);
        var html = template('edit',item);
        mui.confirm(html.replace(/\n/g,''),'商品编辑',['确认','取消'],function (e) {
            if (e.index == 0) {
                var size = $('.btn_size.now').html();
                var num = $('.p_number input').val();
                CT.loginAjax({
                   type:'post',
                   url:'/cart/updateCart',
                   data:{
                       id:id,
                       size:size,
                       num:num
                   } ,
                    dataType:'json',
                    success:function (data) {
                        if (data.success == true) {
                            item.num = num;
                            item.size = size;
                            $('.mui-table-view').html(template('cart',window.cartData));
                        }
                    }
                });
            } else {
                /*TODO*/
            }
        });
    });
    $('body').on('tap','.btn_size',function () {
        $(this).addClass('now').siblings().removeClass('now');
    });

    $('body').on('tap','.p_number span',function () {
       var $input = $(this).siblings('input');
       var currNum = $input.val();

       var maxNum = parseInt($input.attr('data-max'));
       if($(this).hasClass('jian')) {
           if(currNum <= 1) {
               mui.toast('至少一件商品');
               return false;
           }
           currNum--;
       } else {
           if (currNum >= maxNum) {
               setTimeout(function () {
                  mui.toast('库存不足');
               });
               return false;
           }
           currNum++;
       }
       $input.val(currNum);
    });
    /*4.删除*/
    $('.mui-table-view').on('tap','.mui-icon-trash',function () {
        var $this = $(this);
        var id = $this.parent().attr('data-id');
        mui.confirm('你确认是否删除该商品','商品删除',['确认','取消'],function (e) {
            if (e.index === 0) {
                CT.loginAjax({
                   type:'get',
                   url:'/cart/deleteCart',
                   data:{
                       id:id
                   },
                   dataType: 'json',
                   success:function (data) {
                       if(data.success === true) {
                           $this.parent().parent().remove();
                           setAmount();
                       }

                   }
                });
            }
        })
    });
    /*点击复选框 计算总金额*/
    $('.mui-table-view').on('change','[type=checkbox]',function () {
       setAmount();
    });
});

var setAmount = function () {
    /*所有选中的复选框*/
    var $checkedBox = $('[type=checkbox]:checked');
    /*获取选中商品的ID*/
    var amountSum = 0;
    $checkedBox.each(function (i,item) {
        var id=$(this).attr('data-id');
        var items = CT.getItemById(window.cartData.data,id);
        var num = items.num;
        var price = items.price;
        var amount = num*price;
        amountSum += amount;
    });
    if(Math.floor(amountSum*100%10)) {
        amountSum = Math.floor(amountSum*100)/100;
    } else {
        amountSum = Math.floor(amountSum*100)/100;
        amountSum = amountSum.toString()+'0';
    }
    $('#cartAmount').html(amountSum);
};
var getCartData = function (callback) {
    CT.loginAjax({
        type: 'get',
        url: '/cart/queryCartPaging',
        data: {
            page: 1,
            pageSize: 100
        },
        dataType: 'json',
        success: function (data) {
            window.cartData = data;
            callback && callback(data);
        }
    });
};