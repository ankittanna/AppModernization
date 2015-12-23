'use strict';

/**
 * @ngdoc function
 * @name appModernizationApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the appModernizationApp
 */
angular.module('appModernizationApp')
    .controller('IndexCtrl', ['$scope', '$http', 'HRS', '$location', 'breadcrumbs', function($scope, $http, HRS, $location, breadcrumbs) {

        $scope.uesrName = "John Doe";
        $scope.breadcrumbs = breadcrumbs;
        
        $scope.displayProperties = {};
        $scope.displayProperties.isUserInfoVisible = false;
    }]);
