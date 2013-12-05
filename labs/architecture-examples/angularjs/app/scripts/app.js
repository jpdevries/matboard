angular.module('MatboardApplication', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'phonecatFilters'
])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('dashboard', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      });
  });
