var express = require('express');
var router = express.Router();
var wikicon = require('../controllers/wikicon');
var Wikis = require('../models/wiki');
var jsdom = require('jsdom');
var window = jsdom.jsdom().createWindow();
var $ = require('jquery')(window);

router.get('/', function(req, res, next){
    Wikis.findOne({title: 'Door'}, function(err, wiki){
        if(err) return res.status(500).json({error: err}); //에러페이지로 전환.
        if(!wiki) return res.status(404).json({error: 'wiki not found'});

        res.render('index', {
            title: 'Door',
            data: wiki.data ,
            changes : 'recent changes'
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
