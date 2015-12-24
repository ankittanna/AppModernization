'use strict';

/**
 * @ngdoc overview
 * @name appModernizationApp
 * @description
 * # appModernizationApp
 *
 * Main module of the application.
 */
angular
    .module('appModernizationApp', ['ng-breadcrumbs',
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch'
    ]).config(['$routeProvider', function($routeProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                label: ''
            })
            .when('/about', {
                controller: 'AboutCtrl',
                templateUrl: 'views/about.html',
                label: 'About'
            })
            .when('/search', {
                controller: 'SearchCtrl',
                controllerAs: 'search',
                templateUrl: 'views/search.html',
                label: 'Home'
            })
            .when('/search/details', {
                controller: 'DetailsCtrl',
                controllerAs: 'details',
                templateUrl: 'views/details.html',
                label: 'New Reservation'
            })
            .when('/search/details/:param1', {
                controller: 'DetailsCtrl',
                controllerAs: 'details',
                templateUrl: 'views/details.html',
                label: 'Edit Reservation'
            })
            //.when('/search/view/:param1', { controller: 'ViewCtrl', templateUrl:'views/view.html'})
            .when('/search/view/:param1/:param2', {
                controller: 'ViewCtrl',
                controllerAs: 'view',
                templateUrl: 'views/view.html',
                label: 'View Reservation'
            })
            .when('/search/delete', {
                controller: 'DeleteCtrl',
                controllerAs: 'delete',
                templateUrl: 'views/delete.html',
                label: ''
            })
            .when('/search/delete/:param1', {
                controller: 'DeleteCtrl',
                controllerAs: 'delete',
                templateUrl: 'views/delete.html',
                label: 'Cancel Reservation'
            })
            .when('/search/edit', {
                controller: 'ModifyCtrl',
                controllerAs: 'edit',
                templateUrl: 'views/edit.html',
                label: ''
            })
            .when('/search/edit/:param1', {
                controller: 'ModifyCtrl',
                controllerAs: 'edit',
                templateUrl: 'views/edit.html',
                label: 'Edit Reservation'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);

'use strict';

/**
 * @ngdoc function
 * @name appModernizationApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appModernizationApp
 */
angular.module('appModernizationApp')
    .controller('MainCtrl', ['$scope', '$http', 'HRS', '$location', 'breadcrumbs', function($scope, $http, HRS, $location, breadcrumbs) {
        $scope.breadcrumbs = breadcrumbs;
        $scope.displayProperties.isUserInfoVisible = false;
        $scope.backendSystems = ["LegStar"];

    }]);

'use strict';

/**
 * @ngdoc function
 * @name appModernizationApp.controller:DetailsCtrl
 * @description
 * # DetailsCtrl
 * Controller of the appModernizationApp
 */
angular.module('appModernizationApp')
    .controller('DetailsCtrl', ['$scope', '$http', 'HRS', '$location', '$routeParams','breadcrumbs', 'UtilitiesService', function($scope, $http, HRS, $location, $routeParams, breadcrumbs, UtilitiesService) {
        $scope.breadcrumbs = breadcrumbs;
        $scope.reservationDetails = {};
        $scope.registerationErrorMsg = "";
        $scope.roomSearchErrorMsg = "";
        $scope.roomDetails = [];

        if (breadcrumbs.breadcrumbs.length >= 3) {
            breadcrumbs.breadcrumbs.splice(1, 1);
        }

        $http.get('../../data/dropdown-data.json').success(function(data) {
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

        if ($scope.reservationId != undefined) {
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
            $scope.roomSearchErrorMsg = "";
            var arrivalDateFormatted = UtilitiesService.formatMMDDYYYY($scope.reservationDetails.arrivalDate);
            var departureDateFormatted = UtilitiesService.formatMMDDYYYY($scope.reservationDetails.departureDate);
            var roomTypeFormatted = $scope.reservationDetails.room.roomType;
            HRS.getRoomList(arrivalDateFormatted, departureDateFormatted, roomTypeFormatted).then(function(data) { 
                $scope.roomDetails = data;          
                if ($scope.roomDetails.length == 0) {    
                    angular.element('.roomDetails').css('display', 'none');    
                    $scope.roomSearchErrorMsg = "No Room Available with given Criteria. Please change the search criteria and search again.";
                }     
                else {      
                    angular.element('.roomDetails').css('display', 'block');     
                }

            }).catch(function(response) {
                $scope.roomSearchErrorMsg = response.data.errormessage;
            });
        };

        this.storeDetails = function() {

            if (this.validateDetails()) {
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
            }
        };
    }]);

'use strict';

/**
 * @ngdoc function
 * @name appModernizationApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the appModernizationApp
 */
angular.module('appModernizationApp')
    .controller('SearchCtrl', ['$scope', '$http', 'HRS', '$location', 'breadcrumbs', 'UtilitiesService', function($scope, $http, HRS, $location, breadcrumbs, UtilitiesService) {
        $scope.breadcrumbs = breadcrumbs;
        $scope.responseMsg = "";
        $scope.reservations = [];
        $scope.searchValidated = true;
        this.searchLastName = '';
        this.searchArrivalDate = '';
        
        $scope.isRoomTableVisible = false;
        
        $scope.displayProperties.isUserInfoVisible = true;

        this.utilities = UtilitiesService;
        
        /*this.getFormattedDate = function(rawDate) {
            var formatDate = UtilitiesService.convertToFormat(rawDate);
            return formatDate;
        };*/

        this.validateSearchCriteria = function() {
            var lastName = this.searchLastName.trim();
            var todayDate = new Date();
            var selectedDate = new Date(this.searchArrivalDate);

            if (lastName.length === 0) {
                $scope.isRoomTableVisible = false;
                $scope.responseMsg = 'Name cannot be blank';
                return false;
            } else if (selectedDate == 'Invalid Date') {
                $scope.isRoomTableVisible = false;
                $scope.responseMsg = 'Date Cannot be blank.';
                return false;
            }
            return true;
        };

        this.searchReservations = function() {
            this.searchLastName = this.searchLastName.toUpperCase().trim();
            if (this.validateSearchCriteria()) {
                var fullYear = (this.searchArrivalDate).getFullYear();
                var fullMonth = ("00" + (this.searchArrivalDate.getMonth() + 1)).slice(-2);
                var fullDate = ("00" + this.searchArrivalDate.getDate()).slice(-2);
                var arrivalDate = "" + fullYear + "" + fullMonth + "" + fullDate + "";

                HRS.searchReservations(this.searchLastName, arrivalDate).then(function(data) {
                    $scope.reservations = data;
                    $scope.responseMsg = "";
                    $scope.isRoomTableVisible = true;
                    if ($scope.reservations.length === 0) {
                        $scope.isRoomTableVisible = false;
                        $scope.responseMsg = "No reseravation found matching criteria.";
                    }
                }).catch(function(response) {
                    $scope.isRoomTableVisible = false;
                    $scope.responseMsg = response.data.errormessage;
                });

            }
        };
    }]);

'use strict';

/**
 * @ngdoc function
 * @name appModernizationApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the appModernizationApp
 */
angular.module('appModernizationApp')
    .controller('AboutCtrl', function() {

        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    });

'use strict';

/**
 * @ngdoc function
 * @name appModernizationApp.controller:ViewCtrl
 * @description
 * # ViewCtrl
 * Controller of the appModernizationApp
 */
angular.module('appModernizationApp')
    .controller('ViewCtrl', ['$scope', '$http', 'HRS', '$location', '$routeParams', 'breadcrumbs', 'UtilitiesService', function($scope, $http, HRS, $location, $routeParams, breadcrumbs, UtilitiesService) {

        if (breadcrumbs.breadcrumbs.length >= 3) {
            breadcrumbs.breadcrumbs.splice(1, 1);
        }

        $scope.breadcrumbs = breadcrumbs;
        $scope.reservationDetails = [];
        $scope.responseMsg = "";
        var reservedData = {};

        $scope.reservationId = $routeParams.param1;
        if ($routeParams.param2 != undefined) {
            var param2 = $routeParams.param2;

            if (param2 == 'fromsearch') {
                $scope.responseMsg = "";
                HRS.getRegisteredData($scope.reservationId).then(function(data) {
                    reservedData = data;
                    reservedData.arrivalDate = UtilitiesService.convertToFormat(reservedData.arrivalDate);
                    reservedData.departureDate = UtilitiesService.convertToFormat(reservedData.departureDate);
                    $scope.reservationDetails = reservedData;

                })
            } else {
                if (param2 == 'fromadd') {
                    $scope.responseMsg = "Congratulations: Reservation Successfully Done.";
                } else if (param2 == 'fromedit') {
                    $scope.responseMsg = "Reservation Successfully Updated";
                }
                reservedData = HRS.getReservedRoomData();
                reservedData.arrivalDate = UtilitiesService.convertToFormat(reservedData.arrivalDate);
                reservedData.departureDate = UtilitiesService.convertToFormat(reservedData.departureDate);
                $scope.reservationDetails = reservedData;
            }
        }
    }]);

'use strict';

/**
 * @ngdoc function
 * @name appModernizationApp.controller:DeleteCtrl
 * @description
 * # DeleteCtrl
 * Controller of the appModernizationApp
 */
angular.module('appModernizationApp')
    .controller('DeleteCtrl', ['$scope', '$http', 'HRS', '$location', '$routeParams', 'breadcrumbs', function($scope, $http, HRS, $location, $routeParams, breadcrumbs) {

        $scope.breadcrumbs = breadcrumbs;

        var reservedData = [];
        $scope.reservationId = $routeParams.param1;

        HRS.getRegisteredData($scope.reservationId).then(function(data) {
            reservedData = data;
            console.log(JSON.stringify(reservedData));

            $scope.reservationId = reservedData.reservationId;

            var arrival = reservedData.arrivalDate.toString();
            var departure = reservedData.departureDate.toString();
            $scope.arrivalDate = arrival.slice(6, 8) + "/" + arrival.slice(4, 6) + "/" + arrival.slice(0, 4);
            $scope.departureDate = departure.slice(6, 8) + "/" + departure.slice(4, 6) + "/" + departure.slice(0, 4);
            $scope.roomType = reservedData.room.roomType;
            $scope.roomNumber = reservedData.room.roomNo;
            $scope.roomDesc = reservedData.room.roomDescription;
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
        }).catch(function(response) {
            // TODO: Is this really required?
            // angular.element('#roomTable').css('display', 'none'); 
            console.log(JSON.stringify(response));
        });

        this.registrationErrorMessage = '';

        this.deleteReservation = function() {
            console.log("Inside Delte reservation");
            HRS.cancleReservation($scope.reservationId).then(function(data) {
                this.registrationErrorMessage = '';
                
                var reservationId = data.reservationId;
                console.log("Detail Data  " + JSON.stringify(data));
                $location.path('/search');     
            }).catch(function(response) {
                this.registrationErrorMessage = response.data.errormessage;
            });
        }

    }]);

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
      
     /* $("input[type=text]").keyup(function(){ 
        $(this).val( $(this).val().toString().toUpperCase() ); 
      }); 

      $("textarea").keyup(function(){ 
        $(this).val( $(this).val().toString().toUpperCase() ); 
      }); */
      
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
      
      this.validateDetails = function()
      {
          if($scope.arrivalDate === undefined || $scope.departureDate === undefined || $scope.firstName ===undefined || $scope.lastName ===undefined
            || $scope.addressLine1 === undefined || $scope.addressLine2 === undefined || $scope.addressLine3 === undefined || $scope.phoneNumber === undefined || $scope.companyName === undefined
            || $scope.cardType === undefined)
          {
            angular.element('#registerationError').html("Required Field is Blank");
            return false;
          }
          else if($scope.expirymonth.val === undefined || $scope.expiryyear.val === undefined )
          {
              angular.element('#registerationError').html("Please select value from dropdown");
          }
          else if($scope.phoneNumber.length < 10)
          {
            angular.element('#registerationError').html("PhoneNumber should have atleast 10 Digits");
            return false;
          } else 
          {
            return true;
          }
      };

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
            
            angular.element('.roomDetails').css('display', 'none');
            angular.element('.unavailableroom').css('display', 'none');
            var arrivalDateFormatted = parseInt(angular.element($('#arrivalDate')).val().replace(/-/g,''));
            var departureDateFormatted = parseInt(angular.element($('#departureDate')).val().replace(/-/g,''));
            var roomTypeFormatted = $scope.roomtype.val;

            HRS.getRoomList(arrivalDateFormatted, departureDateFormatted, roomTypeFormatted).then(function(data){ 
                              console.log(JSON.stringify(data)); 
          
             $scope.roomDetails = data; 

             if($scope.roomDetails.length == 0 ){ 
                angular.element('.roomDetails').css('display', 'none'); 
                angular.element('.unavailableroom label').html('No Room Available with given Criteria. Please change the search criteria and search again.'); 
                angular.element('.unavailableroom').css('display', 'block'); 
              } 
              else{ 
                angular.element('.unavailableroom').css('display', 'none'); 
                angular.element('.roomDetails').css('display', 'block'); 
              } 

         
            }).catch(function(response) {
             angular.element('.unavailableroom label').html(response.data.errormessage);
             angular.element('.unavailableroom').css('display', 'block');
          }); 


        }; 


        this.editReservation = function() 
        { 
              console.log("Inside Edit reservation"); 


                $scope.arrivalDate = angular.element($('#arrivalDate')).val().replace(/-/g,''); 
                $scope.departureDate = angular.element($('#departureDate')).val().replace(/-/g,''); 
                 if(this.validateDetails())
                {
                var reservationDetails = { 
                "customer": { 
                "firstName": $scope.firstName.toString().toUpperCase(), 
                "lastName": $scope.lastName.toString().toUpperCase(), 
                "middleName": $scope.middleName.toString().toUpperCase(), 
                "addressLine1": $scope.addressLine1.toString().toUpperCase(), 
                "addressLine2": $scope.addressLine2.toString().toUpperCase(), 
                "addressLine3": $scope.addressLine3.toString().toUpperCase(), 
                "phoneNumber": $scope.phoneNumber, 
                "companyName": $scope.companyName.toString().toUpperCase() 
              }, 

              "arrivalDate": parseInt($scope.arrivalDate), 
              "departureDate": parseInt($scope.departureDate), 
              "cardNumber": $scope.cardNumber, 
              "cardType": $scope.cardType, 
              "comments1": $scope.comments1.toString().toUpperCase(), 
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

                    angular.element('#registerationError').css('display', 'none'); 
                    var reservationId = data.reservationId; 

                     console.log("Detail Data  "  + JSON.stringify(data)); 
                    $location.path('/search/view/'+$scope.reservationId + "/fromedit"); 

             
            }).catch(function(response) {
                 angular.element('#registerationError').html(response.data.errorMessage); 
                 angular.element('#registerationError').css('display', 'block'); 
              }); 
        }
      };      
  }]);
'use strict';

/**
 * @ngdoc function
 * @name appModernizationApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the appModernizationApp
 */
angular.module('appModernizationApp')
    .controller('IndexCtrl', ['$scope', '$http', 'HRS', '$location', 'breadcrumbs', function($scope, $http, HRS, $location, breadcrumbs) {

        $scope.uesrName = "John Doe";
        $scope.breadcrumbs = breadcrumbs;
        
        $scope.displayProperties = {};
        $scope.displayProperties.isUserInfoVisible = false;
    }]);

// Tab Switch Logic
function switchTabStyle(tab)
{
    var currentActiveTab = tab.id;
    
    if(tab.id === 'bookTab')
    {
        document.getElementById(currentActiveTab).className = 'active';
        document.getElementById('searchTab').className = '';
    } else if(tab.id === 'searchTab')
    {
        document.getElementById(currentActiveTab).className = 'active';
        document.getElementById('bookTab').className = '';
    }
    
}

// Date Not Previous Day
Date.prototype.notPreviousDay = function(d) {
  return !(d.getFullYear() >= this.getFullYear()
    && d.getDate() >= this.getDate()
    && d.getMonth() >= this.getMonth());
};
// Factory HRS - Collection of all services
angular.module('appModernizationApp')
    .factory('HRS', hotelReservationServices);

hotelReservationServices.$inject = ['$http'];

function hotelReservationServices($http) {

    var baseUrl = 'http://172.31.28.248:9001/am/v1';
    var reservedData = "";
    // Object Map of functions
    return {
        searchReservations: searchReservations,
        saveReservations: saveReservations,
        getRoomList: getRoomList,
        getReservedRoomData: getReservedRoomData,
        cancleReservation: cancleReservation,
        getRegisteredData: getRegisteredData,
        editReservation: editReservation
    };

    function searchReservations(lastName, arrivalDate) {
        var url = baseUrl + '/reservation?lastName=' + lastName + '&arrivalDate=' + arrivalDate;
        return $http.get(url).then(function(response) {
            return response.data;
        });
    }

    function getRoomList(arrivalDate, departureDate, roomType) {
        var url = baseUrl + '/rooms?arrivalDate=' + arrivalDate + '&departureDate=' + departureDate + '&roomType=' + roomType;
        return $http.get(url).then(function(response) {
            return response.data;
        });
    }

    function saveReservations(reservationDetails) {
        return $http({
            method: 'POST',
            url: baseUrl + '/reservation',
            headers: {
                'Content-Type': 'application/json'
            },
            data: reservationDetails
        }).then(function(response) {
            reservedData = response.data;
            return response.data;
        });
    }
    function getRegisteredData(reservationId) {
        var url = baseUrl + '/reservation/' + reservationId;
        return $http.get(url).then(function(response) {
            return response.data;
        });
    }

    function cancleReservation(reservationId) {
        var url = baseUrl + '/reservation/' + reservationId;
        return $http.delete(url).then(function(response) {
            return response.data;
        });
    }

    function editReservation(reservationDetails, reservationId) {
        return $http({
            method: 'PUT',
            url: baseUrl + '/reservation/' + reservationId,
            headers: {
                'Content-Type': 'application/json'
            },
            data: reservationDetails
        }).then(function(response) {
            reservedData = response.data;
            return response.data;
        });
    }

    function getReservedRoomData() {
        return reservedData;
    }
}

// Factory HRS - Collection of all services
angular.module('appModernizationApp')
    .factory('UtilitiesService', utilitiesService);

// utilitiesService.$inject = ['$http'];

function utilitiesService(){

    return {
        convertToFormat: convertToFormat,
        convertToRaw: convertToRaw,
        formatMMDDYYYY:formatMMDDYYYY,
        keyUpEvent: keyUpEvent
    };  
    
    function convertToFormat(rawDate)
    {
        var formattedDate;
        
        formattedDate = rawDate.toString();
        formattedDate = formattedDate.slice(6,8)+"/"+formattedDate.slice(4,6)+"/"+formattedDate.slice(0,4);
        
        return formattedDate;
    }
    
    function convertToRaw(formattedDate)
    {
        var rawDate;
        
        rawDate = formattedDate.toString();
        rawDate = rawDate.replace(/\//g, '');
        
        return rawDate;
    }

    function formatMMDDYYYY(date){
        return parseInt( date.getFullYear()+ "" + (date.getMonth() + 1) + 
        "" +  date.getDate());
    }
    
    function keyUpEvent(event)
    {
        event.currentTarget.value = event.currentTarget.value.toUpperCase();
    }
}