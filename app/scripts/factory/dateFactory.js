// Factory HRS - Collection of all services
angular.module('appModernizationApp')
    .factory('DateService', dateService);

// dateService.$inject = ['$http'];

function dateService(){

    return {
        convertToFormat: convertToFormat,
        convertToRaw: convertToRaw
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
}