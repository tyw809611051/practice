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
/*自动轮播且无缝*/
    /*点药随着图片的轮播改变*/
    /*滑动效果*/
    /*滑动结束的时候， 滑动距离不超过屏幕的1/3 返回去 否则切换*/

    var jdBanner = document.querySelector('.jd_banner');
    var bannerWidth = jdBanner.offsetWidth;
    var imgBox = jdBanner.querySelector('ul:first-child');
    var pointBox = jdBanner.querySelector('ul:last-child');
    var points = pointBox.querySelectorAll('li');

    var index = 1;
    var timeId = setInterval(function () {
        index++;
        // 过渡动画效果
        imgBox.style.transition = 'all 0.2s';
        imgBox.style.webkitTransition = 'all 0.2s';
        // 位移动画效果
        imgBox.style.transform = 'translateX('+(-index * bannerWidth)+'px)';
        imgBox.style.webkitTransform = 'translateX('+(-index * bannerWidth)+'px)';

    },1000);

    // 最后一张动画做判断,是否定位到第一张
    imgBox.addEventListener('transitionend',function () {
        if (index >= 9) {
            index = 1;
            imgBox.style.transition = "none";
            imgBox.style.transform = 'translateX('+(-index * bannerWidth)+'px)';
        } else if (index < 1){
            index = 8;
            imgBox.style.transition = "none";
            imgBox.style.transform = 'translateX('+(-index * bannerWidth)+'px)';
        }

        setPoint();
    });

    var setPoint = function () {
        for (var i = 0;i < points.length; i++) {
            var obj = points[i];
            obj.classList.remove('now');

        }
        points[index - 1].className = "now";
    };

    // 绑定事件
    var startX = 0;
    var distance = 0;
    imgBox.addEventListener('touchstart',function (e) {
        clearInterval(timeId);
        startX = e.touches[0].clientX;
    });

    imgBox.addEventListener('touchmove',function (e) {
        // 移动的距离
        var moveX = e.touches[0].clientX;
        distance = moveX - startX;
        var translateX = -index * bannerWidth + distance;

        removeTransition();
        setTranslateX(translateX);
    });

    imgBox.addEventListener('touchend',function (e) {
        if (Math.abs(distance) < bannerWidth/3) {
            addTransition();
            setTranslateX(-index * bannerWidth);
        } else {
            addTransition();
            if (distance > 0) {
                index--;
            } else {
                index++;
            }
            setTranslateX(-index * bannerWidth);
        }
    });

    var addTransition = function () {
        imgBox.style.transition = 'all 0.2s';
        imgBox.style.webkitTransition = 'all 0.2s';
    }
    var removeTransition = function () {
        imgBox.style.transition = 'none';
        imgBox.style.webkitTransition = 'none';
    }
    var setTranslateX = function (translateX) {
        imgBox.style.transform = 'translateX(' + translateX + 'px)';
        imgBox.style.webkitTransform = 'translateX(' + translateX + 'px)';
    }
};



var downTime = function () {

};