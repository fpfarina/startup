'use strict';

var ctrl = angular.module('localStorageController', ['userSessionService', 'ngStorage']);

/* Local data controller -> save and load data*/
ctrl.controller('localStorageCtrl', ['$scope', '$localStorage', 'sessionService', function($scope,$localStorage, sessionService){

    var init = {
    sessionData : {
        logged : false,
        logOut: false,
        checkingSession : false,
        checkStatus: 0, 
        checkStatusMessage : "",
        access_token : null,
        token_type : null,
        refresh_token : null,
        session : null,
        display_name : null,
        email : null,
        id : null,
        profile_pic : null
        }
    };
    // INICION SESION DESDE MI LOCAL STORAGE
    $localStorage.$default(init);
    sessionService.setSession($localStorage.sessionData);
    sessionService.checkingSession = false;
    sessionService.cleanCache();

    if (sessionService.access_token == null)
        sessionService.ping();
            
    
    sessionService.ping();
    // Now, make the syncro:
    $localStorage.sessionData = sessionService;

}]);