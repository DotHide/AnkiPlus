(function() {
  'use strict';

  angular
    .module('blocks.logger')
    .factory('logger', logger);

  function logger($log, toastr) {
    var service = {
      showToasts: true,

      error: error,
      info: info,
      success: success,
      warning: warning,

      log: $log.log
    };

    return service;

    /* ============================== */

    function error(message, data, title) {
      toastr.error(message, title);
      $log.error('ERROR: ' + message, data);
    }

    function info(message, data, title) {
      toastr.info(message, title);
      $log.info('INFO: ' + message, data);
    }

    function success(message, data, title) {
      toastr.success(message, title);
      $log.success('SUCCESS: ' + message, data)
    }

    function warning(message, data, title) {
      toastr.warning(message, title);
      $log.warning('WARNING: ' + message, data);
    }
  }

})();
