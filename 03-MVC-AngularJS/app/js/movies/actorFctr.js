'use strict';

let actor = angular.module('actor', []);

/* Factory of Actor */
actor.factory('Actor', function(){
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