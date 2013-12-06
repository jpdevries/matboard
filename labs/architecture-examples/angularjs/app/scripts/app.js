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
        data: {
          pageTitle: 'New Resource'
        },
        templateUrl: 'views/main.html',
        controller: 'ResourceController'
      });
  })
  .run(function ($rootScope, $document, $state) {
    $rootScope.$on('$stateChangeSuccess', function () {
        document.title = ($state.current.data != undefined ? $state.current.data.pageTitle + ' :: ' : '') + 'Matboard App';
    });
  });
