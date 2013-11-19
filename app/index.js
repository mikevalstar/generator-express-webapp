'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var ExpressWebappGenerator = module.exports = function ExpressWebappGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);
    
    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });
    
    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ExpressWebappGenerator, yeoman.generators.Base);

ExpressWebappGenerator.prototype.askFor = function askFor() {
    var cb = this.async();
    
    // have Yeoman greet the user.
    console.log(this.yeoman);
    
    var prompts = [{
        name: 'appname',
        message: 'What do you want to call your app?'
    }, {
        name: 'dbUser',
        message: 'What is the database user?',
        default: 'root'
    }, {
        name: 'dbPassword',
        message: 'What is the database password?',
        default: 'password'
    }, {
        type: 'confirm',
        name: 'bootstrap',
        message: 'Would you like to enable Twitter Bootstrap?',
        default: true
    }, {
        type: 'confirm',
        name: 'passportlogin',
        message: 'Would you like to enable Passport for an admin login system?',
        default: true
    }];
    
    this.prompt(prompts, function (props) {
        this.appname        = props.appname;
        this.appname        = this._.camelize(this._.slugify(this._.humanize(this.appname)));
        this.dbUser         = props.dbUser;
        this.dbPassword     = props.dbPassword;
        this.bootstrap      = props.bootstrap;
        this.passportlogin  = props.passportlogin;
        
        cb();
    }.bind(this));
};

ExpressWebappGenerator.prototype.app = function app() {
    this.mkdir('config');
    this.mkdir('views');
    this.mkdir('routes');
    this.mkdir('models');
    this.mkdir('public');
    this.mkdir('public/less');
    this.mkdir('public/img');
    this.mkdir('public/js');
    
    // basic package items
    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.template('_Gruntfile.js', 'Gruntfile.js');
    
    // Basic app items
    this.template('_app.js', 'app.js');
    
    // Config
    this.template('config/_config.js', 'config/config.js');
    
    // Basic Route
    this.template('routes/_index.js', 'routes/index.js');
    
    // Model Loader
    this.template('models/_index.js', 'models/index.js');
    
    // Views
    this.template('views/_layout.jade', 'views/layout.jade');
    this.template('views/_index.jade', 'views/index.jade');
    
    // Passport Login
    if (this.passportlogin) {
        this.mkdir('views/admin');
        
        this.template('views/admin/_layout.jade', 'views/admin/layout.jade');
        this.template('views/admin/_index.jade', 'views/admin/index.jade');
        this.template('views/admin/_login.jade', 'views/admin/login.jade');
        
        this.template('routes/_admin.index.js', 'routes/admin.index.js');
        this.template('routes/_admin.login.js', 'routes/admin.login.js');
        
        this.template('models/_User.js', 'models/User.js');
        
        this.template('public/_admin.less', 'public/less/admin.less');
        
        this.npmInstall(['passport', 'passport-local'], {save: true});
    }
    
    // Bower files
    if (this.bootstrap) {
        this.bowerInstall(['bootstrap'], {save: true});
    }
    this.template('public/_styles.less', 'public/less/styles.less');
};

ExpressWebappGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('bowerrc', '.bowerrc');
    this.copy('gitignore', '.gitignore');
};
