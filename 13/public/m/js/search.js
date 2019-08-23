$(function () {
    console.log(12);
    $('.ct_search a').on('tap',function () {
        /*跳转到搜索列表页，并且带上关键字*/
        var key = $.trim($('input').val());
        if (!key) {
            mui.toast('请输入关键字');
            return false;
        }

        location.href = 'searchList.html?key='+key;
    });
});