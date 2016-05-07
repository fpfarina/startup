'use strict';

let moviesCtrl = angular.module('moviesCtrl', ['ui.router']);

moviesCtrl.controller('MoviesCtrl', ['$scope', '$state', 'MoviesList', 'MoviesStorage', function($scope, $state, MoviesList, MoviesStorage) {

    let moviesList = new MoviesList; // First i make an empty moviesList
    moviesList = MoviesStorage.data.movies; // Add all the movies to the list (by the service MoviesStorage).

    $scope.movies = moviesList.movies; // movies -> MoviesList.movies
    $scope.select = MoviesStorage.data.select.id; // Loads from localStorage the last remembered index
    $scope.selectedMovie = $scope.movies[$scope.select]; // Select the last index.
    $scope.noMovies = ($scope.movies.length == 0); // In case there are not films.
    if ($scope.movies.length > 0)
        $scope.menuOption = "Edit movie: ";
    else
        $scope.menuOption = "No movies ";

    let noMovie = new MoviesList; // A visual trick: if there´s not Movies, show an empty movie!!
    noMovie.addMovie("", "", ""); // This movie doesn't exist in the movies list, it's just a trick to the visual interface.

    MoviesStorage.data.movies = moviesList.movies; // Live data storage.

    /* $scope.isEmpty (string, optionalString)
     * Given an string, if it's empty, this function returns '-' char. You can also give an optional
     * string to add to returned char. */
    $scope.isEmpty = function (string, optString="") { // if the string is empty return a '-' char
        if (string == "" || string == undefined)
            return "-";
        else
            return (string + optString);
    };

    /* $scope.set(index)
     * All the actions required every time a new movie it's selected in the movies list.*/
    $scope.set = function (index) { // when a new film in the list it's selected
        if (index < 0)
            if ($scope.movies.length == 0) {
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

    /* newMovie()
     * Add a new movie to the movies list */
    let newMovie = function () { //NEW MOVIE
        moviesList.addMovie("", "", "");
        $scope.set($scope.movies.length - 1);
    };

    /* deleteMovie(movieIndex)
     * Delete the given movie from the movies list */
    let deleteMovie = function (movieIndex) { //DELETE MOVIE
        moviesList.deleteMovie(movieIndex);
        $scope.set($scope.select - 1); // Select another film
    };


    /* $scope.newActor ()
     * Add a new actor to the cast list */
    $scope.newActor = function (){
        $scope.selectedMovie.addActor("","","");
        setTimeout(function() {
            gotoNewActor();
        });
    };

    /* $scope.deleteActor (indexActor)
     * Delete the given actor from the cast list */
    $scope.deleteActor = function (indexActor){
        $scope.selectedMovie.deleteActor(indexActor);
    };

    /* $scope.isOdd (index)
     * I know that i can make this effect with CSS, but i was trying some options of AngularJS */
    $scope.isOdd = function (index){
        return !((index % 2) == 1);
    };

    /* gotoEdit()
     * When you open the edit view, this function scrolls down to the new view. It's useful in phones. */
    let gotoEdit = function () {
        if ($state.current.name == 'moviesList'){
            $state.go('.edit');
        }
        setTimeout(function(){
            document.getElementById('edit').scrollIntoView();
            document.getElementById("in1").focus();
        }, 1);
    };

    /* gotoNewActor()
     * When you add a new actor, this function jump to the new actor edit form. It's useful in phones. */
    let gotoNewActor = function () {
        let actors = document.getElementsByClassName('actorEdit');
        actors[actors.length - 1].scrollIntoView();
    };

    /* $scope.buttonsHandler
     * Buttons: New, Edit and Delete */
    $scope.buttonsHandler = function (indexBtn) { // Button handler - 0 -> (Add button) 1 -> Delete button
        if (indexBtn == 0) {
            newMovie();
            $scope.menuOption = "New movie: ";
            gotoEdit();
        }
        else {
            if (indexBtn == 1) {
                if (confirm("Are you sure you want to delete ''" + $scope.selectedMovie.title + "'' ? It would be irreversible."))
                    deleteMovie($scope.select);
            }
            else {
                $scope.menuOption = "Edit movie: ";
                gotoEdit();
            }
        }
    };

}]);