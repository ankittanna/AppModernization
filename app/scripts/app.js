'use strict';

/**
 * @ngdoc overview
 * @name appModernizationApp
 * @description
 * # appModernizationApp
 *
 * Main module of the application.
 */
angular
  .module('appModernizationApp', ['ng-breadcrumbs',
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ]).config(['$routeProvider', function($routeProvider,$httpProvider) {
      $routeProvider
        .when('/', { templateUrl: 'views/main.html', label: '' })
        .when('/about', { controller: 'AboutCtrl', templateUrl:'views/about.html', label:'About'})
        .when('/search', { controller: 'SearchCtrl', templateUrl: 'views/search.html', label:'Home'})
        .when('/search/details', { controller: 'DetailsCtrl',templateUrl: 'views/details.html',label: 'New Reservation'})
        .when('/search/view/:param1', { controller: 'ViewCtrl', templateUrl:'views/view.html', label:''})
        .when('/search/view/:param1/:param2', { controller: 'ViewCtrl', templateUrl:'views/view.html', label:'View Reservation'})
        .when('/search/delete', { controller: 'DeleteCtrl', templateUrl:'views/delete.html', label:''})
        .when('/search/delete/:param1', {controller: 'DeleteCtrl',templateUrl: 'views/delete.html',label:'Cancel Reservation'})
        .when('/search/edit', {controller: 'ModifyCtrl',templateUrl: 'views/edit.html',label: ''})
        .when('/search/edit/:param1', {controller: 'ModifyCtrl',templateUrl: 'views/edit.html',label: 'Edit Reservation'})
        .otherwise({ redirectTo: '/' });
}]);


    
    
    




/*
  .config(function ($routeProvider, $httpProvider) {
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
    
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
    .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl',
        controllerAs: 'search'
      })
    .when('/details', {
        templateUrl: 'views/details.html',
        controller: 'DetailsCtrl',
        controllerAs: 'details'
      })
    .when('/view', {
        templateUrl: 'views/view.html',
        controller: 'ViewCtrl',
        controllerAs: 'view'
      })
    .when('/delete', {
        templateUrl: 'views/delete.html',
        controller: 'DeleteCtrl',
        controllerAs: 'delete'
      })
    .when('/delete/:param1', {
            templateUrl: 'views/delete.html',
            controller: 'DeleteCtrl',
            controllerAs: 'delete'
            })
    .when('/edit', {
            templateUrl: 'views/edit.html',
            controller: 'EditCtrl',
            controllerAs: 'edit'
            })
    .when('/edit/:param1', {
            templateUrl: 'views/edit.html',
            controller: 'EditCtrl',
            controllerAs: 'edit'
            })
      .otherwise({
        redirectTo: '/'
      });
      

  });
*/