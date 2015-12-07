'use strict';

/**
 * @ngdoc function
 * @name appModernizationApp.controller:DetailsCtrl
 * @description
 * # DetailsCtrl
 * Controller of the appModernizationApp
 */
angular.module('appModernizationApp')
  .controller('DetailsCtrl', function ($location) {
    // Tab Visibility Logic
    angular.element('#appNavBar').css('display', 'block');
    // Tab Active Logic
    angular.element('#bookTab').addClass('active');
    angular.element('#searchTab').removeClass('active');
    
    
  });