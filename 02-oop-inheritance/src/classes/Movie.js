"use strict";

import {EventEmitter} from "src/classes/EventEmitter.js";

export class Movie extends EventEmitter  {
    constructor(title, year, duration) {
        super();
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
