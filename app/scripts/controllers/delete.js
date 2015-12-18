'use strict';

/**
 * @ngdoc function
 * @name appModernizationApp.controller:DeleteCtrl
 * @description
 * # DeleteCtrl
 * Controller of the appModernizationApp
 */
angular.module('appModernizationApp')
  .controller('DeleteCtrl', ['$scope','$http','HRS','$location','$routeParams','breadcrumbs',function ($scope,$http,HRS,$location,$routeParams,breadcrumbs) {
      
      $scope.breadcrumbs = breadcrumbs;
      
      var reservedData =[ ];
      $scope.reservationId = $routeParams.param1;
      
      HRS.getRegisteredData($scope.reservationId).then(function(data){
          reservedData = data;
          console.log(JSON.stringify(reservedData));

          $scope.reservationId = reservedData.reservationId;

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
      
     
      
      this.deleteReservation = function(){
          console.log("Inside Delte reservation");
          HRS.cancleReservation($scope.reservationId).then(function (data){

             if(data.status == 200)    
     {
        angular.element('#registerationError').css('display', 'none');
        var reservationId = data.reservationId;

         console.log("Detail Data  "  + JSON.stringify(data));
       $location.path('/search');
         
     } else 
     {
  if(data.data === null || data.data===undefined){
     angular.element('#registerationError').html("Unknown Error")
  }
  else{
        angular.element('#registerationError').html(data.data.errormessage);
 }
        angular.element('#registerationError').css('display', 'block');



     }
            

          });
      
       
      }
      
  }]);