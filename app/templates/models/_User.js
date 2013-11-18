'use strict';

var Sequelize = require('sequelize');

module.exports = function (sql) {

    var User = sql.define('User', {
        id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        username: Sequelize.STRING,
        password: Sequelize.STRING
    });
    
    return User;
    
};