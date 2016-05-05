'use strict';

let moviesStorageSvc = angular.module('moviesStorageSvc', []);

moviesStorageSvc.service('MoviesStorage', function() {
    this.data = {};
    this.data.movies = [];
    
    this.data.select = {};
    this.data.select.id = 0;
 }) ;