var Wikis = require('../models/wiki');

exports.edit = function(req, res){
    Wikis.findOne({'title': 'Door'}, function(err,wiki){ //후에 id작업.
        var title = req.body.title;
        var newcon = req.body.contents;
        if(err){
            console.log(err);
            res.status(500).send('update error');
            return;
        }

        wiki.contents = newcon;
        console.log(wiki.contents);

        wiki.save(function(err){
            if(err) res.status(500).json({error: 'failed to update'});
            res.render('index', {
                title: 'Door',
                data: wiki.contents,
                changes: 'recent changes' //수정.
            })
        });
    })
//여기서 ajax render.
};

exports.create = function(req, res){
    console.log(req.body);
    var wiki = new Wikis();
    wiki.title = req.body.title;
    //wiki.author = req.body.author;
    wiki.contents = req.body.contents;
    wiki.date = new Date();
    wiki.save(function(err){
        if(err){
            console.error(err);
            res.render({status: 0});
            console.log({status: 0});
            return;
        }
        res.render('create',{
            title : 'Created',
            data : wiki.contents,
            status : 1
        });
        console.log({status: 1});
    });
//대충완.
//여기서 ajax render.
};
