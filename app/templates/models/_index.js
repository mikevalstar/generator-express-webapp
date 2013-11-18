'use strict';

var fs = require('fs'),
    path = require('path');

module.exports = function (sql) {
    
    var modelsPath = __dirname;
    var models = {};
    
    fs.readdirSync(modelsPath).forEach(function (file) {
        if (file.indexOf('.js') >= 0 && file !== 'index.js') {
            models[path.basename(file, '.js')] = require(modelsPath + '/' + file)(sql);
        }
    });
    
    return models;
    
};