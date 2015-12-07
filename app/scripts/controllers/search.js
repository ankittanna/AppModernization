'use strict';

/**
 * @ngdoc function
 * @name appModernizationApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appModernizationApp
 */
angular.module('appModernizationApp')
  .controller('SearchCtrl', ['$scope', '$http', function ($scope, $http) {  
    
    angular.element('#appNavBar').css('display', 'block');
      

  	$scope.reservations = [
        {reservationNumber: '1',  firstName: 'Vinod', lastName: 'Khandelwal', arrivalDate: '01/12/2015' ,departureDate:'05/12/2015'},
        {reservationNumber: '2',  firstName: 'Vinod1', lastName: 'Khandelwal', arrivalDate: '02/12/2015' ,departureDate:'06/12/2015'},
        {reservationNumber: '3',  firstName: 'Vinod2', lastName: 'Khandelwal', arrivalDate: '03/12/2015', departureDate:'07/12/2015'},
        {reservationNumber: '4',  firstName: 'Vinod3', lastName: 'Khandelwal', arrivalDate: '04/12/2015', departureDate:'08/12/2015'},
        {reservationNumber: '5',  firstName: 'Vinod4', lastName: 'Khandelwal', arrivalDate: '05/12/2015', departureDate:'09/12/2015'},
        {reservationNumber: '6',  firstName: 'Vinod5', lastName: 'Khandelwal', arrivalDate: '06y/12/2015', departureDate:'10/12/2015'}

    ];

    $scope.baseURL = 'http://10.168.11.33:8080/authrestserv-war/reservation/nextReservationId';

    $scope.onSearchClick = function () {

      $http.get($scope.baseURL+ '?lastName=' + $scope.lastName + '&arrivalDate=' + $scope.arrivalDate).
        success(function(data) {
            $scope.reservations = data;
        }).error(function() {
        	$scope.reservations = [];
        });;
    };



}]);