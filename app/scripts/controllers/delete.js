'use strict';

/**
 * @ngdoc function
 * @name appModernizationApp.controller:DeleteCtrl
 * @description
 * # DeleteCtrl
 * Controller of the appModernizationApp
 */
angular.module('appModernizationApp')
    .controller('DeleteCtrl', ['$scope', '$http', 'HRS', '$location', '$routeParams', 'breadcrumbs', function($scope, $http, HRS, $location, $routeParams, breadcrumbs) {

        $scope.breadcrumbs = breadcrumbs;

        var reservedData = [];
        $scope.reservationId = $routeParams.param1;

        HRS.getRegisteredData($scope.reservationId).then(function(data) {
            reservedData = data;
            console.log(JSON.stringify(reservedData));

            $scope.reservationId = reservedData.reservationId;

            var arrival = reservedData.arrivalDate.toString();
            var departure = reservedData.departureDate.toString();
            $scope.arrivalDate = arrival.slice(6, 8) + "/" + arrival.slice(4, 6) + "/" + arrival.slice(0, 4);
            $scope.departureDate = departure.slice(6, 8) + "/" + departure.slice(4, 6) + "/" + departure.slice(0, 4);
            $scope.roomType = reservedData.room.roomType;
            $scope.roomNumber = reservedData.room.roomNo;
            $scope.roomDesc = reservedData.room.roomDescription;
            $scope.roomRate = reservedData.room.rate;
            $scope.rateCode = reservedData.room.rateCode;
            $scope.smokingFlag = reservedData.room.smokeFlag;
            $scope.lateArrivalFlag = reservedData.lateArrivalFlag;
            $scope.firstName = reservedData.customer.firstName;
            $scope.lastName = reservedData.customer.lastName;
            $scope.middleName = reservedData.customer.middleName;
            $scope.addressLine1 = reservedData.customer.addressLine1;
            $scope.addressLine2 = reservedData.customer.addressLine2;
            $scope.addressLine3 = reservedData.customer.addressLine3;
            $scope.companyName = reservedData.customer.companyName;
            $scope.phoneNumber = reservedData.customer.phoneNumber;
            $scope.cardType = reservedData.cardType;
            $scope.cardNumber = reservedData.cardNumber;
            $scope.expiryDate = reservedData.expiryDate;
            $scope.comments = reservedData.comments1;
        }).catch(function(response) {
            // TODO: Is this really required?
            // angular.element('#roomTable').css('display', 'none'); 
            console.log(JSON.stringify(response));
        });

        this.registrationErrorMessage = '';

        this.deleteReservation = function() {
            console.log("Inside Delte reservation");
            HRS.cancleReservation($scope.reservationId).then(function(data) {
                this.registrationErrorMessage = '';
                
                var reservationId = data.reservationId;
                console.log("Detail Data  " + JSON.stringify(data));
                $location.path('/search');     
            }).catch(function(response) {
                this.registrationErrorMessage = response.data.errormessage;
            });
        }

    }]);
