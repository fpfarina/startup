'use strict';

/*************************************************************
 *  USER SESSION:                                            *
 *  One time you have login -> the session starts!           *
 *************************************************************/

var svc = angular.module('userSessionService', ['ui.router', 'localStorageController','classesFactory']);
svc.service('sessionService', ['usefulAppMethods', '$http', 'List', function(usefulAppMethods, $http, List) {

    this.notFirsTime = false;
    this.logged = false;
    this.session = null;
    this.checkingSession = false;
    this.checkStatus = 0;
    this.checkStatusMessage = "";
    
    this.access_token = "";
    this.token_type = "";
    this.refresh_token = "";
    
    this.display_name = "";
    this.email = "";
    this.id = "";
    this.profile_pic = "";
    

    this.logOut = false;
    
    this.search_results = {
        response : null,
        error : false
    };

    this.myPlayList = new List('myPlayList');

    var spotifyUrl = {
        me: 'https://api.spotify.com/v1/me',
        root: 'https://api.spotify.com/v1/',
        users: 'https://api.spotify.com/v1/users/',
        search: 'https://api.spotify.com/v1/search?q='
    };

   // function (scope, data)

    var filterArtists = function (artists) {
        var index = 0;
        var tempArray = [];
        for (index; index < artists.length; index++)
            tempArray.push(artists[index].name);
        return tempArray;
    };

    this.filterData = function (scope, data){
        if (data.status == 200){
            console.log('enter filter');
            var tracks = data.data.tracks.items;
            var temporalList = new List('response');
            var index = 0;
            for (index; index < tracks.length; index++){
                var id = tracks[index].id;
                var name = tracks[index].name;
                var albumName = tracks[index].album.name;
                var trackNumber = tracks[index].track_number;
                var duration = tracks[index].duration_ms;
                var imageUrl = tracks[index].album.images[0].url[0];
                var previewUrl = tracks[index].preview_url;
                var artists = filterArtists(tracks[index].artists);
                console.log(id,name,albumName, trackNumber, duration, imageUrl, previewUrl,artists);
                temporalList.addTrack(id,name,albumName, trackNumber, duration, imageUrl, previewUrl,artists);
            }
            scope.data.list = temporalList;
            scope.data.total = data.data.tracks.total;
            scope.data.next = data.data.tracks.next;
            scope.data.previous = data.data.tracks.previous;
            scope.data.limit = data.data.tracks.limit;

        }
        scope.status = data.status;
        console.log('DATA:');
        console.log(scope);
    };

    this.search = function (string, scope){
        console.log('SERARCH  - >');
        console.log(this);
        this.get(
            spotifyUrl.search + encodeURI(string) + '&type=track',
            function(object, scope){
                return function(response){
                    console.log ('SUCCESS CONNECT', scope, response);
                    object.filterData(scope, response);

                }
            }(this, scope),
            function(object, scope){
                return function(response){
                    console.log ('ERROR');
                    console.log (response.error);

                    //CHECK THIS:!!!
                    //object.checkingSession = false;
                    //$state.go($state.current);
                }
            }(this, scope)
        )
    };

    this.changePage = function (url, scope, next){
        console.log('changing ->');
        console.log(List);
        console.log('changing->', url, scope);
        this.get(
            url,
            function(object, scope, next){
                return function(response) {
                    if (response.status == 200) {
                        if (next)
                            scope.data.page++;
                        else
                            scope.data.page--;

                        var tempTotal = scope.data.total;
                        object.filterData(scope, response);
                        scope.data.total = tempTotal;

                        console.log('SUCCESS CONNECT', response);
                        console.log(response);
                    }
                    else {
                        console.log('STH GOES WRONG', response)
                    }
                }
            }(this, scope, next),
            function(object, scope){
                return function(response){
                    console.log ('ERROR');
                    console.log (response.error);

                    //object.filterData(scope, response);

                    //CHECK THIS:!!!
                    //object.checkingSession = false;
                    //$state.go($state.current);
                }
            }(this, scope, next)
        )
    };

    this.get = function(url, done, fail){
        console.log ('GETTTTTTTTTT');
        console.log('LOGGED -> ', this.logged);
        if (this.logged) {
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
        usefulAppMethods.setValor(this,newSession);
    };


    this.reset = function () {
        //internalReset(this);
        var resetObject =  {
            logged : false,
            logOut: false,
            notFirstTime: false,
            checkingSession : false,
            checkStatus: 0,
            checkStatusMessage : "",
            access_token : null,
            token_type : null,
            refresh_token : null,
            session : null,
            display_name : "",
            email : "",
            id : "",
            profile_pic : "",
            search_results : {
                response : null,
                error : false
            }
        };
        this.setSession(resetObject)
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