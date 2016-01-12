'use strict';

/**
 * @ngdoc function
 * @name appModernizationApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the appModernizationApp
 * Controller of search room page. Holds the functionality for searching rooms.
 * 
 * @requires $scope
 * @requires $http
 * @requires $location
 * @requires HRS
 * @requires breadcrumbs
 * 
 * @property {object} breadcrumbs:object Page Navigation/Level
 * @property {string} responseMsg:string Response Message from server.
 * @property {array} reservations:array Holds available reservations.
 * @property {boolean} searchValidated:boolean Is search criteria valid
 * @property {string} searchLastName:string Last name for search criteria
 * @property {string} searchArrivalDate:string Arrival date in string format
 *
 */
angular.module('appModernizationApp')
    .controller('SearchCtrl', ['$scope', '$http', 'HRS', '$location', 'breadcrumbs', 'UtilitiesService', function($scope, $http, HRS, $location, breadcrumbs, UtilitiesService) {
        $scope.breadcrumbs = breadcrumbs;
        $scope.responseMsg = '';
        $scope.reservations = [];
        $scope.searchValidated = true;
        this.searchLastName = '';
        this.searchArrivalDate = '';

        $scope.userInfo.userName = HRS.userName;
        //$http.defaults.headers.common['X-AUTH-TOKEN'] = HRS.authToken;
        //$http.defaults.headers.common['X-AUTH-TYPE'] = HRS.authType;
        //$http.defaults.headers.common['X-BACK-END'] = HRS.backendSystem;


/**
 * @ngdoc function
 * @name appModernizationApp.controller:SearchCtrl#open
 * @methodOf appModernizationApp.controller:SearchCtrl
 * 
 * @description
 * Controls the opening and closing of the date picker.
 *
 * @returns {null} Returns nothing. Sets the date picker #1 and #2 open status.
 */           
         $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
        };

        
        $scope.isRoomTableVisible = false;
        
        $scope.displayProperties.isUserInfoVisible = true;
/**
 * @ngdoc function
 * @name appModernizationApp.controller:SearchCtrl#utilities
 * @methodOf appModernizationApp.controller:SearchCtrl
 * 
 * @description
 * Holds the utilities service functions in an object
 *
 * @returns {object} Type UtilitiesService
 */ 
        
        this.utilities = UtilitiesService;
        
        /*this.getFormattedDate = function(rawDate) {
            var formatDate = UtilitiesService.convertToFormat(rawDate);
            return formatDate;
        };*/

/**
 * @ngdoc function
 * @name appModernizationApp.controller:SearchCtrl#validateSearchCriteria
 * @methodOf appModernizationApp.controller:SearchCtrl
 * @property {string} lastName:string Last name on which search is made
 * @property {date} selectedDate:date Selected arriaval date in date object format
 * @description
 * Validates Search Criteria
 *
 * @returns {boolean} True/False
 */        
        
        this.validateSearchCriteria = function() {
            var lastName = this.searchLastName.trim();
            // var todayDate = new Date();
            var selectedDate = new Date(this.searchArrivalDate);

            if (lastName.length === 0) {
                $scope.isRoomTableVisible = false;
                $scope.responseMsg = 'Name cannot be blank';
                return false;
            } else if (selectedDate === 'Invalid Date') {
                $scope.isRoomTableVisible = false;
                $scope.responseMsg = 'Date Cannot be blank.';
                return false;
            }
            return true;
        };

/**
 * @ngdoc function
 * @name appModernizationApp.controller:SearchCtrl#searchReservations
 * @methodOf appModernizationApp.controller:SearchCtrl
 * 
 * @description
 * Calls HRS service to search reservation based on last name and arrival date.
 *
 * @returns {boolean} True/False
 */        
        
        this.searchReservations = function() {
            this.searchLastName = this.searchLastName.toUpperCase().trim();
            if (this.validateSearchCriteria()) {
                var fullYear = (this.searchArrivalDate).getFullYear();
                var fullMonth = ('00' + (this.searchArrivalDate.getMonth() + 1)).slice(-2);
                var fullDate = ('00' + this.searchArrivalDate.getDate()).slice(-2);
                var arrivalDate = '' + fullYear + '' + fullMonth + '' + fullDate + '';

                HRS.searchReservations(this.searchLastName, arrivalDate).then(function(data) {
                    $scope.reservations = data;
                    $scope.responseMsg = '';
                    $scope.isRoomTableVisible = true;
                    if ($scope.reservations.length === 0) {
                        $scope.isRoomTableVisible = false;
                        $scope.responseMsg = 'No reseravation found matching criteria.';
                    }
                }).catch(function(response) {
                    $scope.isRoomTableVisible = false;
                    $scope.responseMsg = response.data.errormessage;
                });

            }
        };
    }]);
