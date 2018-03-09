var Wikis = require('../models/wiki');

exports.edit = function(req, res){
    Wikis.findOne({'title': 'Door'}, function(err,wiki){ //후에 id작업.
        var title = req.body.title;
        var contents = req.body.contents;
        if(err){
            console.log(err);
            res.status(500).send('update error');
            return;
        }

        wiki.data = contents;
        console.log(wiki.data);

        wiki.save(function(err){
            if(err) res.status(500).json({error: 'failed to update'});
            res.render('index', {
                title: 'Door',
                data: wiki.data,
                changes: 'recent changes' //수정.
            })
        });
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
