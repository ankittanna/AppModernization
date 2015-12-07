'use strict';

/**
 * @ngdoc function
 * @name appModernizationApp.controller:DetailsCtrl
 * @description
 * # DetailsCtrl
 * Controller of the appModernizationApp
 */
angular.module('appModernizationApp')
  .controller('DetailsCtrl', function () {
    
    console.log("Comes here 1");
    angular.element('#appNavBar').css('display', 'block');
    console.log("Comes here 2");
    
    
  });