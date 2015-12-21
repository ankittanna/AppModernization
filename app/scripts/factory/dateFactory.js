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
        formattedDate = rawDate.slice(6,8)+"/"+rawDate.slice(4,6)+"/"+rawDate.slice(0,4);
        
        return formattedDate;
    }
    
    function convertToRaw(formattedDate)
    {
        var rawDate;
        
        rawDate = formattedDate.toString();
        rawDate = formattedDate.replace(/\//g, '');
        
        return rawDate;
    }
}