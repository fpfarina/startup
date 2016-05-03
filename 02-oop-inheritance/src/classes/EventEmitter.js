"use strict";

/* EventEmitter supports multiple listeners for one Event. Advice: if you use the off(event) method, you will delete all the 
 listener of the event. */
export class EventEmitter {
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
