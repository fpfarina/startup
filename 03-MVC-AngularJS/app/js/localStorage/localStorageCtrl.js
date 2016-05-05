'use strict';

let localStorageCtrl = angular.module('localStorageCtrl', ['appInitSvc']);

localStorageCtrl.controller('LocalStorageCtrl', ['$scope', '$localStorage', 'MoviesStorage', 'InitMovies', function($scope, $localStorage, MoviesStorage, InitMovies){

    $scope.storage = $localStorage.$default(InitMovies); //InitMovies -> put some initial MOVIES in localStorage
    
    MoviesStorage.data.movies = $scope.storage.data.movies; // First we will LOAD movies
    MoviesStorage.data.select.id = $scope.storage.data.select.id; //Second we will LOAD select ID

    $scope.storage.data = MoviesStorage.data; // Now storage will be listen changes in movies.
    $scope.storage.data.select = MoviesStorage.data.select; // Now storage will be listen changes in id.

}]);