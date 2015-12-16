'use strict';

/**
 * @ngdoc function
 * @name appModernizationApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the appModernizationApp
 */
angular.module('appModernizationApp')
  .controller('SearchCtrl', ['$scope', '$http', 'HRS','$location', 'breadcrumbs',function ($scope, $http, HRS,$location,breadcrumbs) { 
      $scope.breadcrumbs = breadcrumbs;
      angular.element('.userInfo').css('display', 'none');
      
      $("input[type=text]").keyup(function(){
        $(this).val( $(this).val().toUpperCase() );
        this.searchLastName = $(this).val().toUpperCase();
        //console.log("FirstName  value :"+angular.element($('#lastName')).val());
      });
      
      $scope.responseMsg = "";
    
    // Tab Visibility Logic
    angular.element('#appNavBar').css('display', 'block');
    angular.element('.userInfo').css('display', 'block');
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
        this.searchLastName = this.searchLastName.toUpperCase();
        
        if(this.validateSearchCriteria())
        {
            var postSearchCriteria = {
                lastName: this.searchLastName.trim(),
                arrivalDate: (this.searchArrivalDate).getFullYear() + "" + ((this.searchArrivalDate).getMonth()+1) + "" + (this.searchArrivalDate).getDate() +""
            };
            
            HRS.searchReservations(postSearchCriteria.lastName, postSearchCriteria.arrivalDate).then(function(response){

                $scope.reservations = response.data;
                console.log(JSON.stringify(response))

                if($scope.reservations.length == 0) {
                    $scope.responseMsg = "No reseravation found matching criteria.";
                }
            });
            
           // alert(JSON.stringify(postSearchCriteria));
        } else
        {
            alert('Please enter proper name or date.');
        }
    };
      
      
  	$scope.reservations = [{"reservationId":11,"arrivalDate":20151215,"departureDate":20151216,"firstName":"h","lastName":"h"},
    {"reservationId":11,"arrivalDate":20151215,"departureDate":20151216,"firstName":"h","lastName":"h"},
    {"reservationId":11,"arrivalDate":20151215,"departureDate":20151216,"firstName":"h","lastName":"h"},
    {"reservationId":11,"arrivalDate":20151215,"departureDate":20151216,"firstName":"h","lastName":"h"},
    {"reservationId":11,"arrivalDate":20151215,"departureDate":20151216,"firstName":"h","lastName":"h"},
    {"reservationId":11,"arrivalDate":20151215,"departureDate":20151216,"firstName":"h","lastName":"h"}
];


   

    $scope.onSearchClick = function () {

        // HRS.searchReservations($scope.lastName, parseInt(angular.element($('#arrivalDate')).val().replace(/-/g,''))).then(function(data){
        //   $scope.roomDetails = data;
        // });
}

}]);