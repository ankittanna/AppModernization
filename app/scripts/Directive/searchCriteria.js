/**
 * @ngdoc directive
 * @name appModernizationApp.directive:searchCriteria
 * @restrict EA
 * @function
 * 
 * @description
 * This directive loads a template searchcriteria along with controller DetailsCtrl
 * 
 * <b>Restricted:</b> Element, Attribute
 *
 * @returns {Object} Object with directive configurations like template, controller, restriction.
 */

'use strict';

angular.module('appModernizationApp')
    .directive('searchCriteria', function () {
    return {
        restrict: 'EA', /*E = element, A = attribute, C = class, M = comment*/
       /* scope: {
            @ reads the attribute value, = provides two-way binding, & works with functions
            title: '@'         },
        template: 'Name: {{customer.name}}<br /> Street: {{customer.street}}',*/
        templateUrl: '../../template/searchcriteria.html',
        controller: 'DetailsCtrl' /* Embed a custom controller in the directive */
        /* link: function ($scope, element, attrs) { } */ /* DOM manipulation */
    };
});