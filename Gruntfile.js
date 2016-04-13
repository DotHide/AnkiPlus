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
      src_path: 'app/',
      dist_path: 'dist/',
      test_path: 'spec/' 
    },

    // Config Tasks
    wiredep: {
      // Dev Target
      dev: {
        src: ['index.html']
      }
    }
  });

  // Register Tasks
  grunt.registerTask('default', [
    'wiredep:dev'
  ]);
}
