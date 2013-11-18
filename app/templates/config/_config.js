var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
    development: {
        root: rootPath,
        app: {
            name: '<%= _.slugify(appname) %>'
        },
        port: 3000,
        db: {
            host     : '127.0.0.1',
            port     : '8889',
            user     : '<%= _.slugify(dbUser) %>',
            password : '<%= _.slugify(dbPassword) %>',
            database : '<%= _.slugify(appname) %>-development',
            charset  : 'utf8'
        }
    },

    test: {
        root: rootPath,
        app: {
            name: '<%= _.slugify(appname) %>'
        },
        port: 3000,
        db: {
            host     : '127.0.0.1',
            port     : '3306',
            user     : '<%= _.slugify(dbUser) %>',
            password : '<%= _.slugify(dbPassword) %>',
            database : '<%= _.slugify(appname) %>-test',
            charset  : 'utf8'
        }
    },

    production: {
        root: rootPath,
        app: {
            name: '<%= _.slugify(appname) %>'
        },
        port: 3000,
        db: {
            host     : '127.0.0.1',
            port     : '3306',
            user     : '<%= _.slugify(dbUser) %>',
            password : '<%= _.slugify(dbPassword) %>',
            database : '<%= _.slugify(appname) %>-production',
            charset  : 'utf8'
        }
    }
};

module.exports = config[env];