'use strict';

var app = angular.module('app', ['ui.router']);

/********************************************************************
 *  Useful App Methods:                                             *
 *  A collection of new methods that I used in this application     *
 ********************************************************************/
app.service('usefulAppMethods',function(){

    /* TYPE OF
     * Local method
     * The typeof java script method, with the difference that if the object it's an array
     * it will return 'array' and not 'object'.
     */
    var typeOf = function (variable) {
        var string = typeof(variable);
        if  (Array.isArray(variable))
            string = 'array';
        console.log(string);
        return string
    };

    /*  SET (SIMPLE) OBJECT VALUES:
     *  Public method
     *  (Expect 2 objects) Set all the properties values in the first object equal
     *  to the values given in the second object.
     */
    this.setObjectValues = function(object, newValues){
        if (object != null)
            for (var property in newValues) {
                if (newValues.hasOwnProperty(property))
                    if (object.hasOwnProperty(property))
                        object[property] = newValues[property];
            }
        return object;
    };



    /*  SET COMPLEX OBJECT VALUES:
     *  (Expect 2 objects) Set all the properties values in the first object to
     *  the values given in the second object. This method, only changes values,
     *  not the structure of an object. It also, can changes nested object properties.
     *  NOTE1: 'null' value and 'undefined' type are thought like a simple value.
     *      examples: * {a : null}, {a: "newValue"} -> {a : "newValue"}
     *                * {a : undefined}, {a: "newValue"} -> {a : "newValue"}
     *                * {a : "value"}, {a: null} -> {a : null}
     *
     */
    this.setComplexObjectValues = function(object, newValues) {
        if (object != null) {
            for (var property in newValues) {
                if (newValues.hasOwnProperty(property))
                    if (object.hasOwnProperty(property))
                        if (typeOf(object[property]) == typeOf(newValues[property])) // Equal TYPES?
                            if (typeOf(object[property]) == 'object' && object[property] != null && object[property] != null) // Is it an object?
                                this.setObjectValues(object[property], newValues[property]);
                            else // Single property
                                object[property] = newValues[property];
                        else // No equal types!
                            if ((typeOf(object[property]) != 'object' || object[property] == null)
                                && (typeOf(newValues[property]) != 'object' || newValues[property] == null)) //Is it not an object? (null it is not an object for this function
                                object[property] = newValues[property];
            }
        }
        return object;
    };

    /* Generate a random string // Security use */
    this.randomStringGenerator = function (length) {
        var alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var randomString = "";
        for (var indexString = 0; indexString < length; indexString++) {
            randomString += alphabet[Math.floor(Math.random() * alphabet.length)];
        }
        return randomString;
    };

    /* Expect an object, return a string with the  parameter in the query way and encoded */
    this.makeQueryParameters = function (object) {
        var parameterArray = [];
        var string = "";

        for (var parameter in object)
            if (object.hasOwnProperty(parameter))
                parameterArray.push(parameter + "=" + encodeURIComponent(object[parameter]));

        string += parameterArray.join("&");
        return string;
    };


    /* Return an object with the query parameters in the absolute Url */
    this.readUrlParameters = function (checkUrl) {
        var queryParameters = {
            error: "No Query"
        };
        var firstSplit = checkUrl.split('/');
        var popString;
        while (firstSplit.length > 0) {
            popString = firstSplit.pop();
            if (popString.includes('=')){
                popString = popString.replace('?', '');
                popString = popString.replace('#', '');
                console.log("porpString = " + popString);
                var queryParameters = {};
                var thisParameter;
                if (popString.includes('&')) {
                    console.log("includes &");
                    var queryParametersArray = popString.split("&");
                    console.log(queryParametersArray);
                    while (queryParametersArray.length > 0) {
                        thisParameter = queryParametersArray.pop().split("=");
                        queryParameters[thisParameter[0]] = thisParameter[1];
                    }
                } else {
                    thisParameter = popString.split("=");
                    queryParameters[thisParameter[0]] = thisParameter[1];
                }
                break;
            }
            else {
            }
        }
        console.log(queryParameters);
        return queryParameters;
    };


});

app.service('apiCaller', ['$http', 'usefulAppMethods', function ($http, usefulAppMethods) {

    /*************************************************************
     *  API CALL:                                                *
     *  One time you have login -> the session starts!           *
     *************************************************************/

    /*** SPOOTIFY - IMPLICIT GRANT FLOW ***
     * -> client_id (Required) Client ID of the app.
     * -> response_type (Required) Set it to "token".
     * -> redirect_uri (Required) The URL to redirect, if the user grants o denies permission.
     * -> state (Optional) For correlating request and responses. Random string.
     * -> scope (Optional) A space-separated list of scopes:
     *          -> playlist-read-private (Access private playlists)
     *          -> playlist-read-collaborative (Access collaborative playlists)
     *          -> playlist-modify-public (Write access to public playlists)
     *          -> playlist-modify-private (Write access to a user's private playlists)
     *          -> streaming (Only for premium account - play music)
     *          -> user-follow-modify (Manage who you are following)
     *          -> user-follow-read (Access your follower and who you are following)
     *          -> user-library-read (Access your saved tracks and albums)
     *          -> user-library-modify (Manage your saved tracks and albums)
     *          -> user-read-private (Access your subscription details)
     *          -> user-read-birthdate (User birthdate)
     *          -> user-read-email (User email)
     *          -> user-top-read (Read your top artists and tracks)
     * -> show_dialog (Optional) Whether or not to force the user to approve the app again.
     */
    
    
    var client_secret = '9a6c7b322f414aa7b9da2be99bd0e4cf';
    var client_id = '6101f0978a6b4d128ae91c881cb86bcf';
    var token = null;

    var configAuthentication = {
        client_id: client_id, // My App Client ID
        response_type: 'token',
        redirect_uri: 'http://localhost:8080/#/session', // Redirect app
        scope: 'user-read-private user-read-email',
        state: usefulAppMethods.randomStringGenerator(5),
        show_dialog: true
    };

    var connection = {
        grant_type: 'authorization_code',
        token: token,
        redirect_uri: 'http://localhost:8080/#/authenticated',
        client_id: client_id,
        client_secret: client_secret
    };

    var authenticationUrl = 'https://accounts.spotify.com/authorize?';

    this.login = function(){
        return authenticationUrl + usefulAppMethods.makeQueryParameters(configAuthentication);
    };
/*
    this.apiConnection = makeQueryParameters(connection, "");
    this.urlAuthenticate = makeQueryParameters(configAuthentication, 'https://accounts.spotify.com/authorize?');
*/
    var method = "";
    var url = "";
    var data = "";
    var headers = "";

    this.fetch = function() {

        $http({method: method, url: url, data:data, headers:headers}).
        then(function(response) {

            console.log ("OK");
            console.log (response);

        }, function(response) {
            console.log ("NO");
            console.log (response.status);
        });
    };

    this.config = function(newMethod, newUrl, newData, newHeaders ) {
        method = newMethod;
        url = newUrl;
        data = newData;
        headers = newHeaders;
    };




}]);

/*************************************************************
 *  USER SESSION:                                            *
 *  One time you have login -> the session starts!           *
 *************************************************************/
app.service('sessionService', ['usefulAppMethods', function(usefulAppMethods) {

    //Login DATA

    var login = {};

    this.access_token = null;
    this.token_type = null;
    this.refresh_token = null;
    this.session = null;
    this.display_name = null;
    this.email = null;
    this.id = null;
    this.profilePic = null;

    this.get = function(){
        return session.get();
    };

    this.post = function(){
        return session.post();
    };

    this.setSession = function(newSession){
        this.session = newSession;
        usefulAppMethods.setObjectValues(this,newSession);
    };

    /*// USER DATA:
    var userName = "USER_NAME";
    var userId = "USER_ID";

    // GET METHODS
    this.getLogin = function(){
        return login;
    };
    this.getSession = function(){
        return session;
    };
    this.getToken = function(){
        return token;
    };
    this.getToken = function(){
        return token;
    };
    this.getUserName = function(){
        return userName;
    };
    this.getUserId = function(){
        return userId;
    };

    // SET TOKENS
    this.setLogin = function(newLogin){
        return login = usefulAppMethods.setObjectValues(login,newLogin);
    };

    this.setSession = function(newSession){
        session = newSession;
        return session;
    };
    this.setToken = function(newToken){
        token = newToken;
        return token;
    };
    this.setUserName = function(newUserName){
        userName = newUserName;
        return userName;
    };
    this.setUserId = function(newUserId){
        userId = newUserId;
        return userId;
    };

    this.session = null;

    var get = function(){
        return session.get();
    };

    var post = function(){
        return session.post();
    };
*/

}]);


/*********************************************************
 *  UI ROUTER CONFIG:                                    *
 *  Site map                                             *
 *********************************************************/
app.config(['$stateProvider', '$locationProvider','$urlRouterProvider',function($stateProvider, $locationProvider, $urlRouterProvider) {

    $urlRouterProvider.deferIntercept(); //Only for debug ->  then i must delete it.
    $urlRouterProvider.otherwise('login');

    $stateProvider
        .state('login', {
            url:  "/login",
            templateUrl: "modules/partials/login.html"
        })
/*
        .state('session', {
            url: "/session",
            params: {
                access_token: null,
                error: null,
                state: null,
                token_type: null,
                expires_in: null
            },
            templateUrl: "modules/partials/session.html"
        });
*/
/*
        .state('session', {
            onEnter: function(){
                if($stateParams == $stateParams){
                    alert(success);
                }
            },
            url: '*session',
            templateUrl: "modules/partials/session.html"
        });
  */
        .state('session2', {
            url: '/{error}&access_token&token_type&state',
            //url: '/{session}{page:(?:/[^/]+)?}',
            templateUrl: "modules/partials/session.html"
        })

        .state('session', {
            url: '/{session}?{error}&access_token&token_type&state',
/*            onEnter: function(){
            },*/
            //url: '/{session}{page:(?:/[^/]+)?}',
            templateUrl: "modules/partials/session.html"
        });

}]);


/*THIS MODULE IT'S ONLY FOR DEVELOPMENT -> I MUST DELETE */
app.run(['$rootScope', '$urlRouter', '$location', '$state', function ($rootScope, $urlRouter, $location, $state) {
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

app.controller('mainController',['$scope', 'sessionService', 'usefulAppMethods', 'apiCaller', '$stateParams',
    '$location', '$state', function($scope, sessionService, usefulAppMethods, apiCaller, $stateParams, $location, $state){

    // INIT!!

    // 1- CHECK LOCAL SESSION STORAGE */
    // do do do do do do do!!!
    
    // 2- CHECK SESSION STATE */
    //if (sessionService.getLogin.state == false && sessionService.getLogin.error == false) //This means, that you never try to connect!!
        
    // 3- Charging data in scopes for DOM action... //
    //$scope.userName = sessionService.getUserName();
    //$scope.token = sessionService.getToken(); //No really needed -> The user don't have to look this.
    //$scope.login = sessionService.getLogin();
    //$scope.session = sessionService.getSession();

 //       var loginOk;

   var user = sessionService; //sessionService it's a singleton.

    /* ERROR MODULES */
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
        showError(err);
    };

    $scope.hide = function () {
      $scope.error = false;
    };
    /* */

    /* LOGIN MODULE */
    $scope.login = function () {
        console.log(user);
        OAuth.initialize('oQT0QgdjsWoR3Kry0baWoEuokq0');
        OAuth.popup('spotify')
            .done(function (result) {
                user.setSession(result);
                user.get('https://api.spotify.com/v1/me')
                    .done(function (res) {
                        user.profilePic =  res.images[0].url;
                        user.setSession(res);
                        $scope.$apply($scope.loadScopeData());
                        $state.go('session');
                    })
                    // result.get('https://api.spotify.com/v1/users/' + user_id)
                    .fail(standardError);
        
                })
            .fail(standardError);
   };

    $scope.loadScopeData = function() {
      $scope.display_name = user.display_name.toUpperCase();
    };

     /* I started to use oauth.io service, so now i don't need to make this login.
        apiCaller.login();
    console.log($scope.login);
    */

    //debug button    
    $scope.debug = function () {
        $scope.showDebug = !($scope.showDebug);
        console.log($scope.error);
        console.log(user);
        /*    loginOk.get('https://api.spotify.com/v1/me')
                .done(function (res) {
                    console.log(res);
                    $scope.userImage = res.images[0].url;
                    console.log($scope.userImage);
                })
               // result.get('https://api.spotify.com/v1/users/' + user_id)
                .fail(function (err) {
                console.log(err);
                 });*/
    };


    /* I started to use oauth.io service, so now i don't need to make this login.
    //Checking URL

     var loginResult = usefulAppMethods.readUrlParameters($location.$$absUrl);
        console.log(loginResult);
    if (loginResult.error != ""){
        console.log(loginResult);
        $scope.errorShow = true;
        $scope.errorMessage = loginResult.error;
    }
     $location.$$absUrl = "http://localhost:8080/#/session"; // this is tricky, just to hide the very long URL
    */


}]);

app.controller('storageController', ['$scope', '$localStorage', 'localStorage', function($scope, $localStorage, localStorage){

    console.log("HELP");
    $scope.storage = $localStorage.$default(InitStorage);
    console.log($scope.storage);

    localStorage.data = $scope.storage.data;

    $scope.storage.data.token = localStorage.data.token;
    $scope.storage.data.appState = localStorage.data.appState;
    console.log (localStorage.data.appState.index);

}]);