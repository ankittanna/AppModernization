'use strict';

/**
 * @ngdoc function
 * @name appModernizationApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appModernizationApp
 * This controller is the main view page controller. Controls the login page. Allows you to chose which server/backend system you wish to hit.
 * 
 * @requires $scope
 * @requires $http
 * @requires $location
 * @requires HRS
 * @requires breadcrumbs
 * 
 * @property {object} breadcrumbs:object Page Navigation/Level
 * @property {object} displayProperties:object Controls visibility of login info
 * @property {array} backendSystems:array Holds the list of all backend systems.
 * @property {string} selectedSystem:string Selected Backend System
 *
 */
angular.module('appModernizationApp')
    .controller('MainCtrl', ['$scope', '$http', 'HRS', '$location', 'breadcrumbs', function($scope, $http, HRS, $location, breadcrumbs) {
        $scope.breadcrumbs = breadcrumbs;
        $scope.displayProperties.isUserInfoVisible = false;
        $scope.backendSystems = ['LEGSTAR', 'RAINCODE', 'MICROFOCUS', 'TUXEDO'];

        $scope.selectedSystem = "";
        
/**
 * @ngdoc function
 * @name appModernizationApp.controller:MainCtrl#onHRSGLogin
 * @methodOf appModernizationApp.controller:MainCtrl
 * 
 * @description
 * Saves the token and selected system and authentication type for the login.
 *
 * @returns {null} Returns nothing.
 */           
        this.onHRSGLogin = function(authType){
        	HRS.backendSystem = $scope.selectedSystem;
        	HRS.authType = authType;
        	HRS.authToken = 'Token1';//Pick From LocalStorage
        };

    }]);
