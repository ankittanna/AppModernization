// Factory HRS - Collection of all services
angular.module('appModernizationApp')
    .factory('HRS', hotelReservationServices);

hotelReservationServices.$inject = ['$http'];

function hotelReservationServices($http)
{   
    var baseUrl = 'http://10.168.11.33:8080/authrestserv-war';
    
    // Object Map of functions
    return {
        searchReservations: searchReservations,
        saveReservations: saveReservations
    };
    
    function searchReservations(lastName, arrivalDate)
    {
       // alert(lastName + ' ' + arrivalDate)
        
          return $http({
          method: 'GET',
          url: baseUrl + '/reservation?lastName='+lastName+'&arrivalDate='+arrivalDate
          })
            .then(success)
            .catch(failure);

          function success(response) {
            return response;
          }

          function failure(error) {
            console.log('XHR Failed for searchReservation' + error.data);
            return error;
          }
    }
    
        function saveReservations(reservationDetails)
    {   
            console.log("Inside Reservations " + reservationDetails);
        console.log("Inside Reservations 2" + JSON.stringify(reservationDetails));
            
            //console.log("Data :"+arrivalDate+" "+departureDate+" "+roomType+" "+ firstName+" "+ middleName+" "+ lastName+" "+ addressLine1+" "+ addressLine2+" "+ addressLine3+" "+ companyName+" "+ phonenumber+" "+ lateArrival+" "+ cardType+" "+ cardNumber+" "+ expiryMonth+" "+ expiryYear+" "+ comments);
        
          return $http({
          method: 'POST',
          url: baseUrl + '/reservation',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {"customer":{"firstName":"a","lastName":"c","middleName":"b","addressLine1":"x","addressLine2":"y","addressLine3":"z","phoneNumber":"904977","companyName":"acc"},"arrivalDate":20151210,"departureDate":20151212,"cardNumber":"1111111111111111","cardType":"Master Card","comments1":"aaa","comments2":"","lateArrivalFlag":false,"expiryDate":1017,"room":{"roomNo":1,"smokeFlag":true,"roomType":"KI","rateCode":"TW","roomDescription":"Nice Room","rate":0}}
        }).then(success)
        .catch(failure);

          function success(response) {
            console.log('reaching success function');
            return response;
          }

          function failure(error) {
            console.log('XHR Failed for searchReservation' + JSON.stringify(error));
            return error;
          }
    }
}