'use strict';

module.exports = function(grunt) {

  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  //Project configuration
  grunt.initConfig({
    // Define Datas
    app: {
      name: 'ankiplus',
      src_path: 'app',
      build_path: 'build',
      dist_path: 'dist',
      test_path: 'spec'
    },

    // Config Tasks
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= app.build_path %>/*',
            '<%= app.dist_path %>/*'
          ]
        }]
      }
    },

    watch: {
      wiredep: {
        files: ['bower_components/*'],
        tasks: ['wiredep:dev']
      },
      inject: {
        files: ['<%= app.src_path %>/**'],
        tasks: ['injector', 'ngAnnotate']
      }
    },

    wiredep: {
      // Dev Target
      dev: {
        src: ['index.html']
      }
    },

    injector: {
      options: {
        template: 'index.html',
        addRootSlash: false
      },
      local_dependencies: {
        files: {
          'index.html': [
            '<%= app.build_path %>/**/*.module.dev.js',
            '<%= app.build_path %>/**/*.provider.dev.js',
            '<%= app.build_path %>/**/*.dev.js'
          ]
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true, // Only if you don't use comment directives!
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        },
        files: [{
          expand: true,
          cwd: '<%= app.dist_path %>',
          src: ['*.html'],
          dest: '<%= app.dist_path %>'
        }]
      }
    },

    ngtemplates: {
      dist: {
        options: {
          prefix: __dirname + '/app',
          module: 'ankiplus',
          htmlmin: '<%= htmlmin.dist.options %>',
          // usemin: 'scripts/templates.js'
        },
        cwd: '<%= app.src_path %>',
        src: '{,*/}*.html',
        dest: '.tmp/scripts/templates.js'
      }
    },

    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= app.src_path %>',
          src: '**/*.js',
          dest: '<%= app.build_path %>',
          ext: '.dev.js',
          extDot: 'last'
        }]
      }
    }
  });

  // Register Tasks
  grunt.registerTask('default', [
    'clean',
    'wiredep',
    'injector',
    'ngtemplates',
    'ngAnnotate'
  ]);

  grunt.registerTask('dev', [
    'default',
    'watch'
  ]);
}
