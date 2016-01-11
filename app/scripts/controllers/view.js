'use strict';

/**
 * @ngdoc function
 * @name appModernizationApp.controller:ViewCtrl
 * @description
 * # ViewCtrl
 * Controller of the appModernizationApp
 * For View mode of the reservations made. This controller fetches the details of the reservation from the HRS services based on the route definition listed in app.js
 * 
 * @requires $scope
 * @requires $http
 * @requires $location
 * @requires $routeParams
 * @requires HRS
 * @requires breadcrumbs
 * @requires UtilitiesService
 * 
 * @property {object} breadcrumbs:object Page Navigation/Level
 * @property {string} responseMsg:string Response Message from server.
 * @property {array} reservationDetails:array Holds available reservations details.
 * @property {object} reservedData:object Holds reserved data of the current reservation on the screen.
 * @property {number} reservationId:number Reservation ID of the current reservation on the screen. Taken from the Route Parameter.
 *
 */
angular.module('appModernizationApp')
    .controller('ViewCtrl', ['$scope', '$http', 'HRS', '$location', '$routeParams', 'breadcrumbs', 'UtilitiesService', function($scope, $http, HRS, $location, $routeParams, breadcrumbs, UtilitiesService) {

        if (breadcrumbs.breadcrumbs.length >= 3) {
            breadcrumbs.breadcrumbs.splice(1, 1);
        }

        $scope.breadcrumbs = breadcrumbs;
        $scope.reservationDetails = [];
        $scope.responseMsg = '';
        var reservedData = {};

        $scope.reservationId = $routeParams.param1;
        if ($routeParams.param2 !== undefined) {
            var param2 = $routeParams.param2;

            if (param2 === 'fromsearch') {
                $scope.responseMsg = '';
                HRS.getRegisteredData($scope.reservationId).then(function(data) {
                    reservedData = data;
                    reservedData.arrivalDate = UtilitiesService.convertToFormat(reservedData.arrivalDate);
                    reservedData.departureDate = UtilitiesService.convertToFormat(reservedData.departureDate);
                    $scope.reservationDetails = reservedData;

                });
            } else {
                if (param2 === 'fromadd') {
                    $scope.responseMsg = 'Congratulations: Reservation Successfully Done.';
                } else if (param2 === 'fromedit') {
                    $scope.responseMsg = 'Reservation Successfully Updated';
                }
                reservedData = HRS.getReservedRoomData();
                reservedData.arrivalDate = UtilitiesService.convertToFormat(reservedData.arrivalDate);
                reservedData.departureDate = UtilitiesService.convertToFormat(reservedData.departureDate);
                $scope.reservationDetails = reservedData;
            }
        }
    }]);
