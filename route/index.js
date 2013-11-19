'use strict';
var util = require('util');
var path = require('path');
var fs = require('fs');
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
        name: 'routename',
        message: 'What would you like to name the route?'
    },{
        name: 'modelname',
        message: 'What model should we base this off of (blank for none)?'
    }];
    
    var prompts2 = [{
        type: 'confirm',
        name: 'adminpanel',
        message: 'Should we create an admin page for this route?',
        default: true
    }];
    
    this.prompt(prompts, function (props) {
        this.modelname        = props.modelname;
        this.routename        = props.routename;
        this.adminpanel       = false;
        
        if(this.modelname){
            this.prompt(prompts2, function (props) {
                this.adminpanel = props.adminpanel;
                
                cb();
            }.bind(this));
        }else{
            cb();
        }
    }.bind(this));
};

ExpressWebappGenerator.prototype.app = function app() {
    
    // Model Type
    this.template('_route.js', 'routes/' + this.routename + '.js');
    this.template('_route.jade', 'views/' + this.routename + '.jade');
    
    if(this.modelname){
        this.template('_route.list.jade', 'views/list.' + this.routename + '.jade');
    }
    
    if(this.modelname && this.adminpanel){
        this.template('_route.admin.js', 'routes/admin.' + this.routename + '.js');
        this.template('_route.admin.jade', 'views/admin/' + this.routename + '.jade');
        this.template('_route.list.admin.jade', 'views/admin/list.' + this.routename + '.jade');
    }
    
};

ExpressWebappGenerator.prototype.projectfiles = function projectfiles() {

};
