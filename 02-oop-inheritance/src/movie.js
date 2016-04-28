"use strict";

class EventEmitter {
  on() {

  }

  emit() {

  }

  off () {

  }
}



class Video {
  constructor(title, year, duration) {
    this._title = title;
    this._year = year;
    this._duration = duration;
  }

  get title() {
    return this._title;
  }
  
  get year() {
    return this._year;
  }
  get duration() {
    return this._duration;
  }

  set title(newTitle) {
    this._title = newTitle;
  }
  set year(newYear) {
    this._year = year;
  }
  set duration(newDuration) {
    this._duration = duration;
  }

  play() {
    return(`Play film: ${this.title}`)
  }
  pause() {
    return(`Pause film: ${this.title}`)
  }
  resume() {
    return(`Resume film: ${this.title}`)
  }
}

let PulpFiction = new Video('Pulp Fiction', 1994, 152);
let Snatch = new Video('Snatch', 2000, 104);
let BigFish = new Video('Big Fish',2003, 126);
let TheWall = new Video('The Wall', 1982, 95);