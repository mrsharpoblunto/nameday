var express = require('express');
var sessions = require('client-sessions');
var compression = require('compression');
var bodyParser = require('body-parser');
var ECT = require('ect');

var model = require('./lib/model');
var routes = require('./lib/routes');

var app = express();
app.set('port',process.env.PORT || 3080);

var ectRenderer = ECT({ watch: true, root: __dirname + '/views',ext: '.ect' });
app.set('view engine','ect');
app.set('views',__dirname + '/views');
app.engine('ect',ectRenderer.render);

app.use(sessions({
    cookieName: 'nameday_auth',
    secret: 'somereallysecretstring',
    duration: 365 * 24 * 60 * 60 * 1000,
    cookie: {
        path: '/',
        maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
        ephemeral: false,
        httpOnly: true,
        secure: false
    }
}));

app.use(compression());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.model = model('mongodb://localhost/nameday',{auto_reconnect:true});

//map all express routes
routes(app);

app.listen(app.get('port'),function() {
    console.log('Express server listening on port ' + app.get('port'));
});
