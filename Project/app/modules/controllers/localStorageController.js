'use strict';

/*****************************************************************************************
 *  LOCAL STORAGE CONTROLLER:                                                            *
 *  Save data session, to avoid re-login, and local playlists                            *
 *****************************************************************************************/

var ctrl = angular.module('localStorageController', ['userSessionService', 'ngStorage', 'usefulMethodsService']);
ctrl.controller('localStorageCtrl', ['$scope', '$localStorage', 'sessionService', 'List', 'usefulAppMethods', function($scope,$localStorage, sessionService, List, usefulAppMethods){

    /*INIT VALUES*/
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
        profile_pic : null,
        myPlayList: null,
        search_results : {
            response : null,
            error : false
            }
         }
    };

    /*LOADING*/
    $localStorage.$default(init);
    sessionService.setSession($localStorage.sessionData);
    sessionService.myPlayList = new List('myPlayList');
    usefulAppMethods.setValues(sessionService.myPlayList, $localStorage.sessionData.myPlayList);
    sessionService.checkingSession = false;
    sessionService.cleanCache();
    sessionService.ping(); // check token stored

    // Now, make sync. START TO SAVE DATA IN REAL TIME:
    $localStorage.sessionData = sessionService;

}]);