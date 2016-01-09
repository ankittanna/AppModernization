/* Factory HRS - Collection of all services */
function hotelReservationServices($http) {
    'use strict';
    var baseUrl = 'http://172.31.28.248:9001/am/v1';
    var reservedData = '';

    var backendSystem = '';
    var authType = '';
    var authToken = '';
    
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

    function cancelReservation(reservationId) {
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
    
    function greetingFunction(name)
    {
        return "Hello " + name;
    }
    
    // Object Map of functions
    return {
        backendSystem: backendSystem,
        authType: authType,
        authToken: authToken,
        searchReservations: searchReservations,
        saveReservations: saveReservations,
        getRoomList: getRoomList,
        getReservedRoomData: getReservedRoomData,
        cancelReservation: cancelReservation,
        getRegisteredData: getRegisteredData,
        editReservation: editReservation,
        greetingFunction: greetingFunction
    };
}

angular.module('appModernizationApp')
    .factory('HRS', hotelReservationServices);

hotelReservationServices.$inject = ['$http'];