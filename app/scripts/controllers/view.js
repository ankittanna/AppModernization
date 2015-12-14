'use strict';

/**
 * @ngdoc function
 * @name appModernizationApp.controller:ViewCtrl
 * @description
 * # ViewCtrl
 * Controller of the appModernizationApp
 */
angular.module('appModernizationApp')
  .controller('ViewCtrl', ['$scope','$http','HRS','$location','breadcrumbs',function ($scope,$http,HRS,$location,breadcrumbs) {
      
      $scope.breadcrumbs = breadcrumbs;
      
      var reservedData = HRS.getReservedRoomData();
      console.log("ViewController Data :"+JSON.stringify(reservedData));
      console.log("FirstNAme :"+reservedData.customer.firstName);
      
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
      
      
  }]);