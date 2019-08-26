/*
*
* 数据操作文件模块
* */
var fs = require('fs');
var dbPath = './db.json';
/*
*
* 获取所有学生列表
* */
exports.find = function (callback) {
    fs.readFile(dbPath, function (err, data) {
        if (err) {
            return callback(err);
        }
        callback(null, JSON.parse(data).students);
    })
};

exports.findById = function (studentId, callback) {
    fs.readFile(dbPath, function (err, data) {
        if (err) {
            return callback(err);
        }

        var students = JSON.parse(data).students;

        var stu = students.find(function (item) {
            return item.id == parseInt(studentId);
        });

        callback(null, stu);
    });
};
/*
* 添加保存学生
* */
exports.save = function (student, callback) {
    fs.readFile(dbPath, 'utf-8', function (err, data) {
        if (err) {
            return callback(err);
        }
        var students = JSON.parse(data).students;
        student.id = students[students.length - 1].id + 1;
        students.push(student);
        var fileData = JSON.stringify({
            students: students
        });

        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                return callback(err);
            }
            callback(null);
        })

    })
};

/*
*
*
* 更新学生
* */
exports.updateById = function (student, callback) {
    fs.readFile(dbPath, 'utf-8', function (err, data) {
        if (err) {
            return callback(err);
        }

        var students = JSON.parse(data).students;
        student.id = parseInt(student.id)
        var stu = students.find(function (item) {
            return item.id == student.id;
        })
        /*遍历拷贝对象*/
        for (var key in student) {
            stu[key] = student[key];
        }

        /*格式化写入文件*/
        var fileData = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                return callback(err);
            }
            callback(null);
        })
    })
};


/*
*
*
* 删除学生
* */
exports.delete = function (studentId, callback) {
    fs.readFile(dbPath, 'utf-8', function (err, data) {
        if (err) {
            return callback(err);
        }
        var students = JSON.parse(data).students;

        var indexId = students.findIndex(function (item) {
            return item.id == parseInt(studentId);
        });
        students.splice(indexId,1);
        var fileData = JSON.stringify({
            students: students
        });

        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                return callback(err);
            }
            callback(null);
        })

    })
};