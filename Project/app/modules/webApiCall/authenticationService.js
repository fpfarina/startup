'use strict';

var authenticationService = angular.module('authenticationService', []);

authenticationService.service('$authentication', ['$http', function ($http){

    /* ***************************************************************************************************
     * ***************************************************************************************************
     * 
     *  AUTHENTICATION SERVICE - This service manages Spootify authentication, in order to access and make
     *  changes in user data.
     *  
     * ***************************************************************************************************
     * **************************************************************************************************/

    /*** SPOOTIFY - REQUEST AUTHORIZATION PARAMETERS ***
     * -> client_id (Required) Client ID of the app.
     * -> response_type (Required) Set it to "code".
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
    var client_id = '6101f0978a6b4d128ae91c881cb86bcf'
    // My Client Secret ID

    /* Generate a random string // Security use */
    var randomStringGenerator = function (length) {
        var alphabet= "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var randomString = "";
        for (var indexString = 0; indexString < length; indexString++){
            randomString += alphabet[Math.floor(Math.random() * alphabet.length)];
        }
        return randomString;
    };

    /* Config authentication object */
    var configAuthentication = {
        client_id : client_id, // My App Client ID
        response_type : 'code',
        redirect_uri : 'http://localhost:8080/#/authenticated', // Redirect app
        scope : 'user-read-private user-read-email',
        state : randomStringGenerator (60),
        show_dialog : true
    };


    var authorizationCode = null;

    this.setAuthorizationCode = function (newCode) {
        authorizationCode = newCode;
        conection.code = newCode;
        this.apiConnection  = makeQueryParameters(conection, "");
    };


    var conection = {
        grant_type: 'authorization_code',
        code: authorizationCode,
        redirect_uri: 'http://localhost:8080/#/authenticated',
        client_id: client_id,
        client_secret: client_secret
    };

    var makeQueryParameters = function (configAuthentication , href) {
        var parameterArray = [];

        for (var parameter in configAuthentication)
            if (configAuthentication.hasOwnProperty(parameter))
                parameterArray.push(parameter + "=" + encodeURIComponent(configAuthentication[parameter]));

        href += parameterArray.join("&");
        return href;
    };

    this.apiConnection  = makeQueryParameters(conection, "");
    this.urlAuthenticate = makeQueryParameters(configAuthentication, 'https://accounts.spotify.com/authorize?');

    
    /* Return an object with the query parameters in the absolute Url */
    this.readUrlParameters = function (checkUrl) {
        var queryParameters = {code:null, state:null, error:null};

        if (checkUrl.includes('?')) {
            if (checkUrl.includes('&')) {
            checkUrl = checkUrl.slice(checkUrl.indexOf('?')+1);
            checkUrl = checkUrl.slice(0,checkUrl.indexOf('#'));
            var queryParametersArray = checkUrl.split("&");
            queryParametersArray[0] = queryParametersArray[0].split("=");
            queryParametersArray[1] = queryParametersArray[1].split("=");
            queryParameters[queryParametersArray[0][0]] = queryParametersArray[0][1];
            queryParameters[queryParametersArray[1][0]] = queryParametersArray[1][1];
            } else
                queryParameters.error = "bad_query";
        }
        else
            queryParameters.error = "not_query";
        return queryParameters;
    };


    /* FETCH */
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