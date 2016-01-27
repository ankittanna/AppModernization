'use strict';
var baseUrl = 'http://172.31.28.248:9001/am3/v1';
describe('Factory: HRS', function(){
    // Import the module this service belongs to
    beforeEach(module('appModernizationApp'));
    
    // Import the Service to be tested
    var HRS, $httpBackend;
    
    beforeEach(inject(function(_HRS_, _$httpBackend_){
        HRS = _HRS_;
        $httpBackend = _$httpBackend_;
    }));
    
//    var baseUrl = 'http://172.31.28.248:9001/am3/v1';
//    var reservedData = '';
//
//    var backendSystem = '';
//    var authType = '';
//    var authToken = '';
//    var userName = 'john.doe';
    
    // Check variable values
    describe('Base URL', function(){
        it('should have a base service http://172.31.28.248:9001/am3/v1', function(){
            expect(HRS.baseUrl).toEqual('http://172.31.28.248:9001/am3/v1');
        });
    });
    
    describe('userName', function(){
        it('should not be empty', function(){
            expect(HRS.userName).not.toEqual('');
        })
    });
    
    describe('backendSystem', function(){
        var availableBackendSystems = ['LEGSTAR', 'RAINCODE', 'MICROFOCUS', 'TUXEDO'];
        it('should be one of the following systems: LEGSTAR, RAINCODE, MICROFOCUS, TUXEDO', function(){
            expect(HRS.availableBackendSystems.indexOf(HRS.backendSystem)).not.toEqual(-1);
        })
    });
    
    describe('authType', function(){
        it('authType: should not be blank', function(){
            expect(HRS.authType).not.toEqual('');
        }); 
    });
    
    describe('testing service searchReservations', function(){
        
        var $httpBackend, $rootScope, createController, authRequestHandler;
        
        beforeEach(inject(function($injector){
            // Setup the mock http response
            $httpBackend = $injector.get('$httpBackend');
            
            // Backend definition common for all test
            authRequestHandler = $httpBackend.when('GET', baseUrl+'/reservation?lastName=tanna&arrivalDate=20160305')
                            .respond({userId: 'userX'}, {'A-Token': 'xxx'});
        }));
        
        afterEach(function(){
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
        
        it('Service searchReservations: should get authentication token', function(){
            
            $httpBackend.flush();
        });
        
    });
});