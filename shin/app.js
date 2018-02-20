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

/*app.post('/index.html', function(req, res) {
    console.log(req.body);
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
});*/

app.post('/', function(req, res){ //라우팅이 여러가지에서 문제가 생겨..
    //res.render('index.html'); db datd를 로드시킬 하나의 방법?
    //아니면 아예 html 로드 방식을 바꿔버려?
    var title = req.body.title;
    var contents = req.body.contents;
    var date = new Date();
    Wikidb.findOne({'title':title},function(err,wiki){
        if(err){
           console.log(err);
           res.status(500).send('update error');
           return;
        }
       wiki.data = contents;
       wiki.edited_date = date;
       wiki.save(function(err,silence){
              if(err){
                 console.log(err);
                 res.json({status: 0});
                 return;
              }
              console.log(wiki);
              res.json({status: 1});
          });
      });
});
http.createServer(app).listen(3000, function(){
    console.log('Express 서버가 3000번 포트에서 시작됨');
});
