'use strict';

let myApp = angular.module('myApp', ['ui.router',
                                     'ngStorage',
                                     'moviesListFctr',
                                     'moviesStorageSvc', 
                                     'localStorageCtrl', 
                                     'moviesCtrl'
                                    ]);

myApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/moviesList");

    $stateProvider
        .state('moviesList', {
            url: "/moviesList",
            templateUrl: "../modules/partials/moviesList.html"

        })
});