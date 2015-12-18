'use strict';

/**
 * @ngdoc function
 * @name appModernizationApp.controller:DetailsCtrl
 * @description
 * # DetailsCtrl
 * Controller of the appModernizationApp
 */
angular.module('appModernizationApp')
  .controller('DetailsCtrl', ['$scope','$http','HRS','$location','breadcrumbs',function ($scope,$http,HRS,$location,breadcrumbs) {
      $scope.breadcrumbs = breadcrumbs;
      
      $("input[type=text]").keyup(function(){
        $(this).val( $(this).val().toUpperCase() );
      });
      
      $("textarea").keyup(function(){
        $(this).val( $(this).val().toUpperCase() );
      });
      $scope.lateArrival = "false";
      $('#lateArrival').click(function(){
            if($(this).prop("checked") == true){
                $scope.lateArrival = "true";
            }
            else if($(this).prop("checked") == false){
                $scope.lateArrival = "false";
            }
          console.log($scope.lateArrival);
      });

$scope.roomDetails = [];
      
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
                    parseInt(angular.element($('#departureDate')).val().replace(/-/g,'')),
                    angular.element($('#roomType')).val().slice(0,2)).then(function(data){
                      console.log(JSON.stringify(data));
     if(data.status == 200)    
     {
         $scope.roomDetails = data.data;
         
         if($scope.roomDetails.length ==0 ){
        angular.element('.roomDetails').css('display', 'none');
        angular.element('.unavailableroom label').html('No Room Available with given Criteria. Please change the search criteria and search again.');
        angular.element('.unavailableroom').css('display', 'block');
          }
          else{
            angular.element('.unavailableroom').css('display', 'none');
            angular.element('.roomDetails').css('display', 'block');

          }
         
     } else 
     {
         angular.element('.unavailableroom label').html(data.data.errormessage);
         angular.element('.unavailableroom').css('display', 'block');
     }
    });

    
};
      
this.storeDetails = function(){
    $scope.arrivalDate = angular.element($('#arrivalDate')).val();
    $scope.departureDate = angular.element($('#departureDate')).val();
    //$scope.roomNumber = angular.element($('#roomNumber')).val();
    $scope.roomType = angular.element($('#roomType')).val();
    $scope.firstName = angular.element($('#firstName')).val().toUpperCase();
    $scope.middleName = angular.element($('#middleName')).val().toUpperCase();
    $scope.lastName = angular.element($('#lastName')).val().toUpperCase();
    $scope.addressLine1 = angular.element($('#addressLine1')).val().toUpperCase();
    $scope.addressLine2 = angular.element($('#addressLine2')).val().toUpperCase();
    $scope.addressLine3 = angular.element($('#addressLine3')).val().toUpperCase();
    $scope.companyName = angular.element($('#companyName')).val().toUpperCase();
    $scope.phoneNumber = angular.element($('#phoneNumber')).val();
    //$scope.lateArrival = angular.element($('#lateArrival')).val();
    $scope.cardType = angular.element($('#cardType')).val();
    $scope.cardNumber = angular.element($('#cardNumber')).val();
    $scope.expiryMonth = $scope.expirymonth.val;//angular.element($('#expiryMonth')).val();
    console.log("Expirymonth"+$scope.expirymonth.val);
    $scope.expiryYear = $scope.expiryyear.val; //angular.element($('#expiryYear')).val();
    $scope.comments = angular.element($('#comments')).val().toUpperCase();
    
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
  "lateArrivalFlag": $scope.lateArrival,
  "expiryDate": $scope.expiryMonth +"/"+ $scope.expiryYear,
  
 "room" : {
    "roomNo": $scope.roomNumber,
    "smokeFlag": $scope.smokingFlag == "Yes" ? true:false,
    "roomType": $scope.roomType,
    "rateCode": $scope.rateCode,
    "roomDescription": $scope.roomDesc,
    "rate": parseInt($scope.roomRate)
  }
};


    console.log("-----> "+JSON.stringify(reservationDetails) + '*******');
    
    HRS.saveReservations(reservationDetails).then(function(data){
       

     if(data.status == 200)    
     {
        angular.element('#registerationError').css('display', 'none');
        var reservationId = data.data.reservationId;

         console.log("Detail Data  "  + JSON.stringify(data.data));
        $location.path('/search/view/'+reservationId + "/fromadd");
         
     } else 
     {
  if(data.data === null || data.data===undefined){
     angular.element('#registerationError').val("Unknown Error")
  }
  else{
        angular.element('#registerationError').val(data.data.errormessage);
 }
        angular.element('#registerationError').css('display', 'block');



     }
        
    });/*.catch(function(data){
            angular.element('#errorMsg').css('display', 'block');
           $scope.registrationError = JSON.stringify(data);
    });*/
    
    // dont use this. Use $location for changing the view.
    //window.location.href="http://localhost:9000/#/view";
    //$location.path('/view');
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

