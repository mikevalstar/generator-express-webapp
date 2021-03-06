'use strict';
/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    fs = require('fs'),
    Sequelize = require('sequelize'),
    <% if(passportlogin){ %>passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    crypto = require('crypto'),<% } %>
    config = require('./config/config');

var sql = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    port: config.db.port,
    dialect: 'mysql',
    define: {
        charset: config.db.charset
    }
});

var app = express();

// Load the Models
app.set("models", require('./models')(sql));

<% if(passportlogin){ %>
// Passport
app.set("passport", passport);
passport.use(new LocalStrategy(
    function(username, password, done) {
        var md5sum = crypto.createHash('md5').update(password).digest('hex');
        
        app.get('models').User.find({ where: { username: username, password: md5sum } }).success(function (user) {
            
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            
            return done(null, {id: user.id , username: user.username});
            
        }).failure(function(error){
            return done(error);
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});
<% } %>

// all environments
app.set('port', process.env.PORT || config.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
<% if(passportlogin){ %>app.use(express.cookieParser());
app.use(express.session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());<% } %>
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
    app.use(express.errorHandler());
}

// Load the Routes
<% if(passportlogin){ %>app.set('adminRoutes', [])<% } %>
var routesPath = __dirname + '/routes';
fs.readdirSync(routesPath).forEach(function (file) {
    if (file.indexOf('.js') >= 0) {
        require(routesPath + '/' + file)(app, sql);
    }
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
