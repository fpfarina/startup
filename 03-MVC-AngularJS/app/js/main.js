'use strict';

let myApp = angular.module('myApp', ['ngStorage', 'moviesList']);


/* Factory of Actor */
/*myApp.factory('Actor', function(){
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

/* Factory of Movie
myApp.factory('Movie', ['Actor', function(Actor) {

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
            let indexCast = json.length;
            let name = "";
            let lastName = "";
            let age = "";
            while (indexCast > 0) {
                indexCast--;
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
}]);*/

/* Factory of MoviesList
myApp.factory('MoviesList', ['Movie', function(Movie) {

    return function() {
        this.movies = [];
        this.length = 0;

        this.addMovie = function(title, year, duration) {
            let movie = new Movie(title,year,duration);
            this.movies.push(movie);
            this.length += 1;
        };

        this.deleteMovie = function(index){
            this.movies.splice(index,1);
            this.length -= 1;
        };

        this.addMoviesJson = function (json) {
            let indexMovies;
            let title = "";
            let year = "";
            let duration = "";
            let cast;
            for (indexMovies = 0; indexMovies <  json.length; indexMovies++) {
                title = json[indexMovies].title;
                year = json[indexMovies].year;
                duration = json[indexMovies].duration;
                cast = json[indexMovies].cast;
                this.addMovie(title, year, duration);
                this.movies[this.length - 1].addCastJson(cast);
            }
        };

        this.json = function () {
            let json = [];
            let indexMovies;
            for (indexMovies = 0; indexMovies < this.length; indexMovies++) {
                json.push(this.movies[indexMovies].json());
            }
            return json;
        }
    }
}]);*/

myApp.service('InitMovies', function(){

    this.movies = [{
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

    this.selectMovie = 0;

});

myApp.service('MoviesStorage', function() {

    this.movies = [];
    this.selectMovie = 0;

}) ;

myApp.controller('LocalStorageCtrl', ['$scope', '$localStorage', 'MoviesStorage', 'InitMovies', function($scope, $localStorage, MoviesStorage, InitMovies){

    $scope.storage = $localStorage.$default(InitMovies);
    MoviesStorage.movies = $scope.storage.movies;
    MoviesStorage.selectMovie = $scope.storage.selectMovie;

    $scope.storage = MoviesStorage;
    /* $scope.storage = $localStorage.$default(angular.copy($scope.init));
     $scope.movies = $scope.storage.movies;
     $scope.select = $scope.storage.selectMovie.id;*/

}]);

myApp.controller('MoviesCtrl', ['$scope', 'MoviesList', 'MoviesStorage', 'InitMovies', function($scope, MoviesList, MoviesStorage, InitMovies) {


    let moviesList = new MoviesList;
    let movies = moviesList.movies; // movies -> MoviesList.movies

    moviesList.addMoviesJson(MoviesStorage.movies);

    if (moviesList.length >= 0)
        $scope.select = MoviesStorage.selectMovie;

    $scope.movies = movies;
    $scope.selectMovie = movies[$scope.select];

    $scope.isEmpty = function(string, optString=""){
        if (string == "")
            return "-";
        else
            return (string + optString);
    };

    $scope.set = function(index){
        $scope.select = index;
        $scope.selectMovie = movies[index];
    };

    $scope.deleteMovie = function(){
        moviesList.deleteMovie()
    }

}]);

/*
myApp.controller('MoviesCtrl', function ($scope, $localStorage) {
/*
	$scope.init = {};
	$scope.init.selectMovie = {"id": 0}
	$scope.init.movies = [{
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

	$scope.storage = $localStorage.$default(angular.copy($scope.init));
	$scope.movies = $scope.storage.movies;
	$scope.select = $scope.storage.selectMovie.id;

	$scope.selectMovie =  $scope.movies[$scope.select];
	$scope.menuOption = "Edit movie: "


	$scope.saveData = function(){
		$scope.storage.movies = angular.copy($scope.movies);
	}

	$scope.set = function(index){
			$scope.select = index;
			$scope.storage.selectMovie.id = index;
			$scope.selectMovie =  $scope.movies[$scope.select];
			$scope.menuOption = "Edit Movie: ";

	}

	$scope.setMenu = function(index){
		if (index == 0){
			$scope.newFilm();
			$scope.menuOption = "New Movie: "
		}
		else
			if (confirm("Are you sure you wanna delete "+ $scope.selectMovie.title + " !! It would be irreversible.")) {
				$scope.deleteFilm($scope.select);
				if (!($scope.select == 0))
					$scope.set($scope.select-1);
			}
	}


	$scope.titles = function (){
		return $scope.selectMovie.title;
	} 

	$scope.isOdd = function (index){
		return !((index % 2) == 1);
	}

	$scope.newActor = function (){
		let nActor = {"name": "", "lastName" : "", "age" : ""};
		$scope.selectMovie.cast.push(nActor);
	}

	$scope.deleteActor = function (actor){
		let castArray = $scope.selectMovie.cast
		castArray = castArray.splice(actor,1);
	}
*/
//});