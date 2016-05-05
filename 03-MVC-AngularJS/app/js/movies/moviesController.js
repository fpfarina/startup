'use strict';

let moviesCtrl = angular.module('moviesCtrl', []);

moviesCtrl.controller('MoviesCtrl', ['$scope', 'MoviesList', 'MoviesStorage', function($scope, MoviesList, MoviesStorage) {

    let moviesList = new MoviesList; // First i make my moviesList
    moviesList = MoviesStorage.data.movies; // Add all the movies to the list.

    $scope.movies = moviesList.movies; // movies -> MoviesList.movies
    $scope.select = MoviesStorage.data.select.id; // load from localStorage the select id
    $scope.selectedMovie = $scope.movies[$scope.select]; // The selected movie.

    MoviesStorage.data.movies = moviesList.movies;
    console.log(moviesList);


    $scope.isEmpty = function(string, optString=""){ // if the string is empty return a '-' char
        if (string == "")
            return "-";
        else
            return (string + optString);
    };

    $scope.set = function(index){ // when select another film
        $scope.select = index; // Change select id
        $scope.selectedMovie = $scope.movies[$scope.select]; // Change select movie
        MoviesStorage.data.select.id = $scope.select; //Change MoviesStorage
    };

    let newMovie = function(){
        moviesList.addMovie("","","");
        $scope.set($scope.movies.length-1);
        refresh ();
    };

    let deleteMovie = function(movieIndex){
        moviesList.deleteMovie(movieIndex);
        $scope.set($scope.select-1); // Select another film
        if (!($scope.select == 0)){
            MoviesStorage.data.select.id = $scope.select; // Change MoviesStorage
        }
        refresh();
    };

    let refresh = function () {

    };

    $scope.setMenu = function(indexBtn){ // 0 - Add button 1 - Delete button
        if (indexBtn == 0){
            newMovie();
            $scope.menuOption = "New Movie: "
        }
        else
            if (confirm("Are you sure you wanna delete "+ $scope.selectedMovie.title + " !! It would be irreversible."))
                deleteMovie($scope.select);
    };

    $scope.newActor = function (){
        $scope.selectedMovie.addActor("","","");
    };

    $scope.deleteActor = function (indexActor){
        $scope.selectedMovie.deleteActor(indexActor);
    }

}]);