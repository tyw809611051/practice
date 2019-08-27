var fs = require('fs');
// 创建容器
var p1 = new Promise(function (resolve, reject) {
    var data = 'good';
    var err = false;
    if (err) {
        reject(err);
    } else {
        resolve(data);
    }
});
var p2 = new Promise(function (resolve, reject) {
    var data = 'good';
    var err = false;
    if (err) {
        reject(err);
    } else {
        resolve(data);
    }
});
var p3 = new Promise(function (resolve, reject) {
    var data = 'good';
    var err = false;
    if (err) {
        reject(err);
    } else {
        resolve(data);
    }
});

p1.then(function (data) {

    return p2;
}, function (err) {

})
    .then(function (data) {
        console.log(data);
        return p3;
    }, function (err) {

    })
    .then(function (data) {

    }, function (err) {

    })
;