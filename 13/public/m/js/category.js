$(function () {

    /*请求一级分类数据*/
    var getFirstCategoryData = function (callback) {
      $.ajax({
          url:'/category/queryTopCategory',
          type:'get',
          data:'',
          dataType:'json',
          success:function (data) {
              callback && callback(data);
          }
      });
    };

    /*请求二级分类数据*/
    var getSecondCategoryData = function (param,callback) {
      $.ajax({
          url:'/category/querySecondCategory',
          type:'get',
          data:param,
          dataType: 'json',
          success: function (data) {
              callback && callback(data);
          }
      });
    };

    /*渲染*/
    var render = function (categoryId) {
      getSecondCategoryData({
          id:categoryId
      },function (data) {
          $('.cate_right ul').html(template('secondTemplate',data));
      });
    };

    getFirstCategoryData(function (data) {
        /*渲染一级分类*/
        $('.cate_left ul').html(template('firstTemplate',data));
        /*第一个一级ID分类对应的二级分类*/
        var categoryId = $('.cate_left ul li:first-child').find('a').attr('data-id');
        render(categoryId);
    });

    /*点击一级分类渲染二级分类*/
    $('.cate_left').on('tap','a',function () {
        if ($(this).parent().hasClass('now')) return false;
       // 修改样式为选中
       $('.cate_left li').removeClass('now');
       $(this).parent().addClass('now');
       /*数据渲染*/
        render($(this).attr('data-id'));
    });
});