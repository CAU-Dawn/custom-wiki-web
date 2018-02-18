var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Wikidb = require('./db.js');
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

app.post('/index.html', function(req, res) {
    console.log(req.body);
    //생성
    var wiki = new Wikidb();
    wiki.title = req.body.title;
    //wiki.author = req.body.author;
    wiki.data = req.body.contents;
    wiki.edited_date = new Date();
    //title, author, data, edited_date
    wiki.save(function(err){
        if(err){
            console.error(err);
            res.json({status: 0});
            console.log({status: 0});
            return;
        }
        res.json({status: 1});
        console.log({status: 1});
    });

});
//검색
/*Wikidb.find(function(err, wikis){
    if(err) return res.status(500).send({error: 'database failure'});
    res.json(wikis);
})*/


http.createServer(app).listen(3000, function(){
    console.log('Express 서버가 3000번 포트에서 시작됨');
});

// require : routing 작업(path들을 변수로 만들기), 모듈화 작업
