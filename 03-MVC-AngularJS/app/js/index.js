var myApp = angular.module('myApp', []);




myApp.controller('MoviesCtrl', ['$scope', function ($scope) {



	$scope.isEmpty = function(string, optString=""){
		if (string == "")
			return "-";
		else
			return (string + optString);
	}

  $scope.movies = [{
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
        "duration": "103"
    }];



	$scope.select = 0;
	
	$scope.set = function(index){
			$scope.select = index;
			$scope.selectMovie =  $scope.movies[$scope.select];
	}

	$scope.menuOption = "Add"

	$scope.newFilm = function(){
		let newFilm = {
			"title": "",
        	"year": "",
       		"duration": ""
       		}
		$scope.movies.push(newFilm);
		$scope.set($scope.movies.length-1);
	}

	$scope.selectMovie =  $scope.movies[$scope.select];

	$scope.deleteFilm = function (film){
		let filmArray = $scope.movies
		filmArray = filmArray.splice(film,1);
	}

	$scope.setMenu = function(index){
		if (index == 0){
			$scope.menuOption = "Add"
			$scope.newFilm();
		}
		else
			if (index == 1) 
				$scope.menuOption = "Edit"
			else {
				if (confirm("Are you sure you wanna delete "+ $scope.selectMovie.title + " !! It would be irreversible.")) {
					$scope.deleteFilm($scope.select);
					if (!($scope.select == 0))
						$scope.set($scope.select-1);
				}
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

}]);