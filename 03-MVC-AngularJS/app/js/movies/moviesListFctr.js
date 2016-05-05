'use strict';

let moviesListFctr = angular.module('moviesListFctr', ['movieFctr']);

/* Factory of MoviesList */
moviesListFctr.factory('MoviesList', ['Movie', function(Movie) {

    return function() {
        this.movies = [];
        this.length = 0;

        this.addMovie = function(title, year, duration) {
            let movie = new Movie(title,year,duration);
            this.movies.push(movie);
            this.length += 1;
        };

        this.deleteMovie = function(index){
            this.movies.splice(index,1);
            this.length -= 1;
        };

        this.addMoviesJson = function (json) {
            let indexMovies;
            let title = "";
            let year = "";
            let duration = "";
            let cast;
            for (indexMovies = 0; indexMovies <  json.length; indexMovies++) {
                title = json[indexMovies].title;
                year = json[indexMovies].year;
                duration = json[indexMovies].duration;
                cast = json[indexMovies].cast;
                this.addMovie(title, year, duration);
                this.movies[this.length - 1].addCastJson(cast);
            }
        };

        this.json = function () {
            let json = [];
            let indexMovies;
            for (indexMovies = 0; indexMovies < this.length; indexMovies++) {
                json.push(this.movies[indexMovies].json());
            }
            return json;
        }
    }
}]);