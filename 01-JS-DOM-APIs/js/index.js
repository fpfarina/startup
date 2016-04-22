'use strict';

/*I don't know accurately why, but without the timer, this function: change the visibility to 1, but don't make the CSS
* animation. Strangely, with a 1ms timer, it's change the visibility to 1 and MAKE the CSS animation. I've seen that
* it's a common reported issue. I think that in the moment of the DOMContentLoaded, the browser assign the new css rule,
* like an "initial style property" and because of that don't make the animation.
* */

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function(){
        document.getElementById('hide').id = 'visible';}
    , 1);
});

/* I first uses this solution, but i read that it's not a good idea, using the onload event.
 * I know that in this case, for a small html document, without images, and external
 * media, it's not a problem, but i prefer avoid using it.
 *
 *         window.onload = function () {
 *             document.getElementById('hide').className += " load";
 *             };
*/