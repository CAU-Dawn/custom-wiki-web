var Wikis = require('../models/wiki');
var Manages = require('../models/manage');

exports.edit = function(req, res){
    if(req.body.path == req.body.title || req.body.title == 'Door'){
        Wikis.findOne({'title': req.body.title}, function(err,wiki){
            console.log(req.body.path);
            if(!wiki) return res.status(404).json({error: 'wiki does not exist'});
            var title = req.body.title;
            var newcon = req.body.contents;
            wiki.date = new Date();
            if(err){
                console.log(err);
                res.status(500).send('update error');
                return;
            }
            wiki.contents = newcon;
            console.log(wiki.contents);
            wiki.save(function(err){
                if(err) res.status(500).json({error: 'failed to update'});
                res.send({status:1});
            });
        })
    } else {
        res.send({status:404});
    }
};

exports.create = function(req, res){
    //title 검사 로직 구현안돼있음.
    Manages.findOne({title: 'manager1'},function(err, manage){
        console.log(manage);
        console.log(manage.number);
        Wikis.findOne({'title': req.body.title}, function(err, wiki){
            if(wiki) {
                return res.send({status:404})
            } else {
                console.log(req.body);
                var wiki = new Wikis();
                if(req.body.password){
                    wiki.password = req.body.password;
                }
                wiki.title = req.body.title;
                wiki.number = manage.number;
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
                manage.number = manage.number+1;
                manage.save(function(err){
                    if(err){
                        console.error(err);
                        res.render({status: 0});
                        console.log({status: 0});
                        return;
                    }
                })
            }
        });

    });
};

exports.delete = function(req, res){
    if(req.body.path == req.body.title){
        Wikis.remove({title: req.body.title}, function(err, output){
            if(err) return res.status(500).json({ error: "database failure" });
            res.send({status:1});
        })
    } else {
        res.send({status:404});
    }
};
