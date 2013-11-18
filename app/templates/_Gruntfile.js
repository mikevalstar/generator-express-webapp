'use strict';
var semver = require('semver');

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: { jshintrc: true },
            all: ['Gruntfile.js', 'app/**/*.js', 'test/**/*.js']
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('bump', 'bump manifest version', function (type) {
        var options = this.options({
            file: grunt.config('pkgFile') || 'package.json'
        });

        function setup(file, type) {
            var pkg = grunt.file.readJSON(file);
            var newVersion = pkg.version = semver.inc(pkg.version, type || 'patch');
            return {
                file: file,
                pkg: pkg,
                newVersion: newVersion
            };
        }

        var config = setup(options.file, type);
        grunt.file.write(config.file, JSON.stringify(config.pkg, null, '  ') + '\n');
        grunt.log.ok('Version bumped to ' + config.newVersion);
    });
    
    grunt.registerTask('dbInit', 'Sync and load the database objects', function () {
        grunt.log.writeln('Syncing database');
        
        var done = this.async();
        
        var Sequelize = require('sequelize'),
            config = require('./config/config');
        
        var sql = new Sequelize(config.db.database, config.db.user, config.db.password, {
            host: config.db.host,
            port: config.db.port,
            dialect: 'mysql',
            define: {
                charset: config.db.charset
            }
        });
        
        require('./models')(sql);
        
        sql.sync().success(function () {
            grunt.log.ok("Database Synced");
            done(true);
        }).error(function (error) {
            grunt.log.writeln(error);
            done(false);
        });
    });

    grunt.registerTask('default', ['jshint']);
};