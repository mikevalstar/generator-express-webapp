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
        type: 'list',
        name: 'db',
        message: 'Select a database to install:',
        choices: [
            'MongoDB',
            'MySQL'
        ]
    }, {
        type: 'confirm',
        name: 'bootstrap',
        message: 'Would you like to enable Twitter Bootstrap?',
        default: true
    }];
    
    this.prompt(prompts, function (props) {
        this.dbOpt      = props.db;
        this.bootstrap  = props.bootstrap;
        
        cb();
    }.bind(this));
};

ExpressWebappGenerator.prototype.app = function app() {
    this.mkdir('app');
    this.mkdir('app/templates');
    
    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
};

ExpressWebappGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
};
