'use strict';

/**
 * @ngdoc function
 * @name appModernizationApp.controller:EditCtrl
 * @description
 * # EditCtrl
 * Controller of the appModernizationApp
 */
angular.module('appModernizationApp')
  .controller('EditCtrl', ['$scope','$http','HRS','$location','$routeParams',function ($scope,$http,HRS,$location,$routeParams) {
      
      var reservedData =[ ];
      $scope.reservationId = $routeParams.param1;
      
      HRS.getRegisteredData($scope.reservationId).then(function(data){
          reservedData = data;
          console.log(JSON.stringify(reservedData));

          $scope.arrivalDate = reservedData.arrivalDate;
          $scope.departureDate = reservedData.departureDate;
          $scope.roomType = reservedData.room.roomType;
          $scope.roomNumber = reservedData.room.roomNo;
          $scope.roomDesc =  reservedData.room.roomDescription;
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
      });
          
      this.fillRoomDetails = function(roomno,rateCode,roomRate,roomDesc,smokingFlag)
      {
        console.log(" Data :"+roomno+rateCode+roomRate+roomDesc+smokingFlag);
        $scope.roomNumberTemp = roomno;
        $scope.rateCodeTemp = rateCode+" ";
        $scope.roomRateTemp = roomRate;
        $scope.roomDescTemp = roomDesc;
        $scope.smokingFlagTemp = smokingFlag;
       // $scope.lateArrivalTemp = lateArrival;
      }
    
        this.selectRoom = function()
        {
            $scope.roomNumber = $scope.roomNumberTemp;
            $scope.rateCode = $scope.rateCodeTemp;
            $scope.roomRate = $scope.roomRateTemp;
            $scope.roomDesc = $scope.roomDescTemp;
            $scope.smokingFlag = $scope.smokingFlagTemp;
            $scope.lateArrival = $scope.lateArrivalTemp;
            angular.element('.roomDetails').css('display', 'none');
        }

        this.searchRooms = function()
        {

            HRS.getRoomList(parseInt(angular.element($('#arrivalDate')).val().replace(/-/g,'')), 
                            parseInt(angular.element($('#departureDate')).val().replace(/-/g,'')),
                            angular.element($('#roomType')).val().slice(0,2)).then(function(data){
                              console.log(JSON.stringify(data));
              $scope.roomDetails = data;
            });

            angular.element('.roomDetails').css('display', 'block');
        };
      
      
        this.editReservation = function()
        {
              console.log("Inside Edit reservation");

                $scope.arrivalDate = $scope.arrivalDate.replace(/-/g,'');
                $scope.departureDate = $scope.departureDate.replace(/-/g,'');

                var reservationDetails = {
                "customer": {
                "firstName": $scope.firstName,
                "lastName": $scope.lastName,
                "middleName": $scope.middleName,
                "addressLine1": $scope.addressLine1,
                "addressLine2": $scope.addressLine2,
                "addressLine3": $scope.addressLine3,
                "phoneNumber": $scope.phoneNumber,
                "companyName": $scope.companyName
              },

              "arrivalDate": parseInt($scope.arrivalDate),
              "departureDate": parseInt($scope.departureDate),
              "cardNumber": $scope.cardNumber,
              "cardType": $scope.cardType,
              "comments1": $scope.comments,
              "comments2": "",
              "lateArrivalFlag": $scope.lateArrival == "on" ? true:false,
              "expiryDate": parseInt($scope.expiryMonth + $scope.expiryYear, 0),

             "room" : {
                "roomNo": parseInt(angular.element('#roomNumber').val()),
                "smokeFlag": $scope.smokingFlag == "Yes" ? true:false,
                "roomType": $scope.roomType,
                "rateCode": $scope.rateCode,
                "roomDescription": $scope.roomDesc,
                "rate": parseInt($scope.roomRate)
              }
            };


            console.log("-----> "+JSON.stringify(reservationDetails) + '*******');
                   
            HRS.editReservation(reservationDetails,$scope.reservationId).then(success)
            .catch(failure);

          function success(response) {
            console.log('reaching success function');
            $location.path('/search');
            return response;
          }

          function failure(error) {
            console.log('XHR Failed for searchReservation' + JSON.stringify(error));
            return error;
          };
      }
      
  }]);