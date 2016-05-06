'use strict';

let moviesCtrl = angular.module('moviesCtrl', []);

moviesCtrl.controller('MoviesCtrl', ['$scope', 'MoviesList', 'MoviesStorage', function($scope, MoviesList, MoviesStorage) {

    let moviesList = new MoviesList; // First i make an empty moviesList
    moviesList = MoviesStorage.data.movies; // Add all the movies to the list (by the service MoviesStorage).

    $scope.movies = moviesList.movies; // movies -> MoviesList.movies
    $scope.select = MoviesStorage.data.select.id; // Loads from localStorage the last remembered index
    $scope.selectedMovie = $scope.movies[$scope.select]; // Select the last index.
    $scope.noMovies =  ($scope.movies.length == 0); // In case there are not films.
    if ($scope.movies.length > 0)
        $scope.menuOption = "Edit movie: ";
    else
        $scope.menuOption = "No movies ";

    let noMovie = new MoviesList; // A visual trick: if there´s not Movies, show an empty movie!!
    noMovie.addMovie("","","");

    MoviesStorage.data.movies = moviesList.movies; // Live data storage.

    $scope.isEmpty = function(string, optString=""){ // if the string is empty return a '-' char
        if (string == "" || string == undefined)
            return "-";
        else
            return (string + optString);
    };

    $scope.set = function(index){ // when a new film in the list it's selected
        if (index < 0) 
            if ($scope.movies.length == 0){
                $scope.noMovies = true;
                $scope.menuOption = "No Movies ";
                $scope.selectedMovie = noMovie;
                return;
                }
            else
                index = 0;

            $scope.noMovies = false;
            $scope.menuOption = "Edit movie: ";
            $scope.select = index; // Changes select id
            $scope.selectedMovie = $scope.movies[$scope.select]; // Changes select movie
            MoviesStorage.data.select.id = $scope.select; //Changes select.id in MoviesStorage
    };

    let newMovie = function(){ //NEW MOVIE
        moviesList.addMovie("","","");
        $scope.set($scope.movies.length-1);
    };

    let deleteMovie = function(movieIndex){ //DELETE MOVIE
        moviesList.deleteMovie(movieIndex);
        $scope.set($scope.select-1); // Select another film
    };

    $scope.buttonsHandler = function(indexBtn){ // Button handler - 0 -> (Add button) 1 -> Delete button
        if (indexBtn == 0){
            newMovie();
            $scope.menuOption = "New movie: "
        }
        else {
            if (indexBtn == 1){
                if (confirm("Are you sure you want to delete ''"+ $scope.selectedMovie.title + "'' ? It would be irreversible."))
                    deleteMovie($scope.select);
            }
            else {
                $scope.menuOption = "Edit movie: ";
            }
        }
    };

    $scope.newActor = function (){
        $scope.selectedMovie.addActor("","","");
    };

    $scope.deleteActor = function (indexActor){
        $scope.selectedMovie.deleteActor(indexActor);
    };

    $scope.isOdd = function (index){
        return !((index % 2) == 1);
    }

}]);