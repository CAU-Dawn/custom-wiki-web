var Wikis = require('../models/wiki');
var Manages = require('../models/manage');

exports.edit = function(req, res){
    
        Wikis.findOne({'title': req.body.title}, function(err,wiki){
            console.log(req.body.path);
            if(!wiki) return res.status(404).json({error: 'wiki does not exist'});
            var title = req.body.title;
            var newcon = req.body.contents;
            wiki.date = new Date();
            wiki.editCount+=1;
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
                req.body.title = req.body.title.replace(/(<([^>]+)>)/gi, "");
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

exports.existPw = function(req, res){
    Wikis.findOne({title:req.body.path}, function(err, wiki){
        console.log(wiki.password);
        if(wiki.password == null)
            res.send({status:1}); // password가 존재하지 않을 시 1을 반환
        else
            res.send({status:3}); // password가 존재할 시 3을 반환
    })
}

exports.checkPw = function(req, res){
    Wikis.findOne({title: req.body.path}, function(err, wiki){
        if(wiki.password == req.body.password)
            res.send({status:1}); // 패스워드 성공
        else
            res.send({status:4}); // 패스워드 실패
    })
}

exports.random = function(req, res){
    Manages.findOne({title:'manager1'}, function(err, manage){
        console.log("위키:  "+manage);
        var random = Math.floor(Math.random() * manage.number) + 1;
        Wikis.findOne({number:random}, function(err, wiki){
            if(!wiki)
                res.send({status:2});
            else
                res.send({status:1, path:wiki.title});
            
        })
    })
}

exports.createPw = function(req, res){
    if(req.body.password == '0421'){
        res.send({status:'success'});
    } else 
        res.send({status:'fail'});
}