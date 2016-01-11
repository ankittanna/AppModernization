'use strict';

/**
 * @ngdoc function
 * @name appModernizationApp.controller:DeleteCtrl
 * @description
 * # DeleteCtrl
 * Controller of the appModernizationApp
 * This controller handles the view model of the delete/cancel reservation. This is responsible for cancelling the existing reservations.
 * 
 * It initially fetches the details of the reservation by requesting the data based on reservationId. The reservationId is then used to cancel the reservation.
 * This fetching is done using <b>HRS.getRegisteredData(reservationID)</b> which fetches the data and stores the data in <b>reservedData</b> and manipulates the data using <b>UtilitiesService</b> to make it usable for the View-Model binding. Finally, when all the manipulations is done the reservation details are stored in <b>$scope.reservationDetails</b>
 * @requires $scope
 * @requires $http
 * @requires $routeProvider
 * @requires HRS
 * @requires $location
 * @requires $routeParams
 * @requires breadcrumbs
 * @requires UtilitiesService
 * 
 * @property {object} breadcrumbs:object breadcrumbs Handles the page level/navigation at the top.
 * @property {array} reservationDetails:array This holds the reservation details of the current/selected reservation.
 * @property {array} reservedData:array This holds the reservation details of the current/selected reservation.
 * @property {number} reservationId:array Holds the reservationId of the current/selected booking.
 *
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

/**
 * @ngdoc function
 * @name appModernizationApp.controller:DeleteCtrl#deleteReservation
 * @methodOf appModernizationApp.controller:DeleteCtrl
 * 
 * @description
 * This method calls the service <b>HRS.cancelReservation(reservationId)</b> for cancelling the reservation. It picks the reservation id on the scope variable and calls the service for cancelling the reservation.
 * Once the cancel reservation service is called successfully it then moves back to search reservations page.
 *
 * @returns {null} Returns nothing.
 */        
        
        this.deleteReservation = function() {
            HRS.cancelReservation($scope.reservationId).then(function(data) {
                // var reservationId = data.reservationId;
                console.log('Detail Data  ' + JSON.stringify(data));
                $location.path('/search');     
            }).catch(function(response) {
                console.log('Response ' + JSON.stringify(response));
            });
        };

    }]);
