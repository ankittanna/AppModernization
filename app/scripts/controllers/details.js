'use strict';

/**
 * @ngdoc function
 * @name appModernizationApp.controller:DetailsCtrl
 * @description
 * # DetailsCtrl
 * Controller of the appModernizationApp
 */
angular.module('appModernizationApp')
    .controller('DetailsCtrl', ['$scope', '$http', 'HRS', '$location', 'breadcrumbs', 'DateService', function($scope, $http, HRS, $location, breadcrumbs, DateService) {
        $scope.breadcrumbs = breadcrumbs;
        $scope.reservationDetails = {};
        $scope.registerationErrorMsg = "";
        $scope.roomDetails = [];

        $http.get('../../data/dropdown-data.json').success(function(data) {
            console.log("Data:" + JSON.stringify(data.dropdownData));
            $scope.roomTypes = data.dropdownData.roomtype;
            $scope.expirymonth = data.dropdownData.expirymonth;
            $scope.expiryyear = data.dropdownData.expiryyear;
            $scope.cardtype = data.dropdownData.cardtype;
        });

        $("input[type=text]").keyup(function() {
            $(this).val($(this).val().toUpperCase());
        });

        $("textarea").keyup(function() {
            $(this).val($(this).val().toUpperCase());
        });
        $scope.lateArrival = "false";
        $('#lateArrival').click(function() {
            if ($(this).prop("checked") == true) {
                $scope.lateArrival = "true";
            } else if ($(this).prop("checked") == false) {
                $scope.lateArrival = "false";
            }
            console.log($scope.lateArrival);
        });
        
        this.validateDetails = function() {
            if ($scope.reservationDetails.arrivalDate === '' || 
                $scope.reservationDetails.departureDate === '' || 
                $scope.reservationDetails.customer.firstName === '' || 
                $scope.reservationDetails.customer.lastName === '' || 
                $scope.reservationDetails.customer.addressLine1 === '' || 
                $scope.reservationDetails.customer.addressLine2 === '' || 
                $scope.reservationDetails.customer.addressLine3 === '' || 
                $scope.reservationDetails.customer.phoneNumber === undefined || 
                $scope.reservationDetails.customer.companyName === '' || 
                $scope.reservationDetails.cardNumber === undefined) {
                $scope.registerationErrorMsg = "Required Field is Blank";
                return false;
            } else if (
              $scope.expirymonth.val === undefined || 
              $scope.expiryyear.val === undefined || 
              $scope.reservationDetails.cardType === undefined) {
              $scope.registerationErrorMsg = "Please select value from dropdown";
               return false;
            } else if (
              $scope.reservationDetails.customer.phoneNumber.length < 10) {
                $scope.registerationErrorMsg = "PhoneNumber should have atleast 10 Digits";
                return false;
            } else {
                return true;
            }
        };

        this.fillRoomDetails = function(roomno, rateCode, roomRate, roomDesc, smokingFlag) {
            console.log(" Data :" + roomno + rateCode + roomRate + roomDesc + smokingFlag);
            $scope.reservationDetails.room.roomNo = roomno;
            $scope.reservationDetails.room.rateCode = rateCode + " ";
            $scope.reservationDetails.room.rate = roomRate;
            $scope.reservationDetails.room.roomDescription = roomDesc;
            $scope.reservationDetails.room.smokeFlag = smokingFlag;
        }

        this.selectRoom = function() {
            angular.element('.roomDetails').css('display', 'none');
        }

        this.searchRooms = function() {
            angular.element('.roomDetails').css('display', 'none');
            angular.element('.unavailableroom').css('display', 'none');
            var arrivalDateFormatted = parseInt(angular.element($('#arrivalDate')).val().replace(/-/g, ''));
            var departureDateFormatted = parseInt(angular.element($('#departureDate')).val().replace(/-/g, ''));
            var roomTypeFormatted = $scope.reservationDetails.room.roomType;
            HRS.getRoomList(arrivalDateFormatted, departureDateFormatted, roomTypeFormatted).then(function(data) { 
                $scope.roomDetails = data;          
                if ($scope.roomDetails.length == 0) {    
                    angular.element('.roomDetails').css('display', 'none');    
                    angular.element('.unavailableroom label').html('No Room Available with given Criteria. Please change the search criteria and search again.');    
                    angular.element('.unavailableroom').css('display', 'block');     
                }     
                else {      
                    angular.element('.unavailableroom').css('display', 'none');      
                    angular.element('.roomDetails').css('display', 'block');     
                }

            }).catch(function(response) {
                angular.element('.unavailableroom label').html(response.data.errormessage);
                angular.element('.unavailableroom').css('display', 'block');
            });
        };

        this.storeDetails = function() {

            if (this.validateDetails()) {
                $scope.registerationErrorMsg = "";

                var reservationDetailsInp = $scope.reservationDetails;
                reservationDetailsInp.arrivalDate = DateService.formatMMDDYYYY(reservationDetailsInp.arrivalDate);
                reservationDetailsInp.departureDate = DateService.formatMMDDYYYY(reservationDetailsInp.departureDate);


                $scope.expiryMonth = $scope.expirymonth.val;
                $scope.expiryYear = $scope.expiryyear.val;
                reservationDetailsInp.expiryDate = $scope.expiryMonth + "/" + $scope.expiryYear;

                reservationDetailsInp.customer.phoneNumber = reservationDetailsInp.customer.phoneNumber.toString();
                reservationDetailsInp.cardNumber = reservationDetailsInp.cardNumber.toString();

                console.log("-----> " + JSON.stringify(reservationDetailsInp) + '*******');
                HRS.saveReservations(reservationDetailsInp).then(function(data) {
                    var reservationId = data.reservationId;
                    console.log("Detail Data  " + JSON.stringify(data));
                    $location.path('/search/view/' + reservationId + "/fromadd");
                }).catch(function(response) {
                    $scope.registerationErrorMsg = response.data.errorMessage;
                });
            }
        };
    }]);
