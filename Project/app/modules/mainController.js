'use strict';

var mainController = angular.module('mainController', ['spootifyController', 'ui.router', 'localStorageController', 'localStorageService']);

/* Config: 'ui.router'
 * The config of the app's views */
mainController.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.deferIntercept();

  //  $urlRouterProvider.otherwise("/index");

    $stateProvider
        .state('index', {
            url:  "/index",
            templateUrl: "modules/partials/login.html"
        })
        .state('authenticated', {
            url: "/authenticated",
            templateUrl: "modules/partials/authenticated.html"
        });


}]);

mainController.run(['$rootScope', '$urlRouter', '$location', '$state', function ($rootScope, $urlRouter, $location, $state) {
    $rootScope.$on('$locationChangeSuccess', function(e, newUrl, oldUrl) {

        $rootScope.$on("$stateChangeError", console.log.bind(console));
        // Prevent $urlRouter's default handler from firing
        e.preventDefault();

        /**
         * provide conditions on when to
         * sync change in $location.path() with state reload.
         * I use $location and $state as examples, but
         * You can do any logic
         * before syncing OR stop syncing all together.
         */

        if ($state.current.name !== 'main.exampleState' || newUrl === 'http://some.url' || oldUrl !=='https://another.url') {
            // your stuff
            $urlRouter.sync();
        } else {
            // don't sync
        }
    });
    // Configures $urlRouter's listener *after* your custom listener
    $urlRouter.listen();
}]);

mainController.controller('myApp',['$scope', 'localStorage', function($scope, localStorage){
    
   

}]);