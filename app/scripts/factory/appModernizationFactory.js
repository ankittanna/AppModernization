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
        getReservedRoomData:getReservedRoomData,
        cancleReservation:cancleReservation,
        getRegisteredData:getRegisteredData,
        editReservation:editReservation
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
       // reservedData = reservationDetails;
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
            reservedData = response.data;

            console.log("reservedData  "  + JSON.stringify(reservedData));

            return reservedData;
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
          url: baseUrl + '/rooms?arrivalDate='+arrivalDate + '&departureDate=' + departureDate + '&roomType=' + roomType
              
        }).then(success)
        .catch(failure);

          function success(response) {
            console.log('reaching success function');
            return response.data;
          }

          function failure(error) {
            console.log('XHR Failed for searchReservation' + JSON.stringify(error));
            return error;
          }
    }

     function cancleReservation(reservationId)
    {   
            console.log("Inside Cancel Reservaition");
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
    
    function getRegisteredData(reservationId)
    {
        return $http({
          method: 'GET',
          url: baseUrl + '/reservation/'+reservationId
          })
            .then(success)
            .catch(failure);

          function success(response) {
            return response.data;
          }

          function failure(error) {
            console.log('XHR Failed for searchReservation' + error.data);
            return error;
          }
        
    }
    
    function editReservation(reservationDetails,reservationId)
    {
        // reservedData = reservationDetails;
         return $http({
          method: 'PUT',
          url: baseUrl + '/reservation/'+reservationId,
          headers: {
            'Content-Type': 'application/json'
          },
          data: reservationDetails
        }).then(success)
        .catch(failure);

          function success(response) {
            reservedData = response.data;

            console.log("response  "  + JSON.stringify(response));
            console.log("response Data  "  + JSON.stringify(response.data));
            console.log("reservedData  "  + JSON.stringify(reservedData));

            return response;
          }

          function failure(error) {
            console.log('XHR Failed for searchReservation' + JSON.stringify(error));
            return error;
          }
    }
}