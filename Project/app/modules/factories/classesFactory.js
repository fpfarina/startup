'use strict';

var classFactory = angular.module('classesFactory', []);

/* Factory of tracks */
classFactory.factory('Track', [function(){
    return function(id, name, album_name, track_number, duration_ms, image_url, preview_url, artist) {

        this.id = id;
        this.name = name;
        this.albumName = album_name;
        this.trackNumber = track_number;
        this.duration = duration_ms;
        this.imageUrl = image_url;
        this.previewUrl = preview_url;
        this.artists = artist;
    }
}]);

/* Factory of tracks List */
classFactory.factory('List', ['Track', function(Track){
    return function(name, id, isPublic, ownerId) {
        this.tracks = [];
        this.name = name;
        this.id = id;
        this.public = isPublic;
        this.ownerId = ownerId;

        
        this.addTrack = function(id, name, album_name, image_url, track_number, duration_ms, preview_url, artists) {
            var track = new Track(id, name, album_name, image_url, track_number, duration_ms, preview_url, artists);
            this.tracks.push(track);
        };
 
        this.deleteTrack = function(index){
            this.tracks.splice(index,1);
        };

        
    }
}]);

/* Factory of playlist */
classFactory.factory('ListCollection', ['List', function(List){
    return function(userId) {
        this.lists = [];
        this.userId = userId;

        
        this.addList = function(list){
          this.lists.push(list);  
        };

        this.newList = function(name, id, isPublic, ownerId) {
            var list = new List(name, id, isPublic, ownerId);
            this.addList(list);
        };

        this.deleteList = function(index){
            this.tracks.splice(index,1);
        };


    }
}]);