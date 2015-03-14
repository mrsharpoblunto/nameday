var users = require('../data/users');

module.exports = function(req,res,next) {
    if (!req.nameday_auth.username) {
        redirectToAuth(req,res);
    } else {
        if (users.indexOf(req.nameday_auth.username) >= 0) {
            req.currentUser = req.nameday_auth.username;
            next();
        } else {
            redirectToAuth(req,res);
        }
    }
}

function redirectToAuth(req,res) {
    res.redirect('/signin');
}
