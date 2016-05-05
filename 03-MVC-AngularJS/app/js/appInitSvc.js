'use strict';

let appInitSvc = angular.module('appInitSvc', []);

appInitSvc.service('InitMovies', function(){

    this.data = {};
    this.data.movies = [{
        "title": "Pulp Fiction",
        "year": "1994",
        "duration": "152",
        "cast" : [
            {"name": "John", "lastName" : "Travolta", "age" : "25"},
            {"name": "Uma", "lastName" : "Thurman", "age" : "46"},
            {"name": "Samuel", "lastName" : "Jackson", "age" : "62"}
        ]
    },{
        "title": "Big Fish",
        "year": "2003",
        "duration": "126",
        "cast" : [
            {"name": "Ewan", "lastName" : "McGregor", "age" : "45"},
            {"name": "Jessica", "lastName" : "Lange", "age" : "67"},
            {"name": "Albert", "lastName" : "Finney", "age" : "79"}
        ]
    },{
        "title": "A Clockwork Orange",
        "year": "1971",
        "duration": "136",
        "cast" : [
            {"name": "Malcolm", "lastName" : "McDowell", "age" : "72"}
        ]
    },{
        "title": "Snatch",
        "year": "2000",
        "duration": "104",
        "cast" : [
            {"name": "Brad", "lastName" : "Pitt", "age" : "52"}
        ]
    },{
        "title": "The Wall",
        "year": "1980",
        "duration": "103",
        "cast": []
    }];

    this.data.select = {};
    this.data.select.id = 0;
});