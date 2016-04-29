"use strict";

class MyArray extends Array{
  constructor() {
    super();
 }

 deleteElementByIndex (index) {
  this.splice(index,1);
 }

 emptyArray (){
  let arrayLength = this.length; 
  while (arrayLength > 0){
    arrayLength--;
    this.pop();
  }
 }

 pushArray(array){
  array.reverse();
  let arrayLength = array.length; 
  while(arrayLength > 0) {
    arrayLength--;
    this.push(array.pop());
  }
 }

 deleteElementsByValue (value) {
  let arrayPosition = this.length;
  let newArray = [];
  while (arrayPosition>0){
    arrayPosition--;
    if (this[arrayPosition] != value)
      newArray.push(this[arrayPosition]);
  }
  this.emptyArray();
  this.pushArray(newArray.reverse());
 }

}


/* eventEmitter supports multiple listeners for one Event. Advice: if you use the off(event) method, you will delete all the 
listener of the event. */
class EventEmitter {
  constructor() {
    this.eventHandler = new Array;
  }

  /*This method waits for an event, and returns an array with all the functions that are listening this event.*/
  _findEventCallbacks (event){
    let callbacks = new Array;
    for (let index = 0; index < this.eventHandler.length; index++ ) {
      if (this.eventHandler[index][0] == event)
        callbacks.push(this.eventHandler[index][1])
    }
    return callbacks;
  }

  /*This method waits for an event, and delete all the event listeners in the event handler.*/
  _deleteEventListener (event){
    let eventsToDelete = new Array;
    for (let index = 0; index < this.eventHandler.length; index++ ) {
      if (this.eventHandler[index][0] == event)
        eventsToDelete.push(index);
    }
    return eventsToDelete;
  }

  on(eventListener, callback) {
    this.eventHandler.push([eventListener , callback]);
  }

  emit(event) {
    if (this.eventHandler.length > 0) {
      let callbacks = this._findEventCallbacks (event);
      if (callbacks.length > 0)
        for (let index = 0; index < callbacks.length; index++) {
            callbacks[index](event);
        }
    }
  }

  off (eventListener) {
    let eventToDelete = this._deleteEventListener(eventListener);
    while (eventToDelete.length > 0)
      this.eventHandler.splice(eventToDelete.pop(), 1);
  }
}

/* EX 5  (KEY) */
class Logger {
  log(event) {
    console.log(`The ${event} event has been emitted)`);
  }
}

class Actor {
  constructor(name, age){
    this.name = name;
    this.age = age;
  }
}

class Movie extends EventEmitter  {
  constructor(title, year, duration) {
    super(title + year + duration);
    this.title = title;
    this.year = year;
    this.duration = duration;
    this.cast = new Array;
 }

  play() {
    this.emit("play");
    // play
  }
  pause() {
    this.emit("pause");
    //pause
  }
  resume() {
    this.emit("resume");
    //resume
  }

  /* EX 8 - (KEY) */
  addCast (actor){
      if (actor.constructor.name == "Actor")
        this.cast.push(actor);
      else
        this.cast = this.cast.concat(actor);
  }
}

/* EX 6 - (KEY) */
let social = {
  
  share: function (friendName) {
    return `${friendName} share ${this.title}`;
  },

  like: function (friendName) {
    return `${friendName} like ${this.title}`;
  }
}

let pulpFiction = Object.assign(new Movie('Pulp Fiction', 1994, 152),social);
let snatch = Object.assign(new Movie('Pulp Fiction', 1994, 152),social);
let bigFish = Object.assign(new Movie('Pulp Fiction', 1994, 152),social);
let theWall = Object.assign(new Movie('Pulp Fiction', 1994, 152),social);

let logger = new Logger();
pulpFiction.on('pause', logger.log);
pulpFiction.on('play', logger.log);
pulpFiction.on('resume', logger.log);
pulpFiction.on('resume', function () {console.log("2nd event listener")});

console.log(pulpFiction.share('Mike Blossom'));
console.log(snatch.like('Mike Blossom'));

let travolta = new Actor("John Travolta" , 62);
let thurman = new Actor("Uma Karuna Thurman" , 45);
let jackson = new Actor("Samuel Jackson", 67);

pulpFiction.addCast(travolta);
pulpFiction.addCast([thurman,jackson]);
console.log(pulpFiction.cast);

let terminator = Object.assign(new Movie('Terminator I', 1985, 60),social);

let arnold = new Actor('Arnold Schwarzenegger', 50);
let otherCast = [
 new Actor('Paul Winfield', 50),
 new Actor('Michael Biehn', 50),
 new Actor('Linda Hamilton', 50)
];

terminator.addCast(arnold);
terminator.addCast(otherCast); //Movie must contain an array of 4 actors

console.log(terminator.cast);