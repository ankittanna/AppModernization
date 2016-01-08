'use strict';

/**
 * @ngdoc function
 * @name appModernizationApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appModernizationApp
 */
angular.module('appModernizationApp')
    .controller('MainCtrl', ['$scope', '$http', 'HRS', '$location', 'breadcrumbs', function($scope, $http, HRS, $location, breadcrumbs) {
        $scope.breadcrumbs = breadcrumbs;
        $scope.displayProperties.isUserInfoVisible = false;
        $scope.backendSystems = ['LEGSTAR', 'RAINCODE', 'MICROFOCUS', 'TUXEDO'];

        $scope.selectedSystem = "";

        this.onHRSGLogin = function(authType){
        	HRS.backendSystem = $scope.selectedSystem;
        	HRS.authType = authType;
        	HRS.authToken = 'Token1';//Pick From LocalStorage
        };

    }]);
