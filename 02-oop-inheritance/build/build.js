(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Actor = exports.Actor = function Actor(name, age) {
    _classCallCheck(this, Actor);

    this.name = name;
    this.age = age;
};

},{}],2:[function(require,module,exports){
"use strict";

/* EventEmitter supports multiple listeners for one Event. Advice: if you use the off(event) method, you will delete all the 
 listener of the event. */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = exports.EventEmitter = function () {
    function EventEmitter() {
        _classCallCheck(this, EventEmitter);

        this.eventHandler = new Array();
    }

    /*This method waits for an event, and returns an array with all the functions that are listening this event.*/


    _createClass(EventEmitter, [{
        key: "_findEventCallbacks",
        value: function _findEventCallbacks(event) {
            var callbacks = new Array();
            for (var index = 0; index < this.eventHandler.length; index++) {
                if (this.eventHandler[index][0] == event) callbacks.push(this.eventHandler[index][1]);
            }
            return callbacks;
        }

        /*This method waits for an event, and delete all the event listeners in the event handler.*/

    }, {
        key: "_deleteEventListener",
        value: function _deleteEventListener(event) {
            var eventsToDelete = new Array();
            for (var index = 0; index < this.eventHandler.length; index++) {
                if (this.eventHandler[index][0] == event) eventsToDelete.push(index);
            }
            return eventsToDelete;
        }
    }, {
        key: "on",
        value: function on(eventListener, callback) {
            this.eventHandler.push([eventListener, callback]);
        }
    }, {
        key: "emit",
        value: function emit(event) {
            if (this.eventHandler.length > 0) {
                var callbacks = this._findEventCallbacks(event);
                if (callbacks.length > 0) for (var index = 0; index < callbacks.length; index++) {
                    callbacks[index](event);
                }
            }
        }
    }, {
        key: "off",
        value: function off(eventListener) {
            var eventToDelete = this._deleteEventListener(eventListener);
            while (eventToDelete.length > 0) {
                this.eventHandler.splice(eventToDelete.pop(), 1);
            }
        }
    }]);

    return EventEmitter;
}();

},{}],3:[function(require,module,exports){
"use strict";

/* EX 5  (KEY) */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logger = exports.Logger = function () {
    function Logger() {
        _classCallCheck(this, Logger);
    }

    _createClass(Logger, [{
        key: "log",
        value: function log(event) {
            console.log("The " + event + " event has been emitted");
        }
    }]);

    return Logger;
}();

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Movie = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventEmitter2 = require("src/classes/EventEmitter.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Movie = exports.Movie = function (_EventEmitter) {
    _inherits(Movie, _EventEmitter);

    function Movie(title, year, duration) {
        _classCallCheck(this, Movie);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Movie).call(this));

        _this.title = title;
        _this.year = year;
        _this.duration = duration;
        _this.cast = new Array();
        return _this;
    }

    _createClass(Movie, [{
        key: "play",
        value: function play() {
            this.emit("play");
            // play
        }
    }, {
        key: "pause",
        value: function pause() {
            this.emit("pause");
            //pause
        }
    }, {
        key: "resume",
        value: function resume() {
            this.emit("resume");
            //resume
        }

        /* EX 8 - (KEY) */

    }, {
        key: "addCast",
        value: function addCast(actor) {
            if (actor.constructor.name == "Actor") this.cast.push(actor);else this.cast = this.cast.concat(actor);
        }
    }]);

    return Movie;
}(_EventEmitter2.EventEmitter);

},{"src/classes/EventEmitter.js":2}],5:[function(require,module,exports){
"use strict";

var _Actor = require("src/classes/Actor.js");

var _EventEmitter = require("src/classes/EventEmitter.js");

var _Movie = require("src/classes/Movie.js");

var _Logger = require("src/classes/Logger.js");

/* EX 6 - (KEY) */
var social = {

	share: function share(friendName) {
		return friendName + " share " + this.title;
	},

	like: function like(friendName) {
		return friendName + " like " + this.title;
	}
};

/* new logger */
var logger = new _Logger.Logger();

/* defining films*/
var pulpFiction = Object.assign(new _Movie.Movie('Pulp Fiction', 1994, 152), social);
var snatch = Object.assign(new _Movie.Movie('Snatch', 2000, 104), social);
var bigFish = Object.assign(new _Movie.Movie('Big Fish', 2003, 126), social);
var theWall = Object.assign(new _Movie.Movie('The Wall', 1982, 95), social);
var terminator = Object.assign(new _Movie.Movie('Terminator I', 1985, 60), social);

/* snatch cast */
var stathham = new _Actor.Actor("Jason Statham", 48);
var pitt = new _Actor.Actor("Brad Pitt", 52);
var graham = new _Actor.Actor("Stephen Graham", 42);
snatch.addCast([stathham, pitt, graham]);

/* pulp fiction cast*/
var travolta = new _Actor.Actor("John Travolta", 62);
var thurman = new _Actor.Actor("Uma Karuna Thurman", 45);
var jackson = new _Actor.Actor("Samuel Jackson", 67);

pulpFiction.addCast(travolta);
pulpFiction.addCast([thurman, jackson]);

/* terminator cast */
var arnold = new _Actor.Actor('Arnold Schwarzenegger', 50);
var otherCast = [new _Actor.Actor('Paul Winfield', 50), new _Actor.Actor('Michael Biehn', 50), new _Actor.Actor('Linda Hamilton', 50)];

terminator.addCast(arnold);
terminator.addCast(otherCast);

/* pulp fiction events*/
pulpFiction.on('pause', logger.log);
pulpFiction.on('play', logger.log);
pulpFiction.on('resume', logger.log);
pulpFiction.on('resume', function () {
	console.log("2nd event listener");
});

/*terminator events*/
terminator.on('pause', function () {
	console.log("Pause: Hasta la vista, baby");
});
terminator.on('play', function () {
	console.log("Play: Hasta la vista, baby");
});
terminator.on('resume', function () {
	console.log("Resume: Hasta la vista, baby");
});

/* html / javascript */
document.addEventListener("DOMContentLoaded", function () {

	/* an array with all the movies */
	var allMovies = [];

	/* add all the movies to the <option> element and the array allMovies */
	function addMovieToSelect(movie) {
		var where = document.getElementById("sel_movie");
		var newFilm = document.createElement("option");
		allMovies.push(movie);
		newFilm.innerHTML = movie.title;
		where.appendChild(newFilm);
	}

	/*Adding all the movies to the array and the <option> element */
	addMovieToSelect(pulpFiction);
	addMovieToSelect(snatch);
	addMovieToSelect(bigFish);
	addMovieToSelect(theWall);
	addMovieToSelect(terminator);

	/* checks what film it's selected in the <option> element */
	function whatFilmIsSelectedHTML() {
		var sel_movie = document.getElementById("sel_movie");
		for (var index = 0; index < sel_movie.children.length; index++) {
			if (sel_movie.childNodes[index].selected) return sel_movie.childNodes[index].innerHTML;
		}
	}

	/* returns the movie object of the film selected in the <option> element */
	function whatFilmIsSelected() {
		return allMovies.find(function (x) {
			return x.title == whatFilmIsSelectedHTML();
		});
	}

	/* Show all the info o a film, in an alert */
	function showInfo(film) {
		var cast = film.cast.length;
		var stringCast = "MOVIE: " + film.title + " \nYEAR: " + film.year + " \nDURATION: " + film.duration + "\nCAST: \n";
		while (cast > 0) {
			cast--;
			stringCast += film.cast[cast].name + " " + film.cast[cast].age + " years old.\n";
		}
		return stringCast;
	}

	/* Control of the buttons elements */
	var btn_event = document.getElementsByClassName("btn_event");
	btn_event[0].addEventListener("click", function () {
		//PLAY
		whatFilmIsSelected().play();
	});

	btn_event[1].addEventListener("click", function () {
		//PAUSE
		whatFilmIsSelected().pause();
	});

	btn_event[2].addEventListener("click", function () {
		//RESUME
		whatFilmIsSelected().resume();
	});

	btn_event[3].addEventListener("click", function () {
		//INFO
		alert(showInfo(whatFilmIsSelected()));
	});
	btn_event[4].addEventListener("click", function () {
		console.log(whatFilmIsSelected().like(document.getElementById("name").value)); //LIKE
	});
	btn_event[5].addEventListener("click", function () {
		console.log(whatFilmIsSelected().share(document.getElementById("name").value)); //SHARE
	});
});

},{"src/classes/Actor.js":1,"src/classes/EventEmitter.js":2,"src/classes/Logger.js":3,"src/classes/Movie.js":4}]},{},[5])


//# sourceMappingURL=build.js.map
