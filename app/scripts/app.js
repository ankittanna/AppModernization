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
 * @param {object} '/' - views/main.html, no controller
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


/**
 * @ngdoc directive
 * @name rfx.directive:rAutogrow
 * @element textarea
 * @function
 *
 * @description
 * Resize textarea automatically to the size of its text content.
 *
 * @example
   <example module="rfx">
     <file name="index.html">
         <textarea ng-model="text" r-autogrow class="input-block-level"></textarea>
         <pre>{{text}}</pre>
     </file>
   </example>
 */

/**
 * @ngdoc controller
 * @name rfx.controller:rAutogrow
 * @element textarea
 * @function
 *
 * @description
 * Resize textarea automatically to the size of its text content.
 *
 */

/**
 * @ngdoc service 
 * @name rfx.errorServices
 * @description
 * # AVAILABLE SERVICES
 *
 * The errorServices consist of a single error service named throwError. This is a very generic error service which works accross the application and it just needs a dependency of <strong>errorServices</strong> and a call to <strong>throwError</strong> method of the services.
 *
 * These are the list of services available within errorServices.
 * <ul>
 * <li>throwError</li>
 * </ul>
 * @property {string} errorHeader Holds the Error Box Header String
 * @property {string} errorDetails Holds the Error Box Details String
 * @param {int} entity id
 * @param {string} entity name
 * @requires $rootScope
 * @returns {servicesMapObject} services This maps the services with the functions listed in the file.
**/



/**
 * @ngdoc service
 * @name rfx.rest
 * @description
 * # rest
 * Service to talk with backend api.
 */

/**
     * @ngdoc
     * @name rfx.rest#get
     * @methodOf rfx.rest
     *
     * @description
     * Method to get data form the backend api
     * @example
     * rest.get(id);
     * @param {int} entity id
     * @returns {httpPromise} resolve with fetched data, or fails with error description.
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
