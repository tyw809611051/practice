$(function () {
   $('#submit').on('tap',function () {
      var data = $('form').serialize();

      var dataObj = CT.serialize2object(data);

      if (!dataObj.username) {
          mui.toast('请输入用户名');
          return false;
      }

      if (!dataObj.password) {
          mui.toast('请输入密码');
          return false;
      }

      $.ajax({
         type:'post',
         url:'/user/login',
         data:dataObj,
         dataType:'json',
         success:function (data) {
             if (data.success === true) {
                 var returnUrl = location.search.replace('?returnUrl=','');
                 if (returnUrl) {
                     location.href=returnUrl;
                 } else {
                     location.href=CT.userUrl;
                 }
             } else {
                 mui.toast(data.message);
             }
         }
      });
   });
});