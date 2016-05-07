'use strict';

let moviesStorageSvc = angular.module('moviesStorageSvc', []);

/* This services connect the data between 'locaStorageController' and 'moviesController' making possible
 * loading and saving movies list data */
moviesStorageSvc.service('MoviesStorage', function() {
    this.data = {};
    this.data.movies = [];
    
    this.data.select = {};
    this.data.select.id = 0;
 }) ;