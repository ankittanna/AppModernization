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
        
          return $http({
          method: 'POST',
          url: baseUrl + '/reservation',
          headers: {
            'Content-Type': 'application/json'
          },
          data: reservationDetails
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