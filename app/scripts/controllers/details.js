'use strict';

/**
 * @ngdoc function
 * @name appModernizationApp.controller:DetailsCtrl
 * @description
 * # DetailsCtrl
 * Controller of the appModernizationApp
 */
angular.module('appModernizationApp')
    .controller('DetailsCtrl', ['$scope', '$http', 'HRS', '$location', '$routeParams','breadcrumbs', 'UtilitiesService',function($scope, $http, HRS, $location, $routeParams, breadcrumbs, UtilitiesService) {
        $scope.breadcrumbs = breadcrumbs;
        $scope.reservationDetails = {};
        $scope.registerationErrorMsg = "";
        $scope.roomSearchErrorMsg = "";
        $scope.roomDetails = [];
        $scope.submitted = false;

        //Date Picker Options
        $scope.minDate = $scope.reservationId ? null : new Date();
        $scope.open = function($event,opened) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope[opened] = true;
        };

        
        $scope.isRoomDetailsVisible = false;
        
        
        if (breadcrumbs.breadcrumbs.length >= 3) {
            breadcrumbs.breadcrumbs.splice(1, 1);
        }

        $http.get('data/dropdown-data.json').success(function(data) {
            console.log("Data:" + JSON.stringify(data.dropdownData));
            $scope.roomTypes = data.dropdownData.roomtype;
            $scope.expirymonth = data.dropdownData.expirymonth;
            $scope.expiryyear = data.dropdownData.expiryyear;
            $scope.cardtype = data.dropdownData.cardtype;
        });
        
        this.utilities = UtilitiesService;
        
        $scope.lateArrival = "false";
        $('#lateArrival').click(function() {
            if ($(this).prop("checked") == true) {
                $scope.lateArrival = "true";
            } else if ($(this).prop("checked") == false) {
                $scope.lateArrival = "false";
            }
            console.log($scope.lateArrival);
        });


        $scope.reservationId = $routeParams.param1;

        if ($scope.reservationId) {
            HRS.getRegisteredData($scope.reservationId).then(function(data) {
                var reservedData = data;

                var arrivalDateStr = reservedData.arrivalDate + "";
                var departureDateStr = reservedData.departureDate + "";
                reservedData.arrivalDate = new Date(arrivalDateStr.slice(0, 4), arrivalDateStr.slice(4, 6) - 1, arrivalDateStr.slice(6, 8));
                reservedData.departureDate = new Date(departureDateStr.slice(0, 4), departureDateStr.slice(4, 6) - 1, departureDateStr.slice(6, 8));               
                var expiryDate = reservedData.expiryDate + "";
                $scope.expirymonth.val = expiryDate.slice(0, expiryDate.length - 3);
                $scope.expiryyear.val = expiryDate.slice(expiryDate.length - 2, expiryDate.length);

                $scope.reservationDetails = reservedData;
            });
        }

        // this.validateDetails = function() {
        //     var currentDate = new Date();
        //     var isSelectedDateValid = UtilitiesService.isPreviousDay(currentDate, $scope.reservationDetails.departureDate);
        //     var dateComparison = UtilitiesService.isPreviousDay($scope.reservationDetails.arrivalDate, $scope.reservationDetails.departureDate);
        //     if($scope.reservationId) {
        //          dateComparison = false;
        //     }
            
        //     if ($scope.reservationDetails.arrivalDate === '' ||
        //         $scope.reservationDetails.departureDate === '' ||
        //         $scope.reservationDetails.customer.firstName === '' ||
        //         $scope.reservationDetails.customer.lastName === '' ||
        //         $scope.reservationDetails.customer.addressLine1 === '' ||
        //         $scope.reservationDetails.customer.addressLine2 === '' ||
        //         $scope.reservationDetails.customer.addressLine3 === '' ||
        //         $scope.reservationDetails.customer.phoneNumber === undefined ||
        //         $scope.reservationDetails.customer.companyName === '' ||
        //         $scope.reservationDetails.cardNumber === undefined) {
        //         $scope.registerationErrorMsg = "Required Field is Blank";
        //         return false;
        //     } else if (
        //         $scope.expirymonth.val === undefined ||
        //         $scope.expiryyear.val === undefined ||
        //         $scope.reservationDetails.cardType === undefined) {
        //         $scope.registerationErrorMsg = "Please select value from dropdown";
        //         return false;
        //     } else if (
        //         $scope.reservationDetails.customer.phoneNumber.length < 10) {
        //         $scope.registerationErrorMsg = "PhoneNumber should have atleast 10 Digits";
        //         return false;
        //     } else if(isSelectedDateValid === true || dateComparison === true){
        //         return false;
        //     } else {
        //         return true;
        //     }
        // };

        this.fillRoomDetails = function(roomno, rateCode, roomRate, roomDesc, smokingFlag) {
            console.log(" Data :" + roomno + rateCode + roomRate + roomDesc + smokingFlag);
            $scope.reservationDetails.room.roomNo = roomno;
            $scope.reservationDetails.room.rateCode = rateCode + " ";
            $scope.reservationDetails.room.rate = roomRate;
            $scope.reservationDetails.room.roomDescription = roomDesc;
            $scope.reservationDetails.room.smokeFlag = smokingFlag;
        }

        this.selectRoom = function() {
            // angular.element('.roomDetails').css('display', 'none');
            $scope.isRoomDetailsVisible = false;
        }

        this.searchRooms = function() {
            // angular.element('.roomDetails').css('display', 'none');
            $scope.isRoomDetailsVisible = false;
            $scope.roomSearchErrorMsg = "";
            
            var currentDate = new Date();
            var isSelectedDateValid = UtilitiesService.isPreviousDay(currentDate, $scope.reservationDetails.departureDate);
            var dateComparison = UtilitiesService.isPreviousDay($scope.reservationDetails.arrivalDate, $scope.reservationDetails.departureDate);
            
            if(isSelectedDateValid === false && dateComparison === false)
            {
                var arrivalDateFormatted = UtilitiesService.formatMMDDYYYY($scope.reservationDetails.arrivalDate);
                var departureDateFormatted = UtilitiesService.formatMMDDYYYY($scope.reservationDetails.departureDate);
                var roomTypeFormatted = $scope.reservationDetails.room.roomType;
                HRS.getRoomList(arrivalDateFormatted, departureDateFormatted, roomTypeFormatted).then(function(data) { 
                    $scope.roomDetails = data;          
                    if ($scope.roomDetails.length == 0) {    
                        // angular.element('.roomDetails').css('display', 'none');    
                        $scope.isRoomDetailsVisible = false;
                        $scope.roomSearchErrorMsg = "No Room Available with given Criteria. Please change the search criteria and search again.";
                    }     
                    else {      
                        // angular.element('.roomDetails').css('display', 'block');     
                        $scope.isRoomDetailsVisible = true;
                    }

                }).catch(function(response) {
                    $scope.roomSearchErrorMsg = response.data.errormessage;
                });       
            } else
            {   
                if(isSelectedDateValid === true)
                {
                    $scope.roomSearchErrorMsg = "Departure date cannot be less than today's date.";
                } else if(dateComparison === true)
                {
                    $scope.roomSearchErrorMsg = "Departure date cannot be less than arrival date.";
                }
            }
        };

        this.storeDetails = function(isValid) {
            $scope.submitted = true;

            if (isValid) {
                $scope.registerationErrorMsg = "";

                var reservationDetailsInp = {};
                angular.copy($scope.reservationDetails, reservationDetailsInp);
                reservationDetailsInp.arrivalDate = UtilitiesService.formatMMDDYYYY(reservationDetailsInp.arrivalDate);
                reservationDetailsInp.departureDate = UtilitiesService.formatMMDDYYYY(reservationDetailsInp.departureDate);


                $scope.expiryMonth = $scope.expirymonth.val;
                $scope.expiryYear = $scope.expiryyear.val;
                reservationDetailsInp.expiryDate = $scope.expiryMonth + "/" + $scope.expiryYear;

               

                console.log("-----> " + JSON.stringify(reservationDetailsInp) + '*******');
                if ($scope.reservationId == undefined) {
                     reservationDetailsInp.customer.phoneNumber = reservationDetailsInp.customer.phoneNumber.toString();
                     reservationDetailsInp.cardNumber = reservationDetailsInp.cardNumber.toString();
                    HRS.saveReservations(reservationDetailsInp).then(function(data) {
                        var reservationId = data.reservationId;
                        console.log("Detail Data  " + JSON.stringify(data));
                        $location.path('/search/view/' + reservationId + "/fromadd");
                    }).catch(function(response) {
                        $scope.registerationErrorMsg = response.data.errorMessage;
                    });
                } else {
                    HRS.editReservation(reservationDetailsInp, $scope.reservationId).then(function(data) {
                        var reservationId = data.reservationId;
                        console.log("Detail Data  " + JSON.stringify(data));
                        $location.path('/search/view/' + reservationId + "/fromedit");
                    }).catch(function(response) {
                        $scope.registerationErrorMsg = response.data.errorMessage;
                    });
                }
            } else
            {
                $scope.registerationErrorMsg = "Please fill all required details correctly.";
            }
        };
    }]);
