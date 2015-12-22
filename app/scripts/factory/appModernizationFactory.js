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
        
        var url = baseUrl + '/reservation/' + reservationId;
        var config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return $http.put(url, reservationDetails, config).then(function(response) {
            return response.data;
        });



        // return $http({
        //     method: 'POST',
        //     url: baseUrl + '/reservation',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     data: reservationDetails
        // }).then(function(response) {
        //     reservedData = response.data;
        //     return response.data;
        // });
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
