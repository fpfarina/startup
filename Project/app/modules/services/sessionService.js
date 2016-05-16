'use strict';

/*************************************************************
 *  USER SESSION:                                            *
 *  One time you have login -> the session starts!           *
 *************************************************************/

var svc = angular.module('userSessionService', ['ui.router', 'localStorageController','classesFactory']);
svc.service('sessionService', ['usefulAppMethods', '$http', 'List', 'ListCollection', function(usefulAppMethods, $http, List, ListCollection) {

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
        search: 'https://api.spotify.com/v1/search?q=',
        https: 'https://api.spotify.com/v1/users/'
    };

   // function (scope, data)

    var filterArtists = function (artists) {
        var index = 0;
        var tempArray = [];
        for (index; index < artists.length; index++)
            tempArray.push(artists[index].name);
        return tempArray;
    };

    this.filterData = function (scope, data, opt){
        if (data.status == 200){
            console.log('enter filter');
            if (opt == 0) // SEARCH
                var tracks = data.data.tracks.items;
            else // PLAYLIST
                var tracks = data.data.items;
            var temporalList = new List('response');
            var index = 0;
            for (index; index < tracks.length; index++){
                if (opt == 0){
                    var id = tracks[index].id;
                    var name = tracks[index].name;
                    var albumName = tracks[index].album.name;
                    var trackNumber = tracks[index].track_number;
                    var duration = tracks[index].duration_ms;
                    var imageUrl = tracks[index].album.images[2].url;
                    var previewUrl = tracks[index].preview_url;
                    var artists = filterArtists(tracks[index].artists);
                }
                else{
                    var id = tracks[index].track.id;
                    var name = tracks[index].track.name;
                    var albumName = tracks[index].track.album.name;
                    var trackNumber = tracks[index].track.track_number;
                    var duration = tracks[index].track.duration_ms;
                    var imageUrl = tracks[index].track.album.images[2].url;
                    var previewUrl = tracks[index].track.preview_url;
                    var artists = filterArtists(tracks[index].track.artists);
                }
                temporalList.addTrack(id,name,albumName, trackNumber, duration, imageUrl, previewUrl,artists);
            }
            if (opt == 0){
                scope.data.list = temporalList;
                 scope.status = data.status;
            }
            else
                scope.tracks = {};
                scope.tracks = temporalList.tracks;

            if (opt == 0){ // SEARCH
                scope.data.total = data.data.tracks.total;
                scope.data.next = data.data.tracks.next;
                scope.data.previous = data.data.tracks.previous;
                scope.data.limit = data.data.tracks.limit;
            }
            else {
                /*scope.total = data.data.total;
                scope.next = data.data.next;
                scope.previous = data.data.previous;
                scope.limit = data.data.limit;*/
            }

        }
    };

    this.saveTrack = function (id, name){
        var href= 'https://api.spotify.com/v1/users/' + this.id + '/playlists/' + id + '/tracks'
    };


    this.createPlaylist = function (name, tracks) {
        var href = 'https://api.spotify.com/v1/users/' + this.id + '/playlists';
        var data = {'name':name};
        this.post(href, data, function(tracks, object) {
                return function (res) {
                    console.log(res.data.id);
                    console.log(tracks);
                    var body = {"uris": []};
                    var index= 0;
                    href = "https://api.spotify.com/v1/users/" + object.id + "/playlists/" + res.data.id + "/tracks";
                    for (index;index<tracks.length;index++){
                        body.uris.push("spotify:track:" + tracks[index].id)
                    }
                    console.log(body);
                    object.post(href, body, console.log('Local list saved.'), console.log('Error: try again'));
                    //{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh",
                    //"spotify:track:1301WleyT98MSxVHPZCA6M"]}
                    // res.data.id
                }
            }(tracks, this) /*function (res,tracks){
            console.log(res.data.id);
            console.log(tracks);
            // res.data.id

            console.log('Success')
        } */
        , function (res){
            alert('Error: try again')
        }
        );
    };

    this.filterPlayList = function (scope, data, object){
        if (data.status == 200){
            var index = 0;
            var tempListCollection = new ListCollection(object.id);
            var lists = data.data.items;
            for (index; index < lists.length; index++){
                var name = lists[index].name;
                var id = lists[index].id;
                var isPublic = lists[index].public;
                var owner = lists[index].owner.id;
                tempListCollection.newList(name, id, isPublic, owner);

            }
            scope.lists = tempListCollection;
        }

        scope.status = data.status;
    };


    this.getPlayLists = function (scope) {
        console.log('SERARCHING PLAYLIST -- >');
        console.log(this.id);
        this.get(
            spotifyUrl.https + this.id + '/playlists?limit=50',
            function(object, scope){
                return function(response){
                    console.log ('SUCCESS SEARCH PLAYLIST');
                    object.filterPlayList (scope , response, object);
                    var index = 0;
                    for (index; index < scope.lists.lists.length; index++){
                        object.getPlayListsTracks( scope.lists.lists[index].tracks, scope.lists.lists[index].id);
                        console.log( scope.lists.lists[index].tracks.tracks, scope.lists.lists[index].id);
                    }
                }
            }(this, scope),
            function(object, scope){
                return function(response){
                    console.log ('ERROR SEARCH PLAYLIST');
                    scope.status = response.data;
                    console.log(scope);
                }
            }(this, scope)
        )
    };

    this.getPlayListsTracks = function (scope, playId) {
        console.log('SERARCHING PLAYLIST TRACKS -- >');
        console.log(this.id);
        this.get(
            spotifyUrl.https + this.id + '/playlists/' + playId + '/tracks?limit=50',
            function(object, scope){
                return function(response){
                    console.log ('SUCCESS SEARCH PLAYLIST TRACKS');
                    object.filterData(scope, response,1);
                }
            }(this, scope),
            function(object, scope){
                return function(response){
                    console.log ('ERROR SEARCH PLAYLIST');
                    scope.status = response.data;
                    console.log(scope);
                }
            }(this, scope)
        )
    };

    this.search = function (string, scope){
        console.log('SERARCHING TRACK -- >', string);
         this.get(
            spotifyUrl.search + encodeURI(string) + '&type=track',
            function(object, scope){
                return function(response){
                    console.log ('SUCCESS SEARCH TRACK');
                    object.filterData(scope, response,0);
                }
            }(this, scope),
            function(object, scope){
                return function(response){
                    object.filterData(scope, response);
                    console.log ('ERROR SEARCH PLAYLIST' , response.status);
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
        console.log ('GET');
        console.log (url);
        if (this.logged) {
            console.log(url);
            var header = {headers:{ 'Authorization': (this.token_type +' ' + this.access_token )}};
            $http.get(url, header).then (done, fail)
        }
        else
            return "No session."
    };


    this.post = function(url, data, done, fail){
        console.log ('GET');
        console.log (url);
        if (this.logged) {
            console.log(url);
            var header = {headers:{ 'Authorization': (this.token_type +' ' + this.access_token )}};
            $http.post(url, data, header).then (done, fail)
        }
        else
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