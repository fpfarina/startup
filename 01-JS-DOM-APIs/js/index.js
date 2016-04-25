'use strict';

/* The global variable firstClick advices if the user has pressed the button for first time. This variable
*  its used, because the first joke will be shown by the EX 6, while the next jokes will be shown by the
*  AJAX Call of the EX 7.
*  firstClick = false; The user hasn't pressed the button yet.
*  firstClick = true; Tue user has pressed the button for first time.
 */
var firstClick = false;

/* This function removes all child nodes of a given node.
* Just looks for all the childs and delete one by one.*/
function removeAllChilds(node){
    while ( node.hasChildNodes() ) {
        node.removeChild(node.firstChild);
    }
}

/* EX 6 - This function uses XMLHttpRequest, to get a joke from the given source
* This function it's really basic, in the EX 1.7 i've make a better implementation.
* */
function tellMeAJoke(){
    var req = new XMLHttpRequest(); //A new HttpRequest object
    req.open ("GET", "http://api.icndb.com/jokes/random", true); //Configuration: GET - src - Async
    req.addEventListener("load", function(){ // When the server answer --> show the joke!!.
        showJoke(req); // This function it's the one that show JOKES. It's used by both 1.6 and 1.7 exercises.
    });
    req.send(null); // send the HttpRequest.
}

/* EX 7 (KEY) and 6
* function showJoke(reqJSON)
* where req -> It's a JSON object
*  This function takes a JSON answer of the HttpRequest, and show it in the HTML Document, modifying the DOM.
*/
function showJoke (reqJSON){
    if (reqJSON.status < 400){ // if < 400 ->> Success!
        var reqParse = JSON.parse(reqJSON.responseText); // parse the Json answer
             /*Different commands i tried to understand the structure of the requested JSON object -
             * i don't delete it in case somebody seeing the code wanna to know its structure.
                 console.log(reqJSON.status, reqJSON.statusText); // Req status
                 console.log(reqJSON.responseText); // Devolution
                 console.log(reqParse); // [type (string), value (object)]
                 console.log(reqParse.value); // [id (integer), joke(string), categories(array)]
                 console.log(reqParse.value.categories); // categories elements
             */
        var elem = document.createElement("p"); // new element <p>
        var cont = document.createTextNode(reqParse.value.joke); // new element <p> content
        elem.appendChild(cont); // insert node cont in node elem <p>
        var where = document.getElementById("hide"); // looking for the section where i will work
        removeAllChilds(where); // this function remove all childs of a node, in this case, it will delete all the content
        where.appendChild(elem.appendChild(cont)); // insert the <p> element with its content in the section "hide"
        where.style.fontSize= "20px"; // Some style for a better watching
        where.style.fontWeight = "bold";
    }
}

/* EX 7 (KEY) The CONFIG objects constructor*/
function CONFIG() {
    this.action = "GET"; //method of the AJAX call. Default = "GET"
    this.url = ""; //url of the AJAX call. Default = ""
    this.async = false; //asynchronous or synchronous. Default = false (synchronous)
    this.user = ""; //user of the AJAX call. Default = ""
    this.password = ""; //password of the AJAX call. Default = ""
    this.hidePassword = true; //this option, say to the object, if when you call de info() method,
                              // it will show the password or not.
    this.send = null; // what to send. Default = "". For a "GET" AJAX call, this value it's not use.
    function writePassword (hide , pass){ //This method change the password for *, in case hidePassword it's set to true.
        var text = pass;
        if (hide) {
            text = "";
            var i = 0;
            while (i < pass.length){
                text += "*";
                i++;
            }
        }
        return text;
    }
    this.info = function(){ //This method show in the console a description of the config object showing all the values.
                            //Set hidePassword = false; to show the password
        console.log("CONFIG AJAX CALL: " + "method: " + this.action + " url: " + this.url + " async: " +
            this.async + " user: " + this.user + " password: " + writePassword(this.hidePassword, this.password) +
            " SEND:" + this.send);
    }
}

/* EX 7 (KEY)
*  This function prepare the AJAXCall to get a joke, creating the config object, setting all
*  the parameters, and calling the AJAXCall.
 */
function prepareAJAXCall(){
    var config = new CONFIG(); //Creating the config object.
    config.user = "Fernando"; //username
    config.password = "myNOTsecretPASSWORD"; //password
    config.async = true; //async
    config.hidePassword = false; //my password will be not a secret if you are looking the console
    config.url = "http://api.icndb.com/jokes/random"; //src
    config.info(); //print the object in the console, just for debugging
    AJAXCall(config, showJoke); //call AJAXCall
}


/* EX 1.7 (KEY)
*  This function makes an AJAX Call.
*  AJAXCall (config, callback) where config is a CONFIG object and callback is a function()
 */
function AJAXCall(config, callback){

    var actions = ["GET", "POST", "PUT", "DELETE"];
    if (actions.indexOf(config.action) == -1) {
        return ("!AJAXCall error >> " + config.action + " is not a valid method. Please select one of this: " +
        "GET, POST, PUT or DELETE.");
    }
    if (typeof(config.async) != "boolean"){
        return ("!AJAXCall error >> config.async must be BOOLEAN.");
    }

    var req = new XMLHttpRequest();
    req.open(config.action, config.url, config.async, config.user, config.password);
    req.addEventListener("load", function (){
        callback (req);
    });
    req.send(config.send);
}

// Before doing anything, we want the DOMContentLoaded.
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('hide').style.display="block"; //EX 4 (KEY) - Hello world fade in.
    setTimeout(function(){
        document.getElementById('hide').style.opacity=1;} //FADE IN
        /*I don't know accurately why, but without the timer, this function: change the visibility to 1, but don't make the CSS
         * animation. Strangely, with a 1ms timer, it's change the visibility to 1 and MAKE the CSS animation. I've seen that
         * it's a common reported issue. I think that in the moment of the DOMContentLoaded, the browser assign the new css rule,
         * like an "initial style property" and because of that don't make the animation.
         * */
    , 1);

    document.getElementById("joke").addEventListener("click", function(){ //When the user click the "joke" button
        if (firstClick) { //if not is the first click -> EX 7
            prepareAJAXCall();
        }
        else
        {
            tellMeAJoke(); //if is the first click -> EX 6
            firstClick = true;
        }
    });
});

