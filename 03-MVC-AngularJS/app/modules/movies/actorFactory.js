'use strict';

let actorFctr = angular.module('actorFctr', []);

/* Factory of Actor */
actorFctr.factory('Actor', function(){
    return function(name, lastName, age) {
        this.name = name;
        this.lastName = lastName;
        this.age = age;

        this.json = function(){
            return {
                'name' : this.name,
                'lastName' : this.lastName,
                'age' : this.age
            }
        }
    }
});