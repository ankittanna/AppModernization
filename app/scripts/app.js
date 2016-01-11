'use strict';

/**
 * @ngdoc overview
 * @name appModernizationApp
 * @description
 * # HRS: Hotel Reservation System
 * 
 * This is the main module of the application where all the dependencies and configuration of the application is done. This resides in app.js file.
 * 
 * This module has a config function which then allows to configure routes of the application.
 *
 * All the dependencies are injected in this module which allows them to be used in further controllers.
 * @requires ng-breadcrumbs
 * @requires ngAnimate
 * @requires ngAria
 * @requires ngCookies
 * @requires ngMessages
 * @requires ngResource
 * @requires ngRoute
 * @requires ngSanitize
 * @requires ngTouch
 * @requires ui.bootstrap
 */

/**
 * @ngdoc interface
 * @name appModernizationApp.config
 * @description
 * # HRS: Configuration of Angular App
 * @description
 * This module of the app allows you to configure the application with different parameters as well as define routes and associated templates.
 * 
 * The config function uses $routeProvider to define the routes for the application
 * 
 * @requires $routeProvider
 * 
 */

/**
 * @ngdoc function
 * @name appModernizationApp.config#routeProvider
 * @methodOf appModernizationApp.config
 * @description
 * # routeProvider
 *
 * This configuration is present in the JavaScript file app.js.
 *
 * This configuration is responsible for defining the routes of the application.
 * 
 * @requires $routeProvider
 * @requires $httpProvider
 * @param {object} '/' - views/main.html, MainCtrl
 * @param {object} '/about' - views/about.html, AboutCtrl
 * @param {object} '/search' - views/search.html, SearchCtrl
 * @param {object} '/search/details' - views/details.html, DetailsCtrl
 * @param {object} '/search/details/:param1' - views/details.html, DetailsCtrl - Edit Mode, param1: reservation id
 * @param {object} '/search/view/:param1/:param2' - views/view.html, ViewCtrl - View Mode
 * @param {object} '/search/delete' - views/delete.html, DeleteCtrl
 * @param {object} '/search/delete/:param1' - views/delete.html, DeleteCtrl - Cancel Reservation
 * @returns {null} Returns nothing.
 * @example
 * config(['$routeProvider', function($routeProvider, $httpProvider){});
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
        'ngTouch',
        'ui.bootstrap'
    ]).config(['$routeProvider', function($routeProvider) {
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
            .when('/search/details/:param1', {
                controller: 'DetailsCtrl',
                controllerAs: 'details',
                templateUrl: 'views/details.html',
                label: 'Edit Reservation'
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
            .otherwise({
                redirectTo: '/'
            });
    }]);
