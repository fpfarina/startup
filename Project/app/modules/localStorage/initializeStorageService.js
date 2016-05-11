'use strict';

var initializeStorageService = angular.module('initializeStorageService', []);

initializeStorageService.service('initStorageSvc', [ function (){

    /* The services provides some movies, the first time the app it's open */
    this.data = {};
    this.data.token = "monster back";

    this.data.appState = {};
    this.data.appState.index = "1";
    this.data.appState.message = "App normal start. No session.";
    
    

}]);