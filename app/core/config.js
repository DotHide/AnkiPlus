(function() {
  'use strict';

  var config = {
    appErrorPrefix: '[AnkiPlus Error] ',
    appTitle: 'AnkiPlus'
  }

  angular
    .module('app.core')
    .value('config', config)
    .config(toastrConfig);

  /* @ngInject */
  function toastrConfig(toastr) {
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toastr-top-center';
  }

})();
