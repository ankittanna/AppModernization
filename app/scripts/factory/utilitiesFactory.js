/* Factory UtilitiesService - Collection of all utility functions */
function utilitiesService(){
    'use strict';
    
    Date.prototype.notPreviousDay = function(d) {
      return !(d.getFullYear() >= this.getFullYear() && d.getDate() >= this.getDate() && d.getMonth() >= this.getMonth());
    }; 
    
    function convertToFormat(rawDate)
    {
        var formattedDate;
        
        formattedDate = rawDate.toString();
        formattedDate = formattedDate.slice(6,8)+'/'+formattedDate.slice(4,6)+'/'+formattedDate.slice(0,4);
        
        return formattedDate;
    }
    
    function convertToRaw(formattedDate)
    {
        var rawDate;
        
        rawDate = formattedDate.toString();
        rawDate = rawDate.replace(/\//g, '');
        
        return rawDate;
    }

    function formatMMDDYYYY(date){
        // return parseInt( date.getFullYear()+ '' + (date.getMonth() + 1) + 
        // '' +  date.getDate());

        var fullYear = date.getFullYear();
        var fullMonth = ('00' + (date.getMonth() + 1)).slice(-2);
        var fullDate = ('00' + date.getDate()).slice(-2);
        var formattedDate = '' + fullYear + '' + fullMonth + '' + fullDate + '';

        return parseInt(formattedDate);
    }
    
    function keyUpEvent(event)
    {
        event.currentTarget.value = event.currentTarget.value.toUpperCase();
    }
    
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