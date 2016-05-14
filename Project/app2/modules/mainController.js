'use strict';

var app = angular.module('app', ['ui.router', 'localStorageController', 'userSessionService', 'usefulMethodsService']);

/*********************************************************
 *  UI ROUTER CONFIG:                                    *
 *  Site map                                             *
 *********************************************************/
app.config(['$stateProvider', '$locationProvider','$urlRouterProvider',function($stateProvider, $locationProvider, $urlRouterProvider) {

   // $urlRouterProvider.deferIntercept(); //Only for debug ->  then i must delete it.
    $urlRouterProvider.otherwise('login');

    $stateProvider
        .state('login', {
            url:  "/login",
            templateUrl: "modules/partials/login.html"
        })

        .state('session', {
            url: "/session",
            templateUrl: "modules/partials/session.html"
        })

        .state('session.welcome', {
            url: "/welcome",
            templateUrl: "modules/partials/session/welcome.html"
        })

        .state('session.welcomeback', {
            url: "/welcomeback",
            templateUrl: "modules/partials/session/welcomeback.html"
        })

        .state('session.search', {
            url: "/search",
            templateUrl: "modules/partials/session/search.html"
        });

}]);


/*THIS MODULE IT'S ONLY FOR DEVELOPMENT -> I MUST DELETE */
app.run(['$rootScope', '$urlRouter', '$location', '$state', 'sessionService', function ($rootScope, $urlRouter, $location, $state, sessionService) {
    $rootScope.$on('$locationChangeSuccess', function(e, newUrl, oldUrl) {
        $rootScope.$on("$stateChangeError", console.log.bind(console));
        // Prevent $urlRouter's default handler from firing
        e.preventDefault();

        var where = function (url){
            var body;
            var head;
            if (url.includes('#')){
                head = url.slice(url.indexOf('#')+2);
                body = url.slice(0, url.indexOf('#')+2);
            }
            else {
                head = 'login';
                body = url + '#/';
            }
            return {head : head, body: body}
        };



        var checking = function (itself, timeOut=0) {
            if (itself.checkingSession == true && timeOut < 1000) {
                console.log(timeOut);
                setTimeout(
                    function(){
                        checking(itself, timeOut+1);
                        console.log(".");
                    },1);
            } else
            {   if (timeOut == 1000) {
                    itself.checkStatus = 500;
                    itself.checkStatusMessage = 'Time Out. Not answer.';
                 }
                itself.checkingSession = false;
                if (sessionService.logged == true && sessionService.firstTime()){ /* HERE I CHECK IF THE USER IT'S LOGGED OR NOT, and then i make a redirection */
                    if (where(newUrl).head == 'login' || where(newUrl).head == '' ){
                        console.log('1 -> LOGIN:');
                        console.log(where(newUrl));
                        console.log(newUrl);
                        $location.path('session/welcomeback');
                       // newUrl = 'session/welcome';
                    } else{
                    console.log('2 -> NO LOGIN:');
                    console.log(where(newUrl));}
                }
                else {
                    if (sessionService.logged != true){
                    $location.path('login');
                    //newUrl = 'login';
                    console.log('3 (no login) -> LOGIN:');
                    console.log(where(newUrl));
                    console.log(newUrl);
                    } else {
                    console.log('4 (no login) -> KILL:');
                    console.log(where(newUrl));
                    console.log(newUrl);}
                }

                setTimeout(function(object){
                    $urlRouter.sync();
                }($urlRouter),1);
            }
        };

        console.log('checking');
        checking(sessionService);

    });
    $urlRouter.listen();
}]);

app.controller('mainController',['$scope', 'sessionService', 'usefulAppMethods',
    '$location', '$state', function($scope, sessionService, usefulAppMethods, $location, $state){

    var showError = function(err){
        var error = String(err);
        if (error = 'The popup was closed')
            error += '. Please, try to login again.';
        $scope.$apply(function(){
            $scope.error = true;
            $scope.errorMessage = error;
        });
    };

    var standardError = function (err){
        var error = String(err);
        if (error = 'Unauthorized')
            error = "The session has expired. Please login again.";
        $scope.$apply(function(){
            $scope.error = true;
            $scope.errorMessage = error;
        });
    };

    $scope.hide = function () {
      $scope.error = false;
    };
    /* */

    /* LOGIN MODULE */
    $scope.login = function () {
        OAuth.initialize('oQT0QgdjsWoR3Kry0baWoEuokq0');
        OAuth.popup('spotify')
            .done(function (result) {
                console.log(sessionService);
                sessionService.setSession(result);
                sessionService.get('https://api.spotify.com/v1/me')
                    .done(function (res) {
                        sessionService.profile_pic =  res.images[0].url;
                        sessionService.setSession(res);
                        $scope.$apply($scope.loadScopeData());
                        sessionService.logged = true;
                        sessionService.cleanCache();
                        $state.go('session.welcome');

                    })
                    .fail(showError);
                })
            .fail(showError);
   };

    $scope.loadScopeData = function() {
            $scope.display_name = sessionService.display_name.toUpperCase();
     };

    $scope.$on('$locationChangeSuccess', function(event) {
        console.log("ON");
        if (!sessionService.logOut){
            setTimeout(
                function () {
                    if (sessionService.checkStatus > 300) {
                        standardError(sessionService.checkStatusMessage);
                        sessionService.cleanCache();
                    }
                    if (!sessionService.firstTime())
                        $scope.loadScopeData();
                },1);
        }
        else {
                sessionService.logOut = false;
        }
    });


    //debug button
    $scope.debug = function () {
        $scope.showDebug = !($scope.showDebug);
        console.log($scope.error);
        console.log(sessionService);
    };

    $scope.logOut = function (){
            sessionService.reset();
            sessionService.logOut = true;
            $state.go('login');
    };


}]);

app.controller('searchController',['$scope', 'sessionService', 'usefulAppMethods',
    function($scope, sessionService, usefulAppMethods){

    var wait = false;

    $scope.search = function () {
        if (wait = false) {
            sessionService.search($scope.string);
            wait = true;
            setTimeout(function () {
                wait = true;
                sessionService.search($scope.string);
            },500);
        }
    };

      $scope.show = sessionService.search_results.response.data.tracks.items[0];

}]);