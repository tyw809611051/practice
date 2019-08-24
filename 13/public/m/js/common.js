$(function () {
    window.CT = {};
    /*获取URL关键字，显示在输入框内*/
    CT.getParamsByUrl = function () {
        var params = {};
        var searchStr = location.search;
        if (searchStr) {
            /*去除问号*/
            searchStr = searchStr.slice(1);
            var arr = searchStr.split('&');
            arr.forEach(function (item,i) {
                var itemArr = item.split('=');
                params[itemArr[0]] = itemArr[1];
            });

        }
        return params;
    };

    /*需要登录的ajax请求*/
    CT.loginUrl = '/m/user/login.html';
    CT.cartUrl = '/m/user/cart.html';
    CT.loginAjax = function (params) {
      $.ajax({
          type: params.type || 'get',
          url: params.url || '#',
          data: params.data || '',
          dataType: params.dataType || 'json',
          success: function (data) {
              if (data.error == 400) {
                  location.href = CT.loginUrl+ '?returnUrl='+location.href;
              } else {
                  params.success && params.success(data);
              }
          },
          error: function () {
              mui.toast('服务器繁忙');
          }
      });
    };
});