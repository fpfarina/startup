'use strict';

var mainController = angular.module('mainController', ['spootifyCallerController', 'ui.router', 'localStorageCtrl', 'localStorageService']);

/* Config: 'ui.router'
 * The config of the app's views */
mainController.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/index");

    $stateProvider
        .state('index', {
            url:  "/index",
            templateUrl: "modules/partials/authenticate.html"
        })
        .state('authenticated', {
            url: "/authenticated",
            templateUrl: "modules/partials/authenticated.html"
        });


});
