var auth = require('./auth');
var users = require('../data/users');
var names = require('../data/names');

module.exports = function(app) {

app.get('/',auth,function(req,res) {
    res.render('index');
});

app.get('/choose',auth,function(req,res) {
    app.model.users.findAndModify(
        {username:req.currentUser},
        {username: 1},
        {
            $setOnInsert: {
                username: req.currentUser,
                currentIndex: 0,
                shortList: []
            }
        },
        {
            new: true,
            upsert: true
        }
    ,function(err,user) {
        if (err) {
            console.log(err);
            res.status(500);
            return;
        }

        if (user.currentIndex >= names.length) {
            res.json({
                hasNext: false
            });
        } else {
            res.json({
                hasNext: true,
                name: names[user.currentIndex]
            });
        }
    });
});

app.post('/choose',auth,function(req,res) {
    
    app.model.users.findAndModify(
        {username:req.currentUser},
        {username: 1},
        {
            $inc: { currentIndex: 1 }
        },
        {}
    ,function(err,user) {
        if (err) {
            console.log(err);
            res.status(500);
            return;
        }

        if (user.currentIndex < names.length && req.body.accept) {

            app.model.users.findAndModify(
                {username:req.currentUser},
                {username: 1},
                {
                    $push: { shortList: names[user.currentIndex] }
                },
                {}
            ,function() {
                console.log('Added '+names[user.currentIndex]+' to '+ req.currentUser+'\'s short list');
            });
        } 

        if (user.currentIndex >= names.length) {
            res.json({
                hasNext: false
            });
        } else {
            res.json({
                hasNext: true,
                name: names[user.currentIndex+1]
            });
        }
    });
});

app.get('/shortlist',function(req,res) {
    app.model.users.find().toArray(function(err,found) {
        if (err) {
            console.log(err);
            res.status(500);
            return;
        }

        var shortList = [];
        var histogram = {};
        for(var j=0;j< found.length;++j) {
            var user = found[j];

            for (var i = 0;i < user.shortList.length;++i) {
                if (histogram[user.shortList[i]]) {
                    histogram[user.shortList[i]]++;
                } else {
                    histogram[user.shortList[i]] = 1;
                }
            }

            for (var key in histogram) {
                if (histogram[key] ===  users.length) {
                    shortList.push(key);
                }
            }
        }
        res.render('shortlist',{shortList: shortList});
    });
});

app.get('/signin',function(req,res) {
    res.render('signin',{});
});

app.post('/signin',function(req,res) {
    var username = req.body.username;

    if (users.indexOf(username) >=0) {
        req.nameday_auth.username = username;
        res.json({
            success: true
        });
    } else {
        res.json({
            success: false
        });
    }
});

};

