'use strict';

/**
 * @ngdoc function
 * @name appModernizationApp.controller:DetailsCtrl
 * @description
 * # DetailsCtrl
 * Controller of the appModernizationApp
 */
angular.module('appModernizationApp')
  .controller('DetailsCtrl', ['$scope','$http','HRS','$location',function ($scope,$http,HRS,$location) {

$scope.roomDetails = [{
                roomNo : 101,
                smoking: "Yes",
                rateCode: 'HA',
                roomRate: 1500,
                roomDesc: "Large Room with Wifi Facility",
                lateArrival: "Yes"
            },
            {
                roomNo : 102,
                smoking: 'Yes',
                rateCode: 'HA',
                roomRate: 1500,
                roomDesc: "Large Room with Wifi Facility",
                lateArrival: 'Yes'
            },
            {
                roomNo : 103,
                smoking: 'Yes',
                rateCode: 'HA',
                roomRate: 1500,
                roomDesc: "Large Room with Wifi Facility",
                lateArrival:'Yes'
            },
            {
                roomNo : 104,
                smoking: 'Yes',
                rateCode: 'HA',
                roomRate: 1500,
                roomDesc:"Large Room with Wifi Facility",
                lateArrival: 'Yes'
            }
        ]
      
this.fillRoomDetails = function(roomno,rateCode,roomRate,roomDesc,smokingFlag){
    console.log(" Data :"+roomno+rateCode+roomRate+roomDesc+smokingFlag);
    $scope.roomNumberTemp = roomno;
    $scope.rateCodeTemp = rateCode+" ";
    $scope.roomRateTemp = roomRate;
    $scope.roomDescTemp = roomDesc;
    $scope.smokingFlagTemp = smokingFlag;
   // $scope.lateArrivalTemp = lateArrival;
}
    
this.selectRoom = function(){
    $scope.roomNumber = $scope.roomNumberTemp;
    $scope.rateCode = $scope.rateCodeTemp;
    $scope.roomRate = $scope.roomRateTemp;
    $scope.roomDesc = $scope.roomDescTemp;
    $scope.smokingFlag = $scope.smokingFlagTemp;
    $scope.lateArrival = $scope.lateArrivalTemp;
    angular.element('.roomDetails').css('display', 'none');
}

this.searchRooms = function(){

    HRS.getRoomList(parseInt(angular.element($('#arrivalDate')).val().replace(/-/g,'')), 
                    parseInt(angular.element($('#arrivalDate')).val().replace(/-/g,'')),
                    angular.element($('#roomType')).val().slice(0,2)).then(function(data){
      $scope.roomDetails = data;
    });

    angular.element('.roomDetails').css('display', 'block');
};
      
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
    $scope.phoneNumber = angular.element($('#phoneNumber')).val();
    $scope.lateArrival = angular.element($('#lateArrival')).val();
    $scope.cardType = angular.element($('#cardType')).val();
    $scope.cardNumber = angular.element($('#cardNumber')).val();
    $scope.expiryMonth = angular.element($('#expiryMonth')).val();
    $scope.expiryYear = angular.element($('#expiryYear')).val();
    $scope.comments = angular.element($('#comments')).val();
    
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
    
    HRS.saveReservations(reservationDetails).then(function(data){
        
    });
    
    // dont use this. Use $location for changing the view.
    //window.location.href="http://localhost:9000/#/view";
    $location.path('/view');
}

      
    $scope.roomnumbers = ['101','102','103','104','105'];
       $scope.roomtype = ['AS-ANNIVERSARY SUITE',
'BD-BUDGET DOUBLE',
'BS-BUDGET SINGLE',
'DB-TWO DOUBLE BEDS',
'KI-SINGLE KING BED',
'MA-MID SIZE SUITE',
'PS-PRESIDENTIAL SUITE',
'QU-SINGLE QUEEN BED',
'SB-EDDY BARCLAY SUITE',
'SM-BUDGET SMALL',
'SO-ORIENTAL SUITE',
'SS-SWIMINGPOOL SUITE',
'ST-DONALD TRUMP SUITE',
'S1-ONE BED SUITE',
'S2-TWO BED SUITE',
'S3-THREE BED SUITE',
'S4-FOUR BED SUITE',
'S5-FIVE BED SUITE',
'S6-SIX BED SUITE ',
'S7-SEVEN BED SUITE',
'S8-EIGHT BED SUITE ',
'TW-TWO TWIN BEDS',
'WS-WEDDING SUITE'
 ];

 $scope.expirymonth = [
     {month: 'Jan', val: '01'},
     {month: 'Feb', val: '02'},
     {month: 'Mar', val: '03'},
     {month: 'Apr', val: '04'},
     {month: 'May', val: '05'},
     {month: 'Jun', val: '06'},
     {month: 'Jul', val: '07'},
     {month: 'Aug', val: '08'},
     {month: 'Sep', val: '09'},
     {month: 'Oct', val: '10'},
     {month: 'Nov', val: '11'},
     {month: 'Dec', val: '12'}
 ];

 $scope.expiryyear = [
     {year: '2015', val:'15'},
     {year: '2016', val:'16'},
     {year: '2017', val:'17'},
     {year: '2018', val:'18'},
     {year: '2019', val:'19'},
     {year: '2020', val:'20'},
     {year: '2021', val:'21'},
     {year: '2022', val:'22'},
     {year: '2023', val:'23'}
 ];

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

