'use strict';

var localStorageService = angular.module('localStorageService', []);

/* This services connect the data between 'locaStorageController' and the app */

localStorageService.service('localStorage', function() {
    this.data = {};
    this.data.token = "";
    this.data.appState = {};
    this.data.appState.index = "1";
    this.data.appState.message = "";

 }) ;