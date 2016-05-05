'use strict';

let moviesStorageSvc = angular.module('moviesStorageSvc', []);

moviesStorageSvc.service('MoviesStorage', function() {

    this.movies = [];
    this.selectMovie = 0;

}) ;