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
            '<%= app.build_path %>/{,*/}*.module.dev.js',
            '<%= app.build_path %>/{,*/}*.dev.js',
          ]
        }
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
          src: '{,*/}*.js',
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
    'ngAnnotate',
    'watch'
  ]);
}
