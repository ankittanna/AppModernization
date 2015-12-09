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
            console.log("Inside Reservations");
            
            //console.log("Data :"+arrivalDate+" "+departureDate+" "+roomType+" "+ firstName+" "+ middleName+" "+ lastName+" "+ addressLine1+" "+ addressLine2+" "+ addressLine3+" "+ companyName+" "+ phonenumber+" "+ lateArrival+" "+ cardType+" "+ cardNumber+" "+ expiryMonth+" "+ expiryYear+" "+ comments);
        
          return $http({
          method: 'POST',
          url: baseUrl + '/reservation',
          data: reservationDetails
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
}