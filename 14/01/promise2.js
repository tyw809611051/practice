function get(url) {
    return new Promise(function (resolve,reject) {
       var oReq = new XMLHttpRequest();
       oReq.onload = function () {
           // callback(oReq.responseText);
           resolve(oReq.responseText);
       };
       oReq.onerror = function (err) {
         reject(err);
       };
       oReq.open('get',url,true);
       oReq.send();
    });
};

get('http://localhost:3000/students/edit?id=4')
.then(function (data) {
    console.log(data);
})