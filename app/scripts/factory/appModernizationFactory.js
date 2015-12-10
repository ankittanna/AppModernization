// Factory HRS - Collection of all services
angular.module('appModernizationApp')
    .factory('HRS', hotelReservationServices);

hotelReservationServices.$inject = ['$http'];

function hotelReservationServices($http)
{   
    var baseUrl = 'http://10.168.11.33:8080/authrestserv-war';
    var reservedData = "";
    // Object Map of functions
    return {
        searchReservations: searchReservations,
        saveReservations: saveReservations,
        getRoomList: getRoomList,
        getReservedRoomData:getReservedRoomData
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
        reservedData = reservationDetails;
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

    function getRoomList(arrivalDate, departureDate, roomType)
    {   
          return $http({
          method: 'GET',
          url: baseUrl + '/rooms?arrivalDate='+arrivalDate + '&departureDate=' + departureDate + '&departureDate=' + roomType
              
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

     function cancleReservation(reservationId)
    {   
          return $http({
          method: 'DELETE',
          url: baseUrl + '/reservation/' + reservationId
              
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
    function getReservedRoomData()
    {
           return reservedData;
    }
}