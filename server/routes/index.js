var express = require('express');
var router = express.Router();
var wikicon = require('../controllers/wikicon')

router.get('/', function(req, res, next){ //index 페이지를 만들기위해서 create페이지를 먼저 만들어보려고.
    res.render('index', {title: 'Door'});
})
router.post('/', wikicon.edit ); //초기render를 get으로 받고, ajax요청을 post로 받으려고 이렇게 routing을 분기함.

router.get('/create', function(req, res, next){ //초기 render와 ajax 후 render의 문제.
    // 현재 mongoose find query로 초기 render를 할 생각.
    res.render('create', {
        title: 'Create',
        data:
    })
})
router.post('/create', wikicon.create);

module.exports = router;
