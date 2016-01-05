'use strict';

/**
 * @ngdoc function
 * @name appModernizationApp.controller:DeleteCtrl
 * @description
 * # DeleteCtrl
 * Controller of the appModernizationApp
 */
angular.module('appModernizationApp')
    .controller('DeleteCtrl', ['$scope', '$http', 'HRS', '$location', '$routeParams', 'breadcrumbs', 'UtilitiesService',function($scope, $http, HRS, $location, $routeParams, breadcrumbs, UtilitiesService) {

        $scope.breadcrumbs = breadcrumbs;

        $scope.reservationDetails = [];
        var reservedData = [];
        $scope.reservationId = $routeParams.param1;

        HRS.getRegisteredData($scope.reservationId).then(function(data) {
            reservedData = data;
            console.log(JSON.stringify(reservedData));
            reservedData = data;
            reservedData.arrivalDate = UtilitiesService.convertToFormat(reservedData.arrivalDate);
            reservedData.departureDate = UtilitiesService.convertToFormat(reservedData.departureDate);
            $scope.reservationDetails = reservedData;

        }).catch(function(response) {
            // TODO: Is this really required?
            // angular.element('#roomTable').css('display', 'none'); 
            console.log(JSON.stringify(response));
        });

        this.deleteReservation = function() {
            HRS.cancleReservation($scope.reservationId).then(function(data) {
                // var reservationId = data.reservationId;
                console.log("Detail Data  " + JSON.stringify(data));
                $location.path('/search');     
            }).catch(function(response) {
                console.log('Response ' + JSON.stringify(response));
                //this.registrationErrorMessage = response.data.errormessage;
            });
        };

    }]);
