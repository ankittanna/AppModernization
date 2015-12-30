'use strict';

/**
 * @ngdoc directive
 * @name rfx.directive:rAutogrow
 * @element textarea
 * @function
 *
 * @description
 * Resize textarea automatically to the size of its text content.
 *
 * **Note:** ie<9 needs pollyfill for window.getComputedStyle
 *
 * @example
   <example module="rfx">
     <file name="index.html">
         <textarea ng-model="text" r-autogrow class="input-block-level"></textarea>
         <pre>{{text}}</pre>
     </file>
   </example>
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

        this.validateDetails = function() {
            var currentDate = new Date();
            var isSelectedDateValid = UtilitiesService.isPreviousDay(currentDate, $scope.reservationDetails.departureDate);
            var dateComparison = UtilitiesService.isPreviousDay($scope.reservationDetails.arrivalDate, $scope.reservationDetails.departureDate);
            if($scope.reservationId) {
                 dateComparison = false;
            }
            
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
            } else if(isSelectedDateValid === true || dateComparison === true){
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
            } else
            {
                $scope.registerationErrorMsg = "Details filled are invalid.";
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
    .controller('DeleteCtrl', ['$scope', '$http', 'HRS', '$location', '$routeParams', 'breadcrumbs', 'UtilitiesService',function($scope, $http, HRS, $location, $routeParams, breadcrumbs, UtilitiesService) {

        $scope.breadcrumbs = breadcrumbs;

        $scope.reservationDetails = [];
        var reservedData = [];
        $scope.reservationId = $routeParams.param1;

        HRS.getRegisteredData($scope.reservationId).then(function(data) {
            reservedData = data;
            console.log(JSON.stringify(reservedData));
            reservedData = data;
            reservedData.arrivalDate = UtilitiesService.convertToFormat(reservedData.arrivalDate);
            reservedData.departureDate = UtilitiesService.convertToFormat(reservedData.departureDate);
            $scope.reservationDetails = reservedData;

        }).catch(function(response) {
            // TODO: Is this really required?
            // angular.element('#roomTable').css('display', 'none'); 
            console.log(JSON.stringify(response));
        });

        this.deleteReservation = function() {
            HRS.cancleReservation($scope.reservationId).then(function(data) {
                var reservationId = data.reservationId;
                console.log("Detail Data  " + JSON.stringify(data));
                $location.path('/search');     
            }).catch(function(response) {
                //this.registrationErrorMessage = response.data.errormessage;
            });
        }

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
    
    Date.prototype.notPreviousDay = function(d) {
      return !(d.getFullYear() >= this.getFullYear()
        && d.getDate() >= this.getDate()
        && d.getMonth() >= this.getMonth());
    };
    
    return {
        convertToFormat: convertToFormat,
        convertToRaw: convertToRaw,
        formatMMDDYYYY:formatMMDDYYYY,
        keyUpEvent: keyUpEvent,
        isPreviousDay: isPreviousDay
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
    
    function isPreviousDay(todaysDate, selectedDate)
    {
        // Usage: todaysDate.notPreviousDay(selectedDate)
        var isSelectedDateValid = todaysDate.notPreviousDay(selectedDate);
        
        return isSelectedDateValid;
    }
}