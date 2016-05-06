'use strict';

let localStorageCtrl = angular.module('localStorageCtrl', ['appInitSvc', 'moviesListFctr']);

localStorageCtrl.controller('LocalStorageCtrl', ['$scope', '$localStorage', 'MoviesStorage', 'InitMovies', 'MoviesList', function($scope, $localStorage, MoviesStorage, InitMovies, MoviesList){



    $scope.storage = $localStorage.$reset(InitMovies); //InitMovies -> put some initial MOVIES in localStorage

    console.log($scope.storage.data.movies);
    let movies = new MoviesList;
    movies.addMoviesJson($scope.storage.data.movies);


    $scope.storage.data.movies =  movies;

    console.log($scope.storage.data.movies);


    MoviesStorage.data.movies = $scope.storage.data.movies; // First we will LOAD movies
    MoviesStorage.data.select.id = $scope.storage.data.select.id; //Second we will LOAD select ID

    $scope.storage.data = MoviesStorage.data; // Now storage will be listen changes in movies.
    $scope.storage.data.select = MoviesStorage.data.select; // Now storage will be listen changes in id.

}]);