'use strict';

let movieFctr = angular.module('movieFctr', ['actorFctr']);

/* Factory of Movie */
movieFctr.factory('Movie', ['Actor', function(Actor) {

    return function(title,year,duration) {
        this.title = title;
        this.year = year;
        this.duration = duration;
        this.cast = [];

        this.addActor = function(name, lastName, age) {
            let actor = new Actor(name,lastName,age);
            this.cast.push(actor);
        };

        this.deleteActor = function(index){
            this.cast.splice(index,1);
        };

        this.addCastJson = function (json) {
            let indexCast = 0;
            let name = "";
            let lastName = "";
            let age = "";
            for (indexCast; indexCast < json.length; indexCast++) {
                name = json[indexCast].name;
                lastName = json[indexCast].lastName;
                age = json[indexCast].age;
                this.addActor(name, lastName, age);
            }
        };

        this.json = function () {
            let indexCast;
            let cast = [];

            for (indexCast = 0; indexCast < this.cast.length; indexCast++)
                cast.push(this.cast[indexCast].json());
            return {
                'title': this.title,
                'year': this.year,
                'duration': this.duration,
                'cast': cast
            };
        }

    };
}]);