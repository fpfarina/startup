'use strict';

var ctrl = angular.module('localStorageController', ['userSessionService', 'ngStorage', 'usefulMethodsService']);

/* Local data controller -> save and load data*/
ctrl.controller('localStorageCtrl', ['$scope', '$localStorage', 'sessionService', 'List', 'usefulAppMethods', function($scope,$localStorage, sessionService, List, usefulAppMethods){

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


    $localStorage.$default(init);
    console.log('-----------------------------------',$localStorage.sessionData.myPlayList);
    sessionService.setSession($localStorage.sessionData);

    sessionService.myPlayList = new List('myPlayList');
    usefulAppMethods.setValor (sessionService.myPlayList, $localStorage.sessionData.myPlayList);

    sessionService.checkingSession = false;
    sessionService.cleanCache();

    sessionService.ping();

    // Now, make the syncro:
    $localStorage.sessionData = sessionService;

    console.log('*******************************---------', sessionService.codeSEcret);
        


}]);