/**
 * @ngdoc service 
 * @name appModernizationApp.HRS
 * @description
 * # AVAILABLE SERVICES
 *
 * The HRS consist of a services for CRUD operations on the database. This service works accross the application and it just needs a dependency of <strong>HRS</strong> and a call to <strong>SERVICE_NAME</strong> method of the services with required parameters.
 *
 * These are the list of services available within HRS.
 * <ul>
 * <li>backendSystem</li>
 * <li>authType</li>
 * <li>authToken</li>
 * <li>searchReservations</li>
 * <li>saveReservations</li>
 * <li>getRoomList</li>
 * <li>getReservedRoomData</li>
 * <li>cancelReservation</li>
 * <li>getRegisteredData</li>
 * <li>editReservation</li>
 * <li>greetingFunction</li>
 * </ul>
 * @property {string} baseUrl:string Holds the base url for the server on which the services would be hit
 * @property {string} reservedData:string Holds Reserved Data
 * @param {string} backendSystem:string Holds the backend system to be hit
 * @param {string} authType:string Authentication Type ADFS/Facebook
 * @param {object} authToken:object Token Object from ADFS/Facebook
 * @requires $http
 * @returns {servicesMapObject} services This maps the services with the functions listed in the file.
**/

/* Factory HRS - Collection of all services */
function hotelReservationServices($http) {
    'use strict';
    var baseUrl = 'http://172.31.28.248:9001/am3/v1';
    var reservedData = '';

    var backendSystem = '';
    var authType = '';
    var authToken = '';
    var userName = 'john.doe@accenture.com';

/**
 * @ngdoc function
 * @name appModernizationApp.HRS#searchReservations
 * @methodOf appModernizationApp.HRS
 *
 * @description
 * Method to search available reservations form the backend api
 * Service: API/reservation?lastName=Tanna&arrivalDate=20150303
 * @example
 * HRS.searchReservations(lastName, arrivalDate);
 * 
 * @returns {httpPromise} resolve with fetched data, or fails with error description.
 */    
    
    function searchReservations(lastName, arrivalDate) {
        var url = baseUrl + '/reservation?lastName=' + lastName + '&arrivalDate=' + arrivalDate;
        return $http.get(url).then(function(response) {
            return response.data;
        });
    }
/**
 * @ngdoc function
 * @name appModernizationApp.HRS#getRoomList
 * @methodOf appModernizationApp.HRS
 *
 * @description
 * Method to Get available Rooms form the backend api
 * Service: API/rooms?arrivalDate=20150303&departureDate=20150303&roomType=KI;
 * @example
 * HRS.getRoomList(arrivalDate, departureDate, roomType);
 * 
 * @returns {httpPromise} resolve with fetched data, or fails with error description.
 */
    function getRoomList(arrivalDate, departureDate, roomType) {
        var url = baseUrl + '/rooms?arrivalDate=' + arrivalDate + '&departureDate=' + departureDate + '&roomType=' + roomType;
        return $http.get(url).then(function(response) {
            return response.data;
        });
    }
/**
 * @ngdoc function
 * @name appModernizationApp.HRS#reservationDetails
 * @methodOf appModernizationApp.HRS
 *
 * @description
 * Post to the database the reservation to be made.
 * Service: API/reservation;
 * @example
 * HRS.saveReservations(reservationDetails);
 * 
 * @returns {httpPromise} resolve with fetched data, or fails with error description.
 */
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

/**
 * @ngdoc function
 * @name appModernizationApp.HRS#getRegisteredData
 * @methodOf appModernizationApp.HRS
 *
 * @description
 * Gets the reservation details based on reservation ID
 * Service: API/reservation/12
 * @example
 * HRS.getRegisteredData(reservationId);
 * 
 * @returns {httpPromise} resolve with fetched data, or fails with error description.
 */

    function getRegisteredData(reservationId) {
        var url = baseUrl + '/reservation/' + reservationId;
        return $http.get(url).then(function(response) {
            return response.data;
        });
    }

/**
 * @ngdoc function
 * @name appModernizationApp.HRS#cancelReservation
 * @methodOf appModernizationApp.HRS
 *
 * @description
 * Allows you to cancel the reservation using http.delete method
 * Service: API/reservation/12
 * @example
 * HRS.cancelReservation(reservationId);
 * 
 * @returns {httpPromise} resolve with fetched data, or fails with error description.
 */    
    
    function cancelReservation(reservationId) {
        var url = baseUrl + '/reservation/' + reservationId;
        return $http.delete(url).then(function(response) {
            return response.data;
        });
    }

/**
 * @ngdoc function
 * @name appModernizationApp.HRS#editReservation
 * @methodOf appModernizationApp.HRS
 *
 * @description
 * Allows you to edit the reservation using http.put method
 * Service: API/reservation/12
 * @example
 * HRS.editReservation(reservationId);
 * 
 * @returns {httpPromise} resolve with fetched data, or fails with error description.
 */     
    
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

/**
 * @ngdoc function
 * @name appModernizationApp.HRS#getReservedRoomData
 * @methodOf appModernizationApp.HRS
 *
 * @description
 * Sample Service for getting reserved room data
 * Service: NA
 * @example
 * HRS.getReservedRoomData();
 * 
 * @returns {httpPromise} resolve with fetched data, or fails with error description.
 */      
    
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
        greetingFunction: greetingFunction,
        userName: userName
    };
}

angular.module('appModernizationApp')
    .factory('HRS', hotelReservationServices);

hotelReservationServices.$inject = ['$http'];