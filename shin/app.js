var express = require('express');
var app = express();
var bodyParser = require('body-parser')

app.use(express.static('public_shin'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/index.html', function(req,res){
  //res.( __dirname + "/public/main.html")
});

app.post('/', function(req,res){
  //console.log(req.body)
  //res.send("welcome! " + req.body.email)
});

app.listen(3000, function(){
  console.log("start! express server is running on port 3000")
});
