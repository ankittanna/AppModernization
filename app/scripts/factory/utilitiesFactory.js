// Factory HRS - Collection of all services
angular.module('appModernizationApp')
    .factory('UtilitiesService', utilitiesService);

// utilitiesService.$inject = ['$http'];

function utilitiesService(){

    return {
        convertToFormat: convertToFormat,
        convertToRaw: convertToRaw,
        formatMMDDYYYY:formatMMDDYYYY,
        keyUpEvent: keyUpEvent
    };  
    
    function convertToFormat(rawDate)
    {
        var formattedDate;
        
        formattedDate = rawDate.toString();
        formattedDate = formattedDate.slice(6,8)+"/"+formattedDate.slice(4,6)+"/"+formattedDate.slice(0,4);
        
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
        return parseInt( date.getFullYear()+ "" + (date.getMonth() + 1) + 
        "" +  date.getDate());
    }
    
    function keyUpEvent(event)
    {
        event.currentTarget.value = event.currentTarget.value.toUpperCase();
    }
}