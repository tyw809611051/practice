$(function () {

    /*区域滚动*/
    mui('.mui-scroll-wrapper').scroll({
        indicators: false
    });
    /*1.页面初始化的时候，关键字在输入框内显示*/
    var urlStr = CT.getParamsByUrl();
    $('.ct_search input').val(urlStr['key']);

    /*2.页面初始化的时候，根据关键字查询第一页数据4条*/
    getSearchData({
        proName: urlStr.key,
        page: 1,
        pageSize: 4,
    },function (data) {
        $('.ct_product').html(template('list',data));
    });
    /*3.用户点击搜索的时候，根据新的关键字搜索商品，重置排序功能*/
    $('.ct_search a').on('tap',function () {
       // 获取输入框的文字
       var inputStr =  $('.ct_search input').val();
       if (!inputStr) {
           mui.toast('请输入关键字');
           return false;
       }
        getSearchData({
            proName: inputStr,
            page: 1,
            pageSize: 4,
        },function (data) {
            // 上拉重置

            mui("#refreshContainer").pullRefresh().refresh(true);
            $('.ct_product').html(template('list',data));
        });
    });

    /*4.用户点击排序的时候，根据排序的选项去排序（默认的时候是降序，再次点击的时候升序)*/
    $('.ct_order a').on('tap',function () {
        /*如果之前没有选择*/
        if(!$(this).hasClass('now')) {
            /*箭头朝下,变换颜色*/
            $(this).addClass('now').siblings().removeClass('now')
                .find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
        } else {
            if ($(this).find('span').hasClass('fa-angle-down')) {
                $(this).find('span').removeClass('fa-angle-down').addClass('fa-angle-up');
            } else {
                $(this).find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
            }
        }

        // 获取当前点击的功能参数
        var order = $(this).attr('data-order');
        var orderVal = $(this).find('span').hasClass('fa-angle-up') ? 1 : 2;
        var key = $.trim($('.ct_search input').val());
        if (!key) {
            mui.toast('请输入关键字');
            return false;
        }

        var params = {
          proName: key,
          page: 1,
          pageSize: 4,
        };
        params[order] = orderVal;
        getSearchData(params,function (data) {
            mui("#refreshContainer").pullRefresh().refresh(true);
            $('.ct_product').html(template('list',data));
        });
    });

    /*5.用户下拉的时候 根据当前条件刷新 上拉加载重置 排序功能也重置*/
    mui.init({
        pullRefresh: {
            /*下拉容器*/
            container: "#refreshContainer",
            /*下拉*/
            down: {
                /*自动加载*/
                auto: true,
                callback: function () {
                    /*组件对象*/
                    var that = this;
                    var key = $.trim($('.ct_search input').val());
                    if (!key) {
                        mui.toast('请输入关键字');
                        return false;
                    }

                    /*排序功能也重置*/
                    $('.ct_order a').removeClass('now').find('span').removeClass('fa-angle-up');

                    /*获取数据*/
                    getSearchData({
                        proName: key,
                        page: 1,
                        pageSize: 4
                    },function (data) {
                        setTimeout(function () {
                            $('.ct_product').html(template('list',data));
                            /*停止下拉刷新*/
                            that.endPulldownToRefresh();
                            /*上拉加载重置*/
                            that.refresh(true);
                        },1000);

                    });
                }
            },
            /*上拉*/
            up: {
                callback: function () {
                    window.page++;
                    var that = this;
                    var key = $.trim($('.ct_search input').val());
                    if (!key) {
                        mui.toast('请输入关键字');
                        return false;
                    }

                    /*获取当前功能参数*/
                    var orderObj = $('.ct_order a.now');
                    var order = orderObj.attr('data-order');
                    var orderVal = orderObj.find('span').hasClass('fa-angle-up');
                    /*获取数据*/
                    var params = {
                        proName: key,
                        page: window.page,
                        pageSize: 4
                    };

                    params[order] = orderVal;
                    getSearchData(params,function (data) {
                       setTimeout(function () {
                           $('.ct_product').append(template('list',data));
                           //停止上拉加载
                           if(data.data.length){
                               that.endPullupToRefresh();
                           }else{
                               that.endPullupToRefresh(true);
                           }
                       },1000);
                    });
                }

            }
        }
    });
    /*6.用户上拉的时候 加载下一页（没有数据不去加载)*/
});


/*根据搜索条件获取数据*/
var getSearchData = function (params,callback) {
    $.ajax({
        url: '/product/queryProduct',
        type: 'get',
        data: params,
        dataType: 'json',
        success: function (data) {
            window.page = data.page;
            callback && callback(data);
        }
    });
};