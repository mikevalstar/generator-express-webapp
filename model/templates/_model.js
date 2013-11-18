'use strict';

var Sequelize = require('sequelize');

module.exports = function (sql) {

    var <%= modelname %> = sql.define('<%= modelname %>', {
        id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        title: Sequelize.STRING,
        description: Sequelize.TEXT
    });
    
    return <%= modelname %>;
    
};