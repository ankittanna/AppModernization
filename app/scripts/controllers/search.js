'use strict';

/**
 * @ngdoc function
 * @name appModernizationApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the appModernizationApp
 */
angular.module('appModernizationApp')
  .controller('SearchCtrl', ['$scope', '$http', 'HRS','$location', function ($scope, $http, HRS,$location) {  
    
    // Tab Visibility Logic
    angular.element('#appNavBar').css('display', 'block');
    // Tab Active Logic
    angular.element('#searchTab').addClass('active');
    angular.element('#bookTab').removeClass('active');

    this.searchLastName = '';
    this.searchArrivalDate = '';
    
    this.validateSearchCriteria = function()
    {
        var lastName = this.searchLastName.trim();
        var todayDate = new Date();
        var selectedDate = new Date(this.searchArrivalDate);
        
        if(lastName.length === 0 && todayDate.notPreviousDay(selectedDate))
        {
            alert('Name cannot be blank and Date cannot be less than todays date.');
            return false;
        } else if(selectedDate == 'Invalid Date')
        {
            alert('Date Cannot be blank.');
            return false;
        } else
        {
            return true;
        }
    };
      
    this.searchReservations = function()
    {
        //alert(this.validateSearchCriteria());
        
        if(this.validateSearchCriteria())
        {
            var postSearchCriteria = {
                lastName: this.searchLastName.trim(),
                arrivalDate: this.searchArrivalDate
            };
            
            HRS.searchReservations('Jo', '20150202').then(function(response){
                alert(JSON.stringify(response))
            });
            
           // alert(JSON.stringify(postSearchCriteria));
        } else
        {
            alert('Please enter proper name or date.');
        }
    };
      
      
  	$scope.reservations = [
        {reservationNumber: '1',  firstName: 'Vinod', lastName: 'Khandelwal', arrivalDate: '01/12/2015' ,departureDate:'05/12/2015'},
        {reservationNumber: '2',  firstName: 'Vinod1', lastName: 'Khandelwal', arrivalDate: '02/12/2015' ,departureDate:'06/12/2015'},
        {reservationNumber: '3',  firstName: 'Vinod2', lastName: 'Khandelwal', arrivalDate: '03/12/2015', departureDate:'07/12/2015'},
        {reservationNumber: '4',  firstName: 'Vinod5', lastName: 'Khandelwal', arrivalDate: '06/12/2015', departureDate:'10/12/2015'}

    ];

   

    $scope.onSearchClick = function () {

        HRS.searchReservations($scope.lastName, $scope.arrivalDate).then(function(data){
          $scope.roomDetails = data;
        });
}

}]);