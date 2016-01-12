'use strict';

/**
 * @ngdoc function
 * @name appModernizationApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the appModernizationApp
 * This is the parent controller for all. Inheritence can be applied here. Visiblity of user info is handled here.
 * 
 * @requires $scope
 * @requires breadcrumbs
 * 
 * @property {string} uesrName:string Static String for Username.
 * @property {object} breadcrumbs:object Page Navigation/Level
 * @property {object} displayProperties:object Holds if user info should be visible or not.
 * @property {boolean} displayProperties.isUserInfoVisible:boolean Holds boolean flag if the user info is visible or not.
 *
 */
angular.module('appModernizationApp')
    .controller('IndexCtrl', ['$scope', 'breadcrumbs', 'HRS', function($scope, breadcrumbs, HRS) {

        // $scope.userName = HRS.userName.substring(0, HRS.userName.indexOf('@'));
        $scope.userInfo = {};
        $scope.userInfo.userName = HRS.userName;
        
        $scope.breadcrumbs = breadcrumbs;
        
        $scope.displayProperties = {};
        $scope.displayProperties.isUserInfoVisible = false;
    }]);
