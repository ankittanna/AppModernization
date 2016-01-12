/**
 * @ngdoc service 
 * @name appModernizationApp.UtilitiesService
 * @description
 * # AVAILABLE SERVICES
 *
 * The UtilitiesService consist of a services for Common operations on the Date and other common functionalities used across app. This service  works accross the application and it just needs a dependency of <strong>UtilitiesService</strong> and a call to <strong>UTILITY_NAME</strong> method of the services with required parameters.
 *
 * These are the list of services available within UtilitiesService.
 * <ul>
 * <li>convertToFormat</li>
 * <li>convertToRaw</li>
 * <li>formatMMDDYYYY</li>
 * <li>keyUpEvent</li>
 * <li>isPreviousDay</li>
 * </ul>
 * @returns {servicesMapObject} services This maps the services with the functions listed in the file.
**/

/* Factory UtilitiesService - Collection of all utility functions */
function utilitiesService(){
    'use strict';
    
    Date.prototype.notPreviousDay = function(d) {
      //return !(d.getFullYear() >= this.getFullYear() && d.getDate() >= this.getDate() && d.getMonth() >= this.getMonth());
      return !(this <= d);
    }; 
    
/**
 * @ngdoc function
 * @name appModernizationApp.UtilitiesService#convertToFormat
 * @methodOf appModernizationApp.UtilitiesService
 *
 * @description
 * Method to convert raw date to formatted date
 * Service: NA
 * @example
 * UtilitiesService.convertToFormat(rawDate);
 * 
 * @returns {string} Formatted String
 */    
    
    function convertToFormat(rawDate)
    {
        var formattedDate;
        
        formattedDate = rawDate.toString();
        formattedDate = formattedDate.slice(6,8)+'/'+formattedDate.slice(4,6)+'/'+formattedDate.slice(0,4);
        
        return formattedDate;
    }

/**
 * @ngdoc function
 * @name appModernizationApp.UtilitiesService#convertToRaw
 * @methodOf appModernizationApp.UtilitiesService
 *
 * @description
 * Method to convert formatted date to raw date
 * Service: NA
 * @example
 * UtilitiesService.convertToRaw(rawDate);
 * 
 * @returns {string} Raw String
 */    
    
    function convertToRaw(formattedDate)
    {
        var rawDate;
        
        rawDate = formattedDate.toString();
        rawDate = rawDate.replace(/\//g, '');
        
        return rawDate;
    }

/**
 * @ngdoc function
 * @name appModernizationApp.UtilitiesService#formatMMDDYYYY
 * @methodOf appModernizationApp.UtilitiesService
 *
 * @description
 * Converts Date to MMDDYYYY Format
 * Service: NA
 * @example
 * UtilitiesService.formatMMDDYYYY(rawDate);
 * 
 * @returns {number} Formatted Date formattedDate
 */    
    
    function formatMMDDYYYY(date){
        // return parseInt( date.getFullYear()+ '' + (date.getMonth() + 1) + 
        // '' +  date.getDate());

        var fullYear = date.getFullYear();
        var fullMonth = ('00' + (date.getMonth() + 1)).slice(-2);
        var fullDate = ('00' + date.getDate()).slice(-2);
        var formattedDate = '' + fullYear + '' + fullMonth + '' + fullDate + '';

        return parseInt(formattedDate);
    }

/**
 * @ngdoc function
 * @name appModernizationApp.UtilitiesService#keyUpEvent
 * @methodOf appModernizationApp.UtilitiesService
 *
 * @description
 * Converts input to upper case
 * Service: NA
 * @example
 * UtilitiesService.keyUpEvent(rawDate);
 * 
 * @returns {null} Nothing as of Now
 */    
    
    function keyUpEvent(event)
    {
        event.currentTarget.value = event.currentTarget.value.toUpperCase();
    }
/**
 * @ngdoc function
 * @name appModernizationApp.UtilitiesService#isPreviousDay
 * @methodOf appModernizationApp.UtilitiesService
 *
 * @description
 * Checks if the provided date is previous date or current date
 * Service: NA
 * @example
 * UtilitiesService.isPreviousDay(todaysDate, selectedDate);
 * 
 * @returns {boolean} True/False
 */
    
    function isPreviousDay(todaysDate, selectedDate)
    {
        // Usage: todaysDate.notPreviousDay(selectedDate)
        var isSelectedDateValid = todaysDate.notPreviousDay(selectedDate);
        
        return isSelectedDateValid;
    }
    
    return {
        convertToFormat: convertToFormat,
        convertToRaw: convertToRaw,
        formatMMDDYYYY:formatMMDDYYYY,
        keyUpEvent: keyUpEvent,
        isPreviousDay: isPreviousDay
    }; 
}

angular.module('appModernizationApp')
    .factory('UtilitiesService', utilitiesService);

// utilitiesService.$inject = ['$http'];