'use strict';

/**
 * @ngdoc function
 * @name appModernizationApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the appModernizationApp
 */
angular.module('appModernizationApp')
    .controller('SearchCtrl', ['$scope', '$http', 'HRS', '$location', 'breadcrumbs', 'DateService', function($scope, $http, HRS, $location, breadcrumbs, DateService) {
        $scope.breadcrumbs = breadcrumbs;
        $scope.responseMsg = "";
        $scope.reservations = [];
        $scope.searchValidated = true;
        this.searchLastName = '';
        this.searchArrivalDate = '';
        
        $scope.isRoomTableVisible = false;
        
        angular.element('.userInfo').css('display', 'block');
         
        $("input[type=text]").keyup(function() {
            $(this).val($(this).val().toUpperCase());
            this.searchLastName = $(this).val().toUpperCase();
        });

        this.getFormattedDate = function(rawDate) {
            var formatDate = DateService.convertToFormat(rawDate);
            return formatDate;
        };

        this.validateSearchCriteria = function() {
            var lastName = this.searchLastName.trim();
            var todayDate = new Date();
            var selectedDate = new Date(this.searchArrivalDate);

            if (lastName.length === 0) {
                $scope.isRoomTableVisible = false;
                $scope.responseMsg = 'Name cannot be blank';
                return false;
            } else if (selectedDate == 'Invalid Date') {
                $scope.isRoomTableVisible = false;
                $scope.responseMsg = 'Date Cannot be blank.';
                return false;
            }
            return true;
        };

        this.searchReservations = function() {
            this.searchLastName = this.searchLastName.toUpperCase().trim();
            if (this.validateSearchCriteria()) {
                var fullYear = (this.searchArrivalDate).getFullYear();
                var fullMonth = ("00" + (this.searchArrivalDate.getMonth() + 1)).slice(-2);
                var fullDate = ("00" + this.searchArrivalDate.getDate()).slice(-2);
                var arrivalDate = "" + fullYear + "" + fullMonth + "" + fullDate + "";

                HRS.searchReservations(this.searchLastName, arrivalDate).then(function(data) {
                    $scope.reservations = data;
                    $scope.responseMsg = "";
                    $scope.isRoomTableVisible = true;
                    if ($scope.reservations.length === 0) {
                        $scope.isRoomTableVisible = false;
                        $scope.responseMsg = "No reseravation found matching criteria.";
                    }
                }).catch(function(response) {
                    $scope.isRoomTableVisible = false;
                    $scope.responseMsg = response.data.errormessage;
                });

            }
        };
    }]);
