angular.module('Matboard.Application', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'Matboard.Filters',
  'Matboard.Directives'
])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('dashboard', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'ResourceController'
      });
  });
