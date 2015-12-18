'use strict';

/**
 * @ngdoc function
 * @name appModernizationApp.controller:ModifyCtrl
 * @description
 * # ModifyCtrl
 * Controller of the appModernizationApp
 */
angular.module('appModernizationApp')
  .controller('ModifyCtrl', ['$scope','$http','HRS','$location','breadcrumbs','$routeParams',function ($scope,$http,HRS,$location,breadcrumbs,$routeParams) {
      
      $("input[type=text]").keyup(function(){ 
        $(this).val( $(this).val().toUpperCase() ); 
      }); 

      $("textarea").keyup(function(){ 
        $(this).val( $(this).val().toUpperCase() ); 
      }); 

      $scope.breadcrumbs = breadcrumbs; 

      $scope.roomtype = [{roomtype: 'AS-ANNIVERSARY SUITE', val: 'AS'},
      {roomtype: 'BD-BUDGET DOUBLE', val: 'BD'},
      {roomtype: 'BS-BUDGET SINGLE', val: 'BS'},
      {roomtype: 'DB-TWO DOUBLE BEDS', val: 'DB'},
      {roomtype: 'KI-SINGLE KING BED', val: 'KI'},
      {roomtype: 'MA-MID SIZE SUITE', val: 'MA'},
      {roomtype: 'PS-PRESIDENTIAL SUITE', val: 'PS'},
      {roomtype: 'QU-SINGLE QUEEN BED', val: 'QU'},
      {roomtype: 'SB-EDDY BARCLAY SUITE', val: 'SB'},
      {roomtype: 'SM-BUDGET SMALL', val: 'SM'},      
      {roomtype: 'SO-ORIENTAL SUITE', val: 'SO'},
      {roomtype: 'SS-SWIMINGPOOL SUITE', val: 'SS'},
      {roomtype: 'ST-DONALD TRUMP SUITE', val: 'ST'},
      {roomtype: 'S1-ONE BED SUITE', val: 'S1'},
      {roomtype: 'S2-TWO BED SUITE', val: 'S2'},
      {roomtype: 'S3-THREE BED SUITE', val: 'S3'},
      {roomtype: 'S4-FOUR BED SUITE', val: 'S4'},
      {roomtype: 'S5-FIVE BED SUITE', val: 'S5'},
      {roomtype: 'S6-SIX BED SUITE', val: 'S6'},
      {roomtype: 'S7-SEVEN BED SUITE', val: 'S7'},
      {roomtype: 'S8-EIGHT BED SUITE', val: 'S8'},
      {roomtype: 'TW-TWO TWIN BEDS', val: 'TW'},
      {roomtype: 'WS-WEDDING SUITE', val: 'WS'}]; 

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


      var reservedData =[ ]; 
      $scope.reservationId = $routeParams.param1; 

      HRS.getRegisteredData($scope.reservationId).then(function(data){ 
          reservedData = data; 
          console.log(JSON.stringify(reservedData)); 

          var arrivalDateStr = reservedData.arrivalDate + ""; 
          var departureDateStr = reservedData.departureDate + ""; 

          var arrivalDate = new Date(arrivalDateStr.slice(0, 4),arrivalDateStr.slice(4, 6)-1,arrivalDateStr.slice(6, 8)); 
          var departureDate = new Date(departureDateStr.slice(0, 4),departureDateStr.slice(4, 6)-1,departureDateStr.slice(6, 8)); 

          $scope.arrivalDate = arrivalDate; 
          $scope.departureDate = departureDate; 
          $scope.roomtype.val = reservedData.room.roomType; 
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
          $scope.phoneNumber = parseInt(reservedData.customer.phoneNumber); 
          $scope.cardType = reservedData.cardType; 
          $scope.cardNumber = parseInt(reservedData.cardNumber); 


          var expiryDate = reservedData.expiryDate + ""; 

          $scope.expirymonth.val = expiryDate.slice(0, expiryDate.length-3); 
          $scope.expiryyear.val = expiryDate.slice(expiryDate.length-2, expiryDate.length); 

          $scope.comments1 = reservedData.comments1; 
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
      }; 

        this.selectRoom = function() 
        { 
            $scope.roomNumber = $scope.roomNumberTemp; 
            $scope.rateCode = $scope.rateCodeTemp; 
            $scope.roomRate = $scope.roomRateTemp; 
            $scope.roomDesc = $scope.roomDescTemp; 
            $scope.smokingFlag = $scope.smokingFlagTemp; 
            $scope.lateArrival = $scope.lateArrivalTemp; 
            angular.element('.roomDetails').css('display', 'none'); 
        }; 

        this.searchRooms = function() 
        { 

            HRS.getRoomList(parseInt(angular.element($('#arrivalDate')).val().replace(/-/g,'')),  
                            parseInt(angular.element($('#departureDate')).val().replace(/-/g,'')), 
                            angular.element($('#roomType')).val().slice(0,2)).then(function(data){ 
                              console.log(JSON.stringify(data)); 
             if(data.status == 200)     
     { 
         $scope.roomDetails = data.data; 

         if($scope.roomDetails.length == 0 ){ 
        angular.element('.roomDetails').css('display', 'none'); 
        angular.element('.unavailableroom').val('No Room Available with given Criteria. Please change the search criteria and search again.'); 
        angular.element('.unavailableroom').css('display', 'block'); 
          } 
          else{ 
            angular.element('.unavailableroom').css('display', 'none'); 
            angular.element('.roomDetails').css('display', 'block'); 

          } 

     } else  
     { 
         angular.element('.unavailableroom').val(data.data.errormessage); 
         angular.element('.unavailableroom').css('display', 'block'); 
     } 
            }); 


        }; 


        this.editReservation = function() 
        { 
              console.log("Inside Edit reservation"); 


                $scope.arrivalDate = angular.element($('#arrivalDate')).val().replace(/-/g,''); 
                $scope.departureDate = angular.element($('#departureDate')).val().replace(/-/g,''); 

                var reservationDetails = { 
                "customer": { 
                "firstName": $scope.firstName.toUpperCase(), 
                "lastName": $scope.lastName.toUpperCase(), 
                "middleName": $scope.middleName.toUpperCase(), 
                "addressLine1": $scope.addressLine1.toUpperCase(), 
                "addressLine2": $scope.addressLine2.toUpperCase(), 
                "addressLine3": $scope.addressLine3.toUpperCase(), 
                "phoneNumber": $scope.phoneNumber, 
                "companyName": $scope.companyName.toUpperCase() 
              }, 

              "arrivalDate": parseInt($scope.arrivalDate), 
              "departureDate": parseInt($scope.departureDate), 
              "cardNumber": $scope.cardNumber, 
              "cardType": $scope.cardType, 
              "comments1": $scope.comments1.toUpperCase(), 
              "comments2": "", 
              "lateArrivalFlag": $scope.lateArrivalFlag, 
              "expiryDate": $scope.expirymonth.val +"/"+ $scope.expiryyear.val, 

             "room" : { 
                "roomNo": parseInt(angular.element('#roomNumber').html()), 
                "smokeFlag": $scope.smokingFlag, 
                "roomType": $scope.roomtype.val, 
                "rateCode": $scope.rateCode, 
                "roomDescription": $scope.roomDesc, 
                "rate": parseInt($scope.roomRate) 
              } 
            }; 


            console.log("-----> "+JSON.stringify(reservationDetails) + '*******'); 

            HRS.editReservation(reservationDetails,$scope.reservationId).then( function(data){ 

               if(data.status == 200)     
     { 
        angular.element('#registerationError').css('display', 'none'); 
        var reservationId = data.reservationId; 

         console.log("Detail Data  "  + JSON.stringify(data)); 
        $location.path('/search/view/'+$scope.reservationId + "/fromedit"); 

     } else  
     { 
  if(data.data === null || data.data===undefined){ 
     angular.element('#registerationError').val("Unknown Error"); 
  } 
  else{ 
        angular.element('#registerationError').val(data.data.errormessage); 
 } 
        angular.element('#registerationError').css('display', 'block'); 



     } 

            }); 


      }; 


      
      
  }]);