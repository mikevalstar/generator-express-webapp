'use strict';
var semver = require('semver');

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: { jshintrc: true },
            all: ['Gruntfile.js', 'test/**/*.js']
        },
        release: {
            options: {
                commitMessage: '<%= version %>',
                tagName: 'v<%= version %>',
                bump: false, // we have our own bump
                file: 'package.json'
            }
        },
        stage: {
            options: {
                files: []
            }
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

    grunt.registerTask('default', ['bump', 'release', 'jshint']);
};