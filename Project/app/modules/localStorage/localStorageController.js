'use strict';

var localStorageController = angular.module('localStorageController', ['ngStorage', 'localStorageService', 'initializeStorageService']);

/* Local data controller -> save and load data*/
localStorageController.controller('localStorageCtrl', ['$scope', '$localStorage', 'localStorage', 'initStorageSvc', function($scope, $localStorage, localStorage, InitStorage){

    console.log("HELP");
    $scope.storage = $localStorage.$default(InitStorage);
    console.log($scope.storage);

    localStorage.data = $scope.storage.data;
    
    $scope.storage.data.token = localStorage.data.token;
    $scope.storage.data.appState = localStorage.data.appState;
    console.log (localStorage.data.appState.index);
    
}]);