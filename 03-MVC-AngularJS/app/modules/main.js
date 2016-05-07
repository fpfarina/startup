'use strict';

let myApp = angular.module('myApp', ['ui.router',
                                     'ngStorage',
                                     'moviesListFctr',
                                     'moviesStorageSvc', 
                                     'localStorageCtrl', 
                                     'moviesCtrl'
                                    ]);

/* Config: 'ui.router'
 * The config of the app's views */
myApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/moviesList");

    $stateProvider
        .state('moviesList', {
            url: "/moviesList",
            templateUrl: "modules/partials/moviesList.html"
        })

        .state('moviesList.edit', {
            url: "/edit",
            templateUrl: "modules/partials/moviesListEdition.html"
        })
});

/* Controller 'keysController'
 * This controller, adds some keyboard functions to the app. When you press ESC, if you have the focus over some 
 * input element, it will close the Edit View. When you press ENTER or the GO button in your phone, it will focus
  * the next input element. */

myApp.controller('keysController', ['$scope', '$state', function ($scope, $state){

    $scope.keyPress = function (key) {
        if (key.keyCode == 27) { //ESC -> close the edit view
            if ($state.current == 'moviesList.edit')
                $state.go('moviesList');
        }
        else if (key.keyCode == 13) { //ENTER -> focus the nex input
            event.preventDefault();
            let focusElement = document.activeElement;
            let inputs = document.getElementsByTagName('input');
            let indexInputs = 0;
            for (indexInputs; indexInputs < inputs.length; indexInputs++) {
                if (inputs[indexInputs] == focusElement){
                    if (indexInputs != inputs.length - 1)
                        inputs[indexInputs + 1].focus();
                    else
                        inputs[0].focus();
                }
            }
        }
    }
}]);