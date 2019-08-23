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
});