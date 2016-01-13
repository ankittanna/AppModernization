'use strict';

describe('Factory: UtilitiesService', function(){
    // Import the module this service belongs to
    beforeEach(module('appModernizationApp'));
    
    // Import the Service to be tested
    var UtilitiesService, $httpBackend;
    beforeEach(inject(function(_UtilitiesService_, _$httpBackend_){
        UtilitiesService = _UtilitiesService_;
        $httpBackend = _$httpBackend_;
    }));
    
    // What we did above is injected utilitiesService
    
    // Test the methods
    // There are 5 Methods.
    
    // Test 1: convertToFormat
    describe('convertToFormat', function(){
        it('should convert the date into formatted date', function(){
        // Setup the line to be tested
        expect(UtilitiesService.convertToFormat('20161301')).toEqual('01/13/2016');
        });
    });
    
    // Test 2: convertToRaw
    describe('convertToRaw', function(){
        it('should convert the date into raw formatted date', function(){
        // Setup the line to be tested
        expect(UtilitiesService.convertToRaw('2016/13/01')).toEqual('20161301');
        });
    });
    
    // Test 3: formatMMDDYYYY
    describe('formatMMDDYYYY', function(){
        it('should convert the date to the YYYYMMDD format', function(){
        // Line to be tested
        var currentDate = new Date('2016', '00', '13');
        expect(UtilitiesService.formatMMDDYYYY(currentDate)).toEqual(20160113);
        });
    });
});