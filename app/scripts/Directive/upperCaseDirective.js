/**
 * @ngdoc directive
 * @name appModernizationApp.directive:uppercased
 * @element input
 * @function
 * 
 * @description
 * This directive is used to convert whatever typed in the input type text or text area into an uppercase format. 
 * 
 * Required ngModel. Does not have an associated template.
 * <b>Restricted:</b> Element
 *
 * @returns {Object} Object with required and linker function which returns the uppercase string
 */

/**
 * @ngdoc function
 * @name appModernizationApp.directive:uppercased#LINK
 * @methodOf appModernizationApp.directive:uppercased
 * @element input
 * @function
 * 
 * @description
 * This method converts the string to upper case.
 *
 * @param {object} scope Scope of directive
 * @param {object} element Element itself
 * @param {object} attrs Attributes passed to the directive
 * @param {object} modelCtrl Model Controller
 *
 * @returns {string} Uppercase string of the input.
 */

angular.module('appModernizationApp')
    .directive('uppercased', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function(input) {
                return input ? input.toUpperCase() : "";
            });
            element.css("text-transform","uppercase");
        }
    };
})