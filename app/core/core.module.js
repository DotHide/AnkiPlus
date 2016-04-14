(function() {
  'use strict';

  angular
    .module('app.core', [
      // Angular modules
      'ngAnimate',
      'ngSanitize',

      'blocks.exception',
      'blocks.logger',
      'blocks.router',

      // Vendor modules
      'ui.router'
    ]);

})();
