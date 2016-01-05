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
        $scope.backendSystems = ['LegStar'];

    }]);
