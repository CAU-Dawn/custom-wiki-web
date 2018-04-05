var express = require('express');
var router = express.Router();
var wikicon = require('../controllers/wikicon');
var Wikis = require('../models/wiki');
var Manages = require('../models/manage');
var Trends = require('../models/trend');


router.get('/delete', function(req, res){
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
            res.render('backdoor/delete', {title: "Delete Page", contents: pageContents, pagination: pageNum});
        });
    });
})

router.get('/manager', function(req, res){
    Manages.findOne({title: "manager1"}, function(err, manager){
        if(!manager){
            var manager = new Manages;
            manager.title = 'manager1';
            manager.number = 0;
            manager.save(function(err){
                if(err){
                    console.error(err);
                    console.log("manager DB save failed.");
                    return;
                }
            });
        }
        res.render('backdoor/manager', {title: "Manager DB", manager: manager })
    })
})

router.post('/pwChange', function(req, res){
    Manages.findOne({title:"manager1"}, function(err, manager){
        manager.password = req.body.password;
        manager.save();
        res.send({status:1});
    })
})

router.get('/search', function(req, res){
    var search_word = req.param('searchWord');
    var searchCondition = {$regex:search_word}; // regex의 쓰임새가 무엇?

    var page = req.param('page');
    if(page == null) {page = 1;}
    var skipSize = (page-1)*5;
    var limitSize = 5;
    var pageNum = 1;
     
    if(!search_word){
        res.render('backdoor/search', {title: "Searched", page: "", contents: "", pagination:0  })
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
                    res.render('backdoor/search', {title: search_word, page: wiki, contents: searchContents, pagination: pageNum});
                });
            });
        });
    };
});

module.exports = router;