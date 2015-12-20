'use strict';

/**
 * @ngdoc function
 * @name appModernizationApp.controller:ViewCtrl
 * @description
 * # ViewCtrl
 * Controller of the appModernizationApp
 */
angular.module('appModernizationApp')
    .controller('ViewCtrl', ['$scope', '$http', 'HRS', '$location', '$routeParams', 'breadcrumbs', function($scope, $http, HRS, $location, $routeParams, breadcrumbs) {

        //$scope.breadcrumbs = breadcrumbs;
         //$('.breadcrumb li').eq(1).remove();
        if(breadcrumbs.breadcrumbs.length >= 3){
            breadcrumbs.breadcrumbs.splice(1,1);
        }     
        $scope.breadcrumbs = breadcrumbs;  

        var reservedData = [];

        $scope.responseMsg = "";


        $scope.reservationId = $routeParams.param1;
        if($routeParams.param2 != undefined){
            var param2 = $routeParams.param2;   

            if(param2 == 'fromsearch'){
               $scope.responseMsg = "";
               HRS.getRegisteredData($scope.reservationId).then(function(data) {
            reservedData = data;

                $scope.reservationId = reservedData.reservationId;

            $scope.arrivalDate = reservedData.arrivalDate;
            $scope.departureDate = reservedData.departureDate;
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
            console.log(JSON.stringify(reservedData));
        })
            }
            else if  (param2 == 'fromadd'){
                $scope.responseMsg = "Congratulations: Reservation Successfully Done.";
                reservedData = HRS.getReservedRoomData();
                 $scope.reservationId = reservedData.reservationId;

            $scope.arrivalDate = reservedData.arrivalDate;
            $scope.departureDate = reservedData.departureDate;
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
                
            }
             else if  (param2 == 'fromedit'){
                 $scope.responseMsg = "Reservation Successfully Updated";
                 reservedData = HRS.getReservedRoomData();
                  $scope.reservationId = reservedData.reservationId;

            $scope.arrivalDate = reservedData.arrivalDate;
            $scope.departureDate = reservedData.departureDate;
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
            }
        }

       
           

    


    }]);
