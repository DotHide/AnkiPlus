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
        files: ['<%= app.src_path %>/*'],
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
        relative: true
      },
      local_dependencies: {
        files: {
          'index.html': [
            '<%= app.dist_path %>/{,*/}*.module.js',
            '<%= app.dist_path %>/{,*/}*.js',
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
          dest: '<%= app.dist_path %>',
          ext: '.js',
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
