var Wikis = require('../models/wiki');

exports.edit = function(req, res){
    Wikis.findOne({'title': req.body.title}, function(err,wiki){
        if(!wiki) return res.status(404).json({error: 'wiki not exists'});
        var title = req.body.title;
        var newcon = req.body.contents;
        wiki.date = new Date();
        if(err){
            console.log(err);
            res.status(500).send('update error');
            return;
        }
         //title자체가 바껴서 넘어오는 요청은 오류띄워야함.

        wiki.contents = newcon;
        console.log(wiki.contents);

        wiki.save(function(err){
            if(err) res.status(500).json({error: 'failed to update'});
            res.send({status:1});
        });
    })
};

exports.create = function(req, res){
    Wikis.findOne({'title': req.body.title}, function(err,wiki){
        var ranstat = Math.floor(Math.random()*10);
        if(wiki) {
            return res.send({status:ranstat})
        } else {
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
                res.send({status:1, newtitle: req.body.title});
            });
        }
    });

};
