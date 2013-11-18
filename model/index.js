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
        name: 'modelname',
        message: 'What would you like to name the model?'
    }];
    
    this.prompt(prompts, function (props) {
        this.modelname        = props.modelname;
        
        cb();
    }.bind(this));
};

ExpressWebappGenerator.prototype.app = function app() {
    
    // Model Type
    this.template('_model.js', 'models/' + this.modelname + '.js');
    
};

ExpressWebappGenerator.prototype.projectfiles = function projectfiles() {

};
