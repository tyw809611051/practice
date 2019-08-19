window.onload = function () {
    /*顶部搜索事件*/
    searchTop();
    /*轮播图事件*/
    banner();
    /*时间倒计时事件*/
    downTime();
};

var searchTop = function () {
    // 获取搜索对象
    var searchBox = document.querySelector('.jd_search_box');
    // 获取轮播图对象
    var banner = document.querySelector('.jd_banner');
    // 获取轮播图高度
    var height = banner.offsetHeight;

    // 设置透明度
    // var opcity = 0;
    window.onscroll = function () {
        /*console.log(document.body.scrollTop);
         console.log(document.documentElement.scrollTop);
         console.log(window.pageYOffset);*/
        // console.log(document.body.scrollTop)
        var scrollTop = document.documentElement.scrollTop;
        console.log(scrollTop);
        /*默认的透明度*/
        var opacity = 0;
        if (scrollTop < height) {
            /*2.当页面滚动的时候---随着页面卷曲的高度变大透明度变大*/
            opacity = scrollTop / height * 0.85;
        } else {
            /*3.当页面滚动的时候---超过某一个高度的时候透明度不变*/
            opacity = 0.85;
        }
        searchBox.style.background = 'rgba(201,21,35,' + opacity + ')';
    }

};

var banner = function () {

};

var downTime = function () {

};