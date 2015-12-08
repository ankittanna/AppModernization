'use strict';

/**
 * @ngdoc function
 * @name appModernizationApp.controller:DetailsCtrl
 * @description
 * # DetailsCtrl
 * Controller of the appModernizationApp
 */
angular.module('appModernizationApp')
  .controller('DetailsCtrl', ['$scope','$http',function ($scope,$http,$location) {
          
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