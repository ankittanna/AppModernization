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
    ]).config(['$routeProvider', function($routeProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                label: ''
            })
            .when('/about', {
                controller: 'AboutCtrl',
                templateUrl: 'views/about.html',
                label: 'About'
            })
            .when('/search', {
                controller: 'SearchCtrl',
                controllerAs: 'search',
                templateUrl: 'views/search.html',
                label: 'Home'
            })
            .when('/search/details', {
                controller: 'DetailsCtrl',
                controllerAs: 'details',
                templateUrl: 'views/details.html',
                label: 'New Reservation'
            })
            //.when('/search/view/:param1', { controller: 'ViewCtrl', templateUrl:'views/view.html'})
            .when('/search/view/:param1/:param2', {
                controller: 'ViewCtrl',
                controllerAs: 'view',
                templateUrl: 'views/view.html',
                label: 'View Reservation'
            })
            .when('/search/delete', {
                controller: 'DeleteCtrl',
                controllerAs: 'delete',
                templateUrl: 'views/delete.html',
                label: ''
            })
            .when('/search/delete/:param1', {
                controller: 'DeleteCtrl',
                controllerAs: 'delete',
                templateUrl: 'views/delete.html',
                label: 'Cancel Reservation'
            })
            .when('/search/edit', {
                controller: 'ModifyCtrl',
                controllerAs: 'edit',
                templateUrl: 'views/edit.html',
                label: ''
            })
            .when('/search/edit/:param1', {
                controller: 'ModifyCtrl',
                controllerAs: 'edit',
                templateUrl: 'views/edit.html',
                label: 'Edit Reservation'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
