var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var index = require('./server/routes/index');
var backdoor = require('./server/routes/backdoor'); // route 추가
var helmet = require('helmet');

var app = express();

app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('views', path.join(__dirname, 'server/views/pages'));
app.set('view engine', 'ejs');
app.set('view cache', true);

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log("Connected to mongod server");
});
mongoose.connect('mongodb://localhost:27017');

app.use('/', index);

app.use('/backdoor', backdoor);

app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
  });

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Error!');
});

module.exports = app;

app.listen(80, function(){
    console.log('Express 모드: '+app.get('env')+', Express 서버가 80번 포트에서 시작됨');
});
