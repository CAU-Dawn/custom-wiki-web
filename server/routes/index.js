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

router.get('/search', function(req, res){
   var search_word = req.param('searchWord');
   var searchCondition = {$regex:search_word};
   Wikis.find({deleted:false, $or:[{title:searchCondition},{contents:searchCondition}]}).sort({date:-1}).exec(function(err, searchContents){
       if(err) throw err;
       res.render('search', {title: "Searched", contents: searchContents});
   });
});

router.get('/recentchange', function(req, res){
    var page = req.param('page');
    if(page == null) {page = 1;}
    var skipSize = (page-1)*10;
    var limitSize = 10;
    var pageNum = 1;
    Wikis.count({deleted:false},function(err, totalCount){
        if(err) throw err;
        pageNum = Math.ceil(totalCount/limitSize);
        Wikis.find({deleted:false}).sort({date:-1}).skip(skipSize).limit(limitSize).exec(function(err, pageContents) {
            if(err) throw err;
            res.render('recentchange', {title: "Recent changes", contents: pageContents, pagination: pageNum});
        });
    });
})

router.get('/show', function(req, res){
    console.log(req.param('id'));
    var paramtitle = req.param('id');

        Wikis.findOne({title: paramtitle}, function(err, wiki){
            if(err){
                console.log('err');
                return res.status(500).json({error: err})
             }; //에러페이지로 전환.
            if(!wiki) return res.status(404).json({error: 'wiki not found'});

            res.render('show', {
                title: wiki.title,
                data : wiki.contents
            });
        });
})

router.post('/delete', wikicon.delete);

router.post('/existPw', wikicon.existPw);

router.post('/checkPw', wikicon.checkPw);

module.exports = router;
