'use strict';

let localStorageCtrl = angular.module('localStorageCtrl', ['appInitSvc']);

localStorageCtrl.controller('LocalStorageCtrl', ['$scope', '$localStorage', 'MoviesStorage', 'InitMovies', function($scope, $localStorage, MoviesStorage, InitMovies){

    $scope.storage = $localStorage.$default(InitMovies);
    MoviesStorage.movies = $scope.storage.movies;
    MoviesStorage.selectMovie = $scope.storage.selectMovie;

    $scope.storage = MoviesStorage;
    /* $scope.storage = $localStorage.$default(angular.copy($scope.init));
     $scope.movies = $scope.storage.movies;
     $scope.select = $scope.storage.selectMovie.id;*/

}]);