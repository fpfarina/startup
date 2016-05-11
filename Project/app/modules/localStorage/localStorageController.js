'use strict';

var localStorageCtrl = angular.module('localStorageCtrl', []);

/* Local data controller -> save and load data*/
localStorageCtrl.controller('LocalStorageCtrl', ['$scope', '$localStorage', 'localStorageService', function($scope, $localStorage){
    
    $scope.storage = $localStorage.$default(InitApp); //InitMovies -> put some initial MOVIES in localStorage

    let movies = new MoviesList;
    movies.addMoviesJson($scope.storage.data.movies);


    $scope.storage.data.movies =  movies;

    MoviesStorage.data.movies = $scope.storage.data.movies; // First we will LOAD movies
    MoviesStorage.data.select.id = $scope.storage.data.select.id; //Second we will LOAD select ID

    $scope.storage.data = MoviesStorage.data; // Now storage will be listen changes in movies.
    $scope.storage.data.select = MoviesStorage.data.select; // Now storage will be listen changes in id.

}]);