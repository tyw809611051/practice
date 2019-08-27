var fs = require('fs');
// module.exports = function (app) {
//
//     app.get('/',function (req,res) {
//         fs.readFile('./db.json','utf-8',function (err,data) {
//             if (err) {
//                 return res.status(500).send('Server error');
//             }
//             res.render('index.html',{
//                 fruits: [
//                     '苹果',
//                     '香蕉',
//                     '橘子'
//                 ],
//                 students: JSON.parse(data).students
//             });
//         });
//
//     });
//
//     app.get('/students',function (req,res) {
//
//     });
// }

var express = require('express');

var router = express.Router();
var Student = require('./student');

router.get('/students', function (req, res) {
    Student.find(function (err, students) {
        if (err) {
            return res.status(500).send('Server error');
        }
        res.render('index.html', {
            fruits: [
                '苹果',
                '香蕉',
                '橘子'
            ],
            students: students
        });
    });
    // fs.readFile('./db.json','utf-8',function (err,data) {
    //     if (err) {
    //         return res.status(500).send('Server error');
    //     }
    //     res.render('index.html',{
    //         fruits: [
    //             '苹果',
    //             '香蕉',
    //             '橘子'
    //         ],
    //         students: JSON.parse(data).students
    //     });
    // });
});

router.get('/students/new', function (req, res) {
    // fs.readFile('./db.json','utf-8',function (err,data) {
    //     if (err) {
    //         return res.status(500).send('Server error');
    //     }
    //
    // });

    res.render('new.html');
});

router.post('/students/new', function (req, res) {
    Student.save(req.body, function (err) {
        if (err) {
            return res.status(500).send('Server eror');
        }

        res.redirect('/students');
    });
});

router.get('/students/edit', function (req, res) {
    // req.setRequestHeader("Access-Control-Allow-Origin","*");
    res.set({
        "Access-Control-Allow-Origin":"*"
    });
    Student.findById(parseInt(req.query.id), function (err, data) {
        if (err) {
            return res.status(500).send('Server error');
        }

        res.send(data);
        // res.render('edit.html', {
        //     student: data
        // });
    })
});

router.post('/students/edit', function (req, res) {
    Student.updateById(req.body, function (err, data) {
        if (err) {
            return res.status(500).send('Server error');
        }

        res.redirect('/students');
    })
});

router.get('/students/delete', function (req, res) {
    Student.delete(parseInt(req.query.id), function (err, data) {
        if (err) {
            return res.status(500).send('Server error');
        }

        res.redirect('/students');
    })
});
module.exports = router;