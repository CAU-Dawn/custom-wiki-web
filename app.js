
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var index = require('./server/routes/index');

var app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('views', path.join(__dirname, 'server/views/pages'));
app.set('view engine', 'ejs');


var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log("Connected to mongod server");
});
mongoose.connect('mongodb://localhost:27017');


app.use('/', index); //이거 일케 하는거 맞나? Q.
app.use('/create', index);
//app.get('/comments', comments.hasAuthorization, comments.list);
//app.post('/comments', comments.hasAuthorization, comments.create);


module.exports = app;


http.createServer(app).listen(3000, function(){
    console.log('Express 서버가 3000번 포트에서 시작됨');
});
