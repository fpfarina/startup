'use strict';

/*************************************************************
 *  USER SESSION:                                            *
 *  One time you have login -> the session starts!           *
 *************************************************************/

var svc = angular.module('userSessionService', ['ui.router', 'localStorageController']);
svc.service('sessionService', ['usefulAppMethods', '$http', function(usefulAppMethods, $http) {

    this.logged = false;
    this.access_token = null;
    this.token_type = null;
    this.refresh_token = null;
    this.session = null;
    this.display_name = null;
    this.email = null;
    this.id = null;
    this.profile_pic = null;
    this.checkingSession = false;
    this.checkStatus = 0;
    this.checkStatusMessage = "";
    this.logOut = false;
    this.search_results = {
        response : null,
        error : false
    };

    var spotifyUrl = {
        me: 'https://api.spotify.com/v1/me',
        root: 'https://api.spotify.com/v1/',
        users: 'https://api.spotify.com/v1/users/',
        search: 'https://api.spotify.com/v1/search?q='
    };

    this.search = function (string){
        this.get(
            spotifyUrl.search + encodeURI(string) + '&type=track',
            function(object){
                return function(response){
                    console.log('here');
                    console.log(object);
                    console.log(response);
                    console.log(response.error);
                    object.search_results.response = response;
                    object.search_results.error = false;
                }
            }(this),
            function(object){
                return function(response){
                    console.log(response);
                    console.log(object);
                    console.log(response.error);
                    object.search_results.response = response;
                    object.search_results.error = true;
                }
            }(this)
        )
    };

    this.get = function(url, done, fail){
        if (this.session != null) {
            console.log(url);
            var header = {headers:{ 'Authorization': (this.token_type +' ' + this.access_token )}};
            $http.get(url, header).then (done, fail)
        }
        else
            return "No session."
    };


    this.post = function(){
        if (this.session != null)
            return this.session.post();
        return "No session."
    };

    this.setSession = function(newSession){
        this.session = newSession;
        usefulAppMethods.setObjectValues(this,newSession);
    };
    
    this.reset = function () {
        var string = "";

        for (var property in this) {
            if (this.hasOwnProperty(property)) {
                if (typeof(this[property]) == 'function')
                    break;
                else
                    if (typeof(this[property])=='boolean')
                        this[property] = false;
                    else
                        if (typeof(this[property])=='number')
                            this[property] = 0;
                        else
                            this[property] = null;
            }
        }
    };

    this.ping = function () {

        this.checkingSession = true;
        this.get(spotifyUrl.me,
            function (object) {
                return function(res) {
                    object.checkingSession = false;
                    object.logged = true;
                    object.checkStatus = res.status;
                    object.checkStatusMessage = res.statusText;
                }
            }(this),
            function (object) {
                return function(res) {
                    object.checkingSession = false;
                    object.logged = false;
                    object.checkStatus = res.status;
                    object.checkStatusMessage = res.statusText;
                    console.log(res);
                }
            }(this));

        return false;
        

    };

    this.cleanCache = function() {
        this.checkStatus = 0;
        this.checkStatusMessage = "";
    };

    this.firstTime =function () {
        return (this.token == null);
    } 
    
}]);