"use strict";

/* movieMyArray.js it's similar to movie.js. One time i've finished movie.js, i decided to make exercises again 
using a new MyArray class (subclass of Array) with lots of new methods that improve the code. The logic it's the same,
the code it's notoriously different. I did this, looking for reusability, better coding and keep learning. */

/* First of all, i defined MyArray class, a subclass of Array. This new class, add some usefull methods and functions.*/
class MyArray extends Array{
  constructor() {
    super();
 }

 /* This function returns an array of indexes pointing to the elements where the evaluated condition it's true. */
 lookForIndex (condition) {
  let arrayLength = this.length;
  let newArray = new MyArray;
  while (arrayLength>0){
    arrayLength--;
     if (condition(this[arrayLength]))
      newArray.push(arrayLength);
  }
  return this.order(newArray);
 }

 /* Deletes an element of the array by its index. */
 deleteElementByIndex (index) {
  this.splice(index,1);
 }

 /* Deletes all the elements in the array by an indexes array. */
 deleteElementsByArrayIndex (indexArray){
  let arrayIndexLength = indexArray.length;
  indexArray = this.order(indexArray);
  while (arrayIndexLength > 0){
    arrayIndexLength--;
    this.deleteElementByIndex(indexArray.pop());
  }  
 }

/* Used for testing - Print this object in the console */
show () {
  console.log(this);
}

/* Sort number element of the array */
 order (array) {
  return array.sort(function(a, b){return a-b});
}

/* Delete all the elements of the array */
 emptyArray (){
  let arrayLength = this.length; 
  while (arrayLength > 0){
    arrayLength--;
    this.pop();
  }
 }

/* Push all the elements of a given array in this array */
 pushArray(arrayToPush){
  arrayToPush.reverse();
  let arrayToPushLength = arrayToPush.length; 
  while(arrayToPushLength > 0) {
    arrayToPushLength--;
    this.push(arrayToPush.pop());
  }
 }

/* Delete elements that value is equal to the given value */
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

/* Return true it's the array it's not empty*/
 isNotEmpty () {
  return (this.length > 0) ;
 }
}

/* I used this, to try the new methods in MyArray 
let arr = new MyArray;
arr.show();
arr.pushArray([1,2,1,2,1,4,8,2,3,1,3,1,9,10,11]);
arr.show();
console.log(arr.lookForIndex(x => x > 2));
arr.deleteElementsByArrayIndex(arr.lookForIndex(x => x > 2));
arr.show();*/

/* EventEmitter supports multiple listeners for one Event. Advice: if you use the off(event) method, you will delete all the 
listener of the event. */
class EventEmitter {
  constructor() {
    this.eventHandler = new MyArray; //using MyArray class
  }

  /* Given an event, this function makes an array with all the callbacks indexes of the event handler. Then it calls 
  _pushCallbacksByIndex function that waits for an array of index and return an array of callbacks */
  _findEventCallbacks (event){
    let eventIndex = this.eventHandler.lookForIndex( handlerIndex => handlerIndex[0] == event);
    if (eventIndex.isNotEmpty())
      return this._pushCallbacksByIndex(eventIndex);
    else
      return (new MyArray);
  }

  /* Given an array of event handler indexes, returns an array of event callbacks.*/
  _pushCallbacksByIndex (handlerIndex) {
    let callbacksList = new MyArray;

    while (handlerIndex.isNotEmpty())
      callbacksList.push(this.eventHandler[handlerIndex.pop()][1]);

    return callbacksList;
  }

  on(eventListener, callback) {
    this.eventHandler.push([eventListener , callback]);
  }

  emit(event) {
    if (this.eventHandler.isNotEmpty()) {
      let callbacksList = this._findEventCallbacks (event);
      if (callbacksList.isNotEmpty())
        for (let index = 0; index < callbacksList.length; index++)
            callbacksList[index](event);
    }
  }

  off (eventListener) {
    let eventsToDelete = this.eventHandler.lookForIndex( handlerIndex => handlerIndex[0] == eventListener);
    this.eventHandler.deleteElementsByArrayIndex(eventsToDelete);
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
    super();
    this.title = title;
    this.year = year;
    this.duration = duration;
    this.cast = new MyArray;
 }

  play() {
    this.emit("play");
    return "Play event";
  }
  pause() {
    this.emit("pause");
    return "Pause event";
  }
  resume() {
    this.emit("resume");
    return "Resume event";
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

/* Films, actors, etc.. */
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
terminator.addCast(otherCast);

console.log(terminator.cast);