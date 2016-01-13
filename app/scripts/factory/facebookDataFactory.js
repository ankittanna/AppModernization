function facebookDataFactory($location, HRS, $window, $rootScope, $q) {
    'use strict';
    
    function initializeFacebookLogin()
    {
        var deferred = $q.defer();
        
        window.fbAsyncInit = function() {
          FB.init({
            appId      : '823760887743090',
            cookie     : true,  // enable cookies to allow the server to access 
                                // the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.5' // use version 2.5
          });

          // Now that we've initialized the JavaScript SDK, we call 
          // FB.getLoginStatus().  This function gets the state of the
          // person visiting this page and can return one of three states to
          // the callback you provide.  They can be:
          //
          // 1. Logged into your app ('connected')
          // 2. Logged into Facebook, but not your app ('not_authorized')
          // 3. Not logged into Facebook and can't tell if they are logged into
          //    your app or not.
          //
          // These three cases are handled in the callback function.

          FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                updateUserInfo(response);
                $rootScope.$apply(deferred.resolve(response));
              } 
          });

          };
        
        return deferred.promise;
    }
    
    function loginWithFacebook()
    {
        FB.login(function() {
            console.log("Logged In Via Facebook");
            
            FB.init({
                appId      : '823760887743090',
                cookie     : true,  // enable cookies to allow the server to access 
                                    // the session
                xfbml      : true,  // parse social plugins on this page
                version    : 'v2.5' // use version 2.5
              });
            
            FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                HRS.authToken = response.authResponse.accessToken;
              }
                updateUserInfo(response);
              });
        }, { scope: 'email,public_profile' });
    }
    
    function updateUserInfo(response)
    {
        console.log(response);
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
          // Logged into your app and Facebook.
          console.log('Welcome!  Fetching your information.... ');
            FB.api('/me', function(response) {
              console.log('Successful login for: ' + response.name);
                HRS.userName = response.name;
              //document.getElementById('status').innerHTML ='' + response.name + '!';
                $rootScope.$apply( function(){$location.path('/search'); } );
            });
        } else if (response.status === 'not_authorized') {
          // The person is logged into Facebook, but not your app.
          //document.getElementById('status').innerHTML = 'Please log ' +'into this app.';
        } else {
          // The person is not logged into Facebook, so we're not sure if
          // they are logged into this app or not.
          //document.getElementById('status').innerHTML = 'Please log ' +'into Facebook.';
        }
    }
    
    // Object Map of functions
    return {
        initializeFacebookLogin: initializeFacebookLogin,
        loginWithFacebook: loginWithFacebook,
        updateUserInfo: updateUserInfo
    };
}

angular.module('appModernizationApp')
    .factory('FacebookDataFactory', facebookDataFactory);

facebookDataFactory.$inject = ['$location', 'HRS', '$window', '$rootScope', '$q'];