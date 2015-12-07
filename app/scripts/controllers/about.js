'use strict';

/**
 * @ngdoc function
 * @name appModernizationApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the appModernizationApp
 */
angular.module('appModernizationApp')
  .controller('AboutCtrl', function () {
    
    angular.element('#appNavBar').css('display', 'block');
    
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
