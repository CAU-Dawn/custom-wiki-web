var express = require('express');
var router = express.Router();
var wikicon = require('../controllers/wikicon');
var Wikis = require('../models/wiki');

router.get('/', function(req, res, next){
    Wikis.find({}).sort({date:-1}).exec(function(err, wikis){
        // db에서 날짜 순으로 데이터들을 가져옴

        Wikis.findOne({title: 'Door'}, function(err, wiki){
            if(err){
                console.log('err');

                 return res.status(500).json({error: err})}; //에러페이지로 전환.
                 if(!wiki) return res.status(404).json({error: 'wiki not found'});


        res.render('index', {
            title: "Door",
            data : wiki.contents,
            contents: wikis
        });
        // board.ejs의 title변수엔 “Board”를, contents변수엔 db 검색 결과 json 데이터를 저장해줌.
        });

    });
});
router.post('/', wikicon.edit );

router.get('/create', function(req, res, next){
    res.render('create', {
        title: 'Create',
        data: 'Hello'
    });
    // 현재 mongoose find query로 초기 render를 할 생각.
});
router.post('/create', wikicon.create);

/*
app.get('/searech/:wiki_title', function(req, res){
    Wikis.findOne({title: req.params.wiki_title}, function(err, wiki){
        if(err) return res.status(500).json({error: err});
        if(!wiki) return res.status(404).json({error: 'wiki not found'});
        res.json(wiki);
    })
});
*/

module.exports = router;
