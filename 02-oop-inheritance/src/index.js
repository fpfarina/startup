"use strict";

	import {Actor} from "src/classes/Actor.js";
	import {EventEmitter} from "src/classes/EventEmitter.js";
	import {Movie} from "src/classes/Movie.js";
	import {Logger} from "src/classes/Logger.js";



	/* EX 6 - (KEY) */
	let social = {
	  
	  share: function (friendName) {
	    return `${friendName} share ${this.title}`;
	  },

	  like: function (friendName) {
	    return `${friendName} like ${this.title}`;
	  }
	}

	/* new logger */
	let logger = new Logger();

	/* defining films*/
	let pulpFiction = Object.assign(new Movie('Pulp Fiction', 1994, 152),social);
	let snatch = Object.assign(new Movie('Snatch', 2000, 104),social);
	let bigFish = Object.assign(new Movie('Big Fish', 2003, 126),social);
	let theWall = Object.assign(new Movie('The Wall', 1982, 95),social);
	let terminator = Object.assign(new Movie('Terminator I', 1985, 60),social);

	export default {
  		pulpFiction: pulpFiction,
  		terminator: terminator,
  		bigFish: bigFish,
  		theWall: theWall
	};

	/* snatch cast */
	let stathham = new Actor("Jason Statham", 48);
	let pitt = new Actor("Brad Pitt", 52);
	let graham = new Actor("Stephen Graham", 42);
	snatch.addCast([stathham, pitt, graham]);

	/* pulp fiction cast*/
	let travolta = new Actor("John Travolta" , 62);
	let thurman = new Actor("Uma Karuna Thurman" , 45);
	let jackson = new Actor("Samuel Jackson", 67);

	pulpFiction.addCast(travolta);
	pulpFiction.addCast([thurman,jackson]);

	/* terminator cast */
	let arnold = new Actor('Arnold Schwarzenegger', 50);
	let otherCast = [
	 new Actor('Paul Winfield', 50),
	 new Actor('Michael Biehn', 50),
	 new Actor('Linda Hamilton', 50)
	];

	terminator.addCast(arnold);
	terminator.addCast(otherCast);

	/* pulp fiction events*/
	pulpFiction.on('pause', logger.log);
	pulpFiction.on('play', logger.log);
	pulpFiction.on('resume', logger.log);
	pulpFiction.on('resume', function () {console.log("2nd event listener")});

	/*terminator events*/
	terminator.on('pause', function () {console.log("Pause: Hasta la vista, baby")});
	terminator.on('play', function () {console.log("Play: Hasta la vista, baby")});
	terminator.on('resume', function () {console.log("Resume: Hasta la vista, baby")});

	/* html / javascript */
	document.addEventListener("DOMContentLoaded", function(){

		/* an array with all the movies */
		let allMovies = [];

		/* this function adds a movie to the <option> element and to the array allMovies */
		function addMovieToSelect(movie){
			let where = document.getElementById("sel_movie");
			let newFilm = document.createElement("option");
			allMovies.push(movie);
			newFilm.innerHTML = movie.title;
			where.appendChild(newFilm);
		}	

		/*Adding all the movies to the array and to the <option> element */	
		addMovieToSelect(pulpFiction);
		addMovieToSelect(snatch);
		addMovieToSelect(bigFish);
		addMovieToSelect(theWall);
		addMovieToSelect(terminator);

		/* checks what film it's selected in the <select> element */
		function whatFilmIsSelectedHTML(){
			let sel_movie = document.getElementById("sel_movie");
			for (let index = 0; index < sel_movie.children.length; index++)
				if (sel_movie.childNodes[index].selected)
					return sel_movie.childNodes[index].innerHTML;
		}

		/* returns the movie object of the film selected in the <select> element */
		function whatFilmIsSelected(){
			return allMovies.find(x => x.title == whatFilmIsSelectedHTML());
		}

		/* Show all the info o a film, in an alert */
		function showInfo(film){
			let cast = film.cast.length;
			let stringCast = `MOVIE: ${film.title} 
	YEAR: ${film.year} 
	DURATION: ${film.duration}
	CAST: 
	`;
			while (cast > 0){
				cast--;
				stringCast += `${film.cast[cast].name} ${film.cast[cast].age} years old.
	`;
			}
			return stringCast;
		}


		/* Control of the html buttons */
		let btn_event = document.getElementsByClassName("btn_event");
		btn_event[0].addEventListener("click", function(){ //PLAY
			whatFilmIsSelected().play();
		});

		btn_event[1].addEventListener("click", function(){ //PAUSE
			whatFilmIsSelected().pause();
		});

		btn_event[2].addEventListener("click", function(){ //RESUME
			whatFilmIsSelected().resume();
		});

		btn_event[3].addEventListener("click", function(){ //INFO
			alert(showInfo(whatFilmIsSelected()));
		});
		btn_event[4].addEventListener("click", function(){
			console.log(whatFilmIsSelected().like(document.getElementById("name").value)); //LIKE
		});
		btn_event[5].addEventListener("click", function(){
			console.log(whatFilmIsSelected().share(document.getElementById("name").value)); //SHARE
		});
	});
