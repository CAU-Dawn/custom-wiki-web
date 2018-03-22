var express = require('express');
var router = express.Router();
var wikicon = require('../controllers/wikicon');
var Wikis = require('../models/wiki');
var Manages = require('../models/manage');

router.get('/', function(req, res, next){
    Wikis.find({}).sort({date:-1}).exec(function(err, wikis){
        // db에서 날짜 순으로 데이터들을 가져옴

        Wikis.findOne({title: 'Door'}, function(err, wiki){
            if(err){
                console.log('err');

                 return res.status(500).json({error: err})}; //에러페이지로 전환.
                 if(!wiki) return res.render('index',{
                    title:"Door",
                    data : "아무것도 없어요",
                    contents: wikis,
                    status:0
                 });


        res.render('index', {
            title: "Door",
            data : wiki.contents,
            contents: wikis,
            status:1
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
    var searchCondition = {$regex:search_word}; // regex의 쓰임새가 무엇?

    var page = req.param('page');
    if(page == null) {page = 1;}
    var skipSize = (page-1)*5;
    var limitSize = 5;
    var pageNum = 1;
    
    console.log('title:'+ search_word);
     // 앞, 뒤 공백 제거
    if(!search_word){
        res.render('search', {title: "Searched", page: "", contents: "", pagination:0  })
    } else {
        Wikis.findOne({title:search_word}).exec(function(err, wiki){
            Wikis.count({deleted:false, $or:[{title:searchCondition},{contents:searchCondition}]})
                .ne('title', search_word)
                .exec(function(err, totalCount){
                    pageNum = Math.ceil(totalCount/limitSize);
                Wikis.find({deleted:false, $or:[{title:searchCondition},{contents:searchCondition}]})
                    .ne('title', search_word)
                    .sort({date:-1})
                    .skip(skipSize)
                    .limit(limitSize)
                    .exec(function(err, searchContents){
                    if(err) throw err;
                    res.render('search', {title: search_word, page: wiki, contents: searchContents, pagination: pageNum});
                });
            });
        });
    };
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
            if(!wiki){
               /* var search_word = paramtitle;
                var searchCondition = {$regex:search_word};
                Wikis.find({title:searchCondition}).sort({}).exec(function(err, searchContents){
                    if(err) throw err;
                    res.render('search', {title: "Searched", page:"", contents: searchContents, pagination: 0});
                });*/
                res.render('error', {title: "Error"} )
            }
            //return res.status(404).json({error: 'wiki not found'});
             else{
                wiki.viewCount+=1;

                wiki.save(function(err){
                    if(err) throw err;
                })
                res.render('show', {
                    title: wiki.title,
                    data : wiki.contents
                
                });
            }
        });
})

router.get('/list', function(req, res){
    var page = req.param('page');
    if(page == null) {page = 1;}
    var skipSize = (page-1)*10;
    var limitSize = 10;
    var pageNum = 1;
    Wikis.count({deleted:false},function(err, totalCount){
        if(err) throw err;
        pageNum = Math.ceil(totalCount/limitSize);
        Wikis.find({deleted:false}).sort({number:-1}).skip(skipSize).limit(limitSize).exec(function(err, pageContents) {
            if(err) throw err;
            res.render('list', {title: "List", contents: pageContents, pagination: pageNum});
        });
    });
})

router.post('/delete', wikicon.delete);

router.post('/existPw', wikicon.existPw);

router.post('/checkPw', wikicon.checkPw);

router.get('/error', function(req, res){
    console.log(req.param('id'))
    res.render('error',{
        title: 'Error'
    })
})

router.post('/random', wikicon.random);

router.get('/trends', function(req, res){
    var limitSize = 10;
    Wikis.find({deleted:false}).sort({editCount:-1}).limit(limitSize).exec(function(err, wiki) {
        if(err) throw err;
        res.render('trends', {title: "Trends", contents: wiki});
    });
});

router.get('/about',function(req, res){
    res.render('about', {title: "About"});
})



module.exports = router;
