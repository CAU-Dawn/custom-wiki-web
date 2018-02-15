var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Wikidb = require('db.js'); //<=모듈문제? db연결작업
var app = express();

app.use(express.static('public_shin'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log("Connected to mongod server");
});
mongoose.connect('mongodb://localhost:27017');

app.post('/index.html/:', function(req, res) {
    console.log(req.body);
    res.json({status : 200});
    var wiki = new Wikidb();
    wiki.title = req.body.name;
    wiki.author = req.body.author;
    wiki.edited_date = new Date(req.body.edited_date);

    wiki.save(function(err){
        if(err){
            console.error(err);
            res.json({result: 0});
            return;
        }
        res.json({result: 1});
    });
});

http.createServer(app).listen(3000, function(){
    console.log('Express 서버가 3000번 포트에서 시작됨');
});

// require : routing 작업(path들을 변수로 만들기), 모듈화 작업
