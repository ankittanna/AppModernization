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