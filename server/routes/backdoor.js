var express = require('express');
var router = express.Router();
var wikicon = require('../controllers/wikicon');
var Wikis = require('../models/wiki');
var Manages = require('../models/manage');

// 백도어 페이지 
router.get('/main',function(req, res){
    res.render('backdoor/main',{title:"Backdoor"});
})

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
    res.render('backdoor/manager', {title: "Manager DB"})
})

module.exports = router;