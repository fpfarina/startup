"use strict";

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
    return('Play film.')
  }
  pause() {
    return('Pause film.')
  }
  resume() {
    return('Resume film.')
  }
}

let PulpFiction = new Video('Pulp Fiction', 1994, 152);
let Batman = new Video('Batman', 1990, 80);
console.log(`${PulpFiction.title} - ${PulpFiction.year} - ${PulpFiction.duration}`);