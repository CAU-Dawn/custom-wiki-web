var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();


app.use(express.static('public_shin'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post('/index.html', function(req, res) {
    console.log(req.body);
    res.send({key:true});
});

http.createServer(app).listen(3000, function(){
    console.log('Express 서버가 3000번 포트에서 시작됨');
});
