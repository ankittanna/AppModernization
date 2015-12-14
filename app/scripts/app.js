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
  .module('appModernizationApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
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
