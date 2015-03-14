var Mongoskin = require('mongoskin');

module.exports = function(connection,opts) {
    var model = {
        db: Mongoskin.db(connection,opts)
    };
    model.db.bind('users');
    model.users = model.db.users;

    return model;
};
