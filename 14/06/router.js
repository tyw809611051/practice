var express = require('express');
var User = require('./models/user');
var md5 = require('blueimp-md5');

var router = express.Router();

router.get('/', function (req, res) {
    res.render('index.html', {
        user: req.session.user
    });
});

router.get('/login', function (req, res) {
    res.render('login.html');
});

router.post('/login', function (req, res) {
    // 1.获取表单数据
    // 2.查询数据库用户名密码是否正确
    // 3.发送响应数据
    var body = req.body;

    User.findOne({
        email: body.email,
        password: md5(md5(body.password))
    }, function (err, user) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: err.message
            })
        }

        if (!user) {
            return res.status(200).json({
                err_code: 1,
                message: 'Email or password is invalid'
            });
        }

        req.session.user = user;

        res.status(200).json({
            err_code: 0,
            message: 'ok'
        });
    });
});

router.get('/register', function (req, res) {
    res.render('register.html');
});

router.post('/register', function (req,res) {
   // 1.获取提交数据
    var body = req.body;
   // 2.查找库里是否存在
    User.findOne({
        $or: [
            {
                email: body.email
            },
            {
                nickname: body.nickname
            }
        ]
    },function (err,user) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: '服务器繁忙,请稍后再试!'
            });
        }

        if (user) {
            return res.status(200).json({
                err_code: 1,
                message: 'Email or nickname aleady exists'
            });

            // return res.send('邮箱或密码已经错误,请重试');
        }

        body.password = md5(md5(body.password));

        // 3.不存在新增一条数据
        new User(body).save(function (err,user) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: 'Internal error'
                });
            }

            req.session.user = user;

            res.status(200).json({
                err_code: 0,
                message: 'ok'
            })
        });



    })

});


router.get('/logout',function (req,res) {
   req.session.user = null,

   res.redirect('/login');
});
module.exports = router;
