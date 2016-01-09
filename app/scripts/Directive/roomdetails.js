/**
 * @ngdoc directive
 * @name appModernizationApp.directive:roomDetails
 * @function
 * 
 * @description
 * This directive just loads template. It is not in implementation currently.
 * 
 * <b>Restricted:</b> Element, Attribute
 *
 * @returns {Object} Object with directive configurations like template.
 */

'use strict';
angular.module('appModernizationApp')
    .directive('roomDetails', function () {
    return {
        restrict: 'EA', //E = element, A = attribute, C = class, M = comment         
       // scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
         //   title: '@'         },
        //template: 'Name: {{customer.name}}<br /> Street: {{customer.street}}',
        templateUrl: '../../template/roomdetails.html'
        //controller: 'ViewCtrl' //Embed a custom controller in the directive
        //link: function ($scope, element, attrs) { } //DOM manipulation
    };
});