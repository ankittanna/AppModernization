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
  "lateArrivalFlag": false,
  "expiryDate": 1017,
  
 "room" : {
    "roomNo": 1,
    "smokeFlag": true,
    "roomType": "KI",
    "rateCode": "TW",
    "roomDescription": "Nice Room",
    "rate": 0
  }
};


    console.log("-----> "+JSON.stringify(reservationDetails) + '*******');
    
    HRS.saveReservations(reservationDetails).then(function(data){
        alert(data);
    });
    
    // dont use this. Use $location for changing the view.
    //window.location.href="http://localhost:9000/#/view";
    $location.path('/view');
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

