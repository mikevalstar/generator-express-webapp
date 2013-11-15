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
    }];
    
    this.prompt(prompts, function (props) {
        this.appname        = props.appname;
        this.appname        = this._.camelize(this._.slugify(this._.humanize(this.appname)));
        this.dbUser         = props.dbUser;
        this.dbPassword     = props.dbPassword;
        this.bootstrap      = props.bootstrap;
        
        cb();
    }.bind(this));
};

ExpressWebappGenerator.prototype.app = function app() {
    this.mkdir('app');
    this.mkdir('app/config');
    this.mkdir('app/views');
    this.mkdir('app/routes');
    
    // basic package items
    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    
    // Basic app items
    this.copy('_app.js', 'app.js');
    
    // Config
    this.copy('config/_config.js', 'config/config.js');
    
    // Basic Route
    this.copy('routes/_index.js', 'routes/index.js');
    
    // Views
    this.copy('views/_layout.jade', 'views/layout.jade');
    this.copy('views/_index.jade', 'views/index.jade');
};

ExpressWebappGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
};
