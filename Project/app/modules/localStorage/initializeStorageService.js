'use strict';

var initializeStorageService = angular.module('initializeStorageService', []);

initializeStorageService.service('InitStorage', [ function (){

    /* The services provides some movies, the first time the app it's open */
    this.data = {};
    this.data.token = "";
        
}]);