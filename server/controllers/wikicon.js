var Wikis = require('../models/wiki');

exports.edit = function(req, res){
    var title = req.body.title;
    var contents = req.body.contents;
    Wikis.findOne({'title':title}, function(err,wiki){
        if(err){
            console.log(err);
            res.status(500).send('update error');
            return;
        }
    })
//미완.
//여기서 ajax render.
};

exports.create = function(req, res){
    console.log(req.body);
    var wiki = new Wikis();
    wiki.title = req.body.title;
    //wiki.author = req.body.author;
    wiki.data = req.body.contents;
    wiki.edited_date = new Date();
    wiki.save(function(err){
        if(err){
            console.error(err);
            res.render({status: 0});
            console.log({status: 0});
            return;
        }
        res.render('create',{
            title : 'Created',
            data : wiki.data,
            status : 1
        });
        console.log({status: 1});
    });
//대충완.
//여기서 ajax render.
};
