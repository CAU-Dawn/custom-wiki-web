var express = require('express');
var router = express.Router();
var wikicon = require('../controllers/wikicon');
var Wikis = require('../models/wiki');

router.get('/', function(req, res, next){
    //index 페이지를 만들기위해서 create페이지를 먼저 만들어보려고.
    Wikis.findOne({title: 'Door'}, function(err, book){
        if(err) return res.status(500).json({error: err});
        //에러페이지로 전환.
        //if(!wiki) return res.status(404).json({error: 'wiki not found'});
        res.render('index', {
            title: 'Door',
            //data: wiki //이부분 wiki잡아내기.
            //log:
        });
    });
})
router.post('/', wikicon.edit );
//초기render를 get으로 받고, ajax요청을 post로 받으려고 이렇게 routing을 분기함.

router.get('/create', function(req, res, next){
    res.render('create', {
        title: 'Create',
        data: 'Hello'
    });
    //초기 render와 ajax 후 render의 문제.
    // 현재 mongoose find query로 초기 render를 할 생각.
});
router.post('/create', wikicon.create);

/*
app.get('/api/books/:book_id', function(req, res){
    Book.findOne({_id: req.params.book_id}, function(err, book){
        if(err) return res.status(500).json({error: err});
        if(!book) return res.status(404).json({error: 'book not found'});
        res.json(book);
    })
});
*/


module.exports = router;
