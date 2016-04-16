describe('Core Router', function() {
  var $rootScope,
    $location,
    $state,
    $templateCache;

  var views = {
    none: 'app/core/404.html'
  };

  beforeEach(function() {
    module('app.core');
    inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $state = $injector.get('$state');
      $location = $injector.get('$location');
      $templateCache = $injector.get('$templateCache');
      $templateCache.put(views.none, '404 Not Found');
    })
  });

  describe('state', function() {
    it('Should map /404 route to 404 view template', function() {
      expect($state.get('404').templateUrl).toEqual(views.none);
    });

    it('Should work with $state.go', function() {
      $state.go('404');
      $rootScope.$apply();
      expect($state.is('404')).toBeTruthy();
    });

    it('Should route /invalid to the otherwise (404) route', function() {
      $location.path('/invalid');
      $rootScope.$apply();
      expect($state.current.templateUrl).toEqual(views.none);
    });
  });
});
