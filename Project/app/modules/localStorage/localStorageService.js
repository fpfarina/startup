'use strict';

var localStorageService = angular.module('localStorageService', []);

/* This services connect the data between 'locaStorageController' and the app */

localStorageService.service('localStorageService', function() {
    this.data = {};
   
    this.data.token = "";
 }) ;