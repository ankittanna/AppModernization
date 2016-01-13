'use strict';

describe('Factory: UtilitiesService', function(){

//var scope;
//var $compile;
//var $document;
//var element = null;
    
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
    
    
//    var template = '<div handle-esc="close()"></div>';
//    beforeEach(inject(function($injector){
//        $compile = $injector.get('$compile');
//        scope = $injector.get('$rootScope').$new();
//        $document = $injector.get('$document');
//    }));
//    
//    beforeEach(function() {
//        element = $compile(template)(scope);
//        /**
//         * Create method and spyOn it.
//         */
//        scope.close = function() {};
//        spyOn(scope, 'close');
//    });
//
//    
//    
//    function triggerKeyUpEvent()
//    {
//        var e = new window.KeyboardEvent('keydown', {
//            bubbles: true,
//            cancelable: true,
//            shiftKey: true
//        });
//        
//        delete e.keyCode;
//        Object.defineProperty(e, 'keyCode', {'value': 27});
//
//        $document[0].dispatchEvent(e);
//    }
    // Test 4: keyUpEvent
    // TODO: Learn Emulating Key Press Events
    describe('keyUpEvent', function(){
        it('Should be called and have a capital value stored', function(){
            // Line to be tested
            var sampleEvent = {};
            sampleEvent.currentTarget = {};
            sampleEvent.currentTarget.value = 'a';
            expect(UtilitiesService.keyUpEvent(sampleEvent)).toHaveBeenCalled();    
        });
    });
    
    // Test 5: isPreviousDay
    describe('isPreviousDay', function(){
        it('should check if its a previous day', function(){
            var previousDate = new Date('2016', '00', '12');
            var nextDate = new Date('2016', '00', '13');
            expect(UtilitiesService.isPreviousDay(previousDate, nextDate)).not.toBeTruthy();
        });
    });
    
    
});