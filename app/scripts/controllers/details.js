'use strict';

/**
 * @ngdoc function
 * @name appModernizationApp.controller:DetailsCtrl
 * @description
 * # DetailsCtrl
 * Controller of the appModernizationApp
 */
angular.module('appModernizationApp')
  .controller('DetailsCtrl', ['$scope','$http','HRS',function ($scope,$http,HRS,$location) {

      
this.storeDetails = function(){
    $scope.arrivalDate = angular.element($('#arrivalDate')).val();
    $scope.departureDate = angular.element($('#departureDate')).val();
    $scope.roomType = angular.element($('#roomType')).val();
    $scope.firstName = angular.element($('#firstName')).val();
    $scope.middleName = angular.element($('#middleName')).val();
    $scope.lastName = angular.element($('#lastName')).val();
    $scope.addressLine1 = angular.element($('#addressLine1')).val();
    $scope.addressLine2 = angular.element($('#addressLine2')).val();
    $scope.addressLine3 = angular.element($('#addressLine3')).val();
    $scope.companyName = angular.element($('#companyName')).val();
    $scope.phonenumber = angular.element($('#phonenumber')).val();
    $scope.lateArrival = angular.element($('#lateArrival')).val();
    $scope.cardType = angular.element($('#cardType')).val();
    $scope.cardNumber = angular.element($('#cardNumber')).val();
    $scope.expiryMonth = angular.element($('#expiryMonth')).val();
    $scope.expiryYear = angular.element($('#expiryYear')).val();
    $scope.comments = angular.element($('#comments')).val();
    
    $scope.arrivalDate = $scope.arrivalDate.replace(/-/g,'');
    //$scope.arrivalDate = $scope.reverse($scope.arrivalDate);
    console.log($scope.arrivalDate);

    HRS.saveReservations($scope.arrivalDate,$scope.departureDate,$scope.roomType, $scope.firstName, $scope.middleName, $scope.lastName, $scope.addressLine1, $scope.addressLine2, $scope.addressLine3, $scope.companyName, $scope.phonenumber, $scope.lateArrival, $scope.cardType, $scope.cardNumber, $scope.expiryMonth, $scope.expiryYear, $scope.comments);
    
    window.location.href="http://localhost:9000/#/view";
}

      
    $scope.roomnumbers = ['101','102','103','104','105'];
       $scope.roomtype = ['ANNIVERSARY SUITE',
'BUDGET DOUBLE',
'BUDGET SINGLE',
'TWO DOUBLE BEDS',
'SINGLE KING BED',
'MID SIZE SUITE',
'PRESIDENTIAL SUITE',
'SINGLE QUEEN BED',
'EDDY BARCLAY SUITE',
'BUDGET SMALL',
'ORIENTAL SUITE',
'SWIMINGPOOL SUITE',
'DONALD TRUMP SUITE',
'ONE BED SUITE',
'TWO BED SUITE',
'THREE BED SUITE',
'FOUR BED SUITE',
'FIVE BED SUITE',
'SIX BED SUITE ',
'SEVEN BED SUITE',
'EIGHT BED SUITE ',
'TWO TWIN BEDS',
'WEDDING SUITE'
 ];

 $scope.expirymonth = ['Jan','Feb','Mar','Apr','May'];

 $scope.expiryyear = ['2015','2016','2017','2018','2019'];

    $scope.ratecode = ['TW - TWIN ROOM EAST EXPOSURE',
'AN - SINGLE ROOM EAST',
'KN - KING SIZE NORTH EXPOSURE',
'KS - KING SIZE SOUTH EXPOSURE',
'KE - KING SIZE EAST EXPOSURE',
'KW - KING SIZE WEST EXPOSURE',
'DB - TWO DOUBLE BEDS WEST',
];
    // Tab Visibility  Logic
      
    angular.element('#appNavBar').css('display', 'block');
    // Tab Active Logic
    angular.element('#bookTab').addClass('active');
    angular.element('#searchTab').removeClass('active');
    
    
  }]);

