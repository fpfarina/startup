'use strict';

/* The global variable Clicks advices how many times the user has pressed the joke button. Tt's used in EX 6, to
 * control the Time  Out error. */
var Clicks = 0;

/* The global variable JSuccess it's used at exercise 6, to determinate if the server has answered and avoid
 * showing old "time out" errors. */
var JSuccess = false;

/* It will clear all the content of a DOM given node.
*  Method: Just looks for all childNodes of a given node and delete one by one.*/
function removeAllChildNodes(node){
    while ( node.hasChildNodes() ) {
        node.removeChild(node.firstChild);
    }
}

/* EX 6 - This function uses XMLHttpRequest, to get a joke from the given source.
 * This function it's really basic, in the EX 1.7 i've make a better implementation.
 * In case of an erro ocurr, it can't determinate what kind of error it's happening, 
 * it will only send a "Time out error".
 * Any new click on the button will kill the last call. To make this happen, i use the global variable Clicks.
 * If (callId) is equal to (Click), the function will show a joke or an error because it's match with the last
 * click, but if not, it'll do nothing. I know it's not efficient.*/
function tellMeAJoke(){
    JSuccess = false; ///* Set the global variable JSuccess to false. Tt's used
    // to determinate if the server has answered and avoid showing old "time out" errors.
    // If JSuccess = true, the server has answered. If not, the time out error, will be call.
    var callId = Clicks;
    var req = new XMLHttpRequest(); //A new HttpRequest object
    req.open ("GET", "http://api.icndb.com/jokes/random", true); //Configuration: GET - src - Async
    setTimeout(function(){
        if (Clicks == callId && JSuccess == false){ //Is it the last call and now answer yet?
            changeColor("red");
            changeAdvice("ERROR: Time OUT!!");
        }
    },3000);
    req.addEventListener("load", function(){ // When the server answer --> show the joke!!.
        if (Clicks == callId){ //Is it the last call?
            console.log("HERE" + Clicks);
            showJoke(req); // This function it's the one that show JOKES. It's used by exercises 6 and 7.
            changeColor("green");
            changeAdvice("JOKE SUCCESS!!");
            JSuccess = true;
        }
    });
    req.send(null); // send the HttpRequest.
}

/* EX 7 (KEY) and 6
 * function showJoke(reqJSON)
 * where reqJSON -> It's a JSON object
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
        var cont = document.createTextNode(reqParse.value["joke"]); // new element <p> content
        elem.appendChild(cont); // insert node cont in node elem <p>
        var where = document.getElementById("hide"); // looking for the section where i will work
        removeAllChildNodes(where); // this function remove all childs of a node, in this case, it will delete all the content
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
    this.info = function(){ //This method show in the console a description of the config object, showing all values.
                            //Set hidePassword = false; show the password.
        console.log("CONFIG AJAX CALL: " + "method: " + this.action + " url: " + this.url + " async: " +
            this.async + " user: " + this.user + " password: " + writePassword(this.hidePassword, this.password) +
            " SEND:" + this.send);
    }
}

/* EX 7 (KEY)
 *  This function prepare an AJAXCall to get a joke:
 *  1- Create the config object and set all the parameters.
 *  2- Send the AJAXCall.
 */
function prepareAJAXCall(){
    var config = new CONFIG(); //Creating the config object.
    config.user = "Fernando"; //username
    config.password = "myNOTsecretPASSWORD"; //password
    config.async = true; //async
    config.hidePassword = false; //my password will be not a secret if you are looking the console
    config.url = "http://api.icndb.com/jokes/random"; //src
    //config.info(); //print the object in the console, just for debugging
    AJAXCall(config).then(function(req) { //Success function to promise
        changeColor("green");
        changeAdvice("JOKE SUCCESS!!");
        showJoke(req); //Show Joke
    }, function(error) { //Error function to promise
        var first = error[0];
        console.log("!AJAXCall error >> " + error.slice(1));
        changeAdvice("ERROR: " + error.slice(1)); //Show Error
        switch (first) {
            case "1":
            case "2":
                changeColor("mediumvioletred");
                break;
            case "3":
                changeColor("red");
                break;
            case "4":
                changeColor("orangered");
                break;
        }
    });
}

/* EX 9 - this function change the color of the joke section, to the given color. */
function changeColor(color){
    document.getElementById("joke").parentNode.style.background = "lightgray";
    setTimeout(function(){
        document.getElementById("joke").parentNode.style.background = color;
    }, 250);
}

/* Change the advice input text - Here will be notified error or success messages. */
function changeAdvice(txt){
    document.getElementById("advice").value = txt;
}


/* 7 (KEY)
*  This function makes an AJAX Call.
*  It waits as argument a CONFIG object.
 */

function AJAXCall(config) {
    return new Promise(function (succeed, fail) {
        var actions = ["GET", "POST", "PUT", "DELETE"];
        var error = "";
        if (actions.indexOf(config.action) == -1) { //Check a bad input
            error = "1" + config.action + " is not a valid method. Select one of this: " +
                "GET, POST, PUT or DELETE.";
            fail(error);
        } else {
            if (typeof(config.async) != "boolean") { //Check a bad input
                error = "2config.async must be BOOLEAN.";
                fail(error);
            } else {
                var req = new XMLHttpRequest();
                req.open(config.action, config.url, config.async, config.user, config.password);
                req.addEventListener("load", function () {
                    if (req.status < 400) { //Success?
                        succeed(req); //Yes!
                    }
                    else
                        error = ("3" + req.statusText);
                        fail(error);//No!
                });
                req.addEventListener("error", function () {
                    error = "4Network error.";
                    fail(error); //Network error.
                });
                req.send(config.send);
            }
        }
    });
}

function showRepository (reqJSON, src){
    if (reqJSON.status < 400){ // if < 400 ->> Success!
        var reqParse = JSON.parse(reqJSON.responseText); // parse the Json answer
        /* console.log(reqParse); // [type (string), value (object)]
         console.log(reqParse.items); // [id (integer), joke(string), categories(array)]
         console.log(reqParse.items[0]);
         console.log(reqParse.items[0]["full_name"]); // categories elements
        */
        var where = document.getElementById("repository"); // looking for the section where i will work
        removeAllChildNodes(where); // this function remove all childs of a node, in this case, it will delete all the content

        if (reqParse.items.length != 0) {
            var i = 0;
            while (i < reqParse.items.length) {
                var elem = document.createElement("li"); // new element <p>
                var cont = document.createTextNode("* " + reqParse.items[i]["full_name"]); // new element <p> content
                elem.appendChild(cont); // insert node cont in node elem <p>

                where.appendChild(elem); // insert the <p> element with its content in the section "hide"
                i++;
            }
        }
        else {
            changeColor("orange");
            changeAdvice("No results for: " + src.slice(src.indexOf("?")+ 3));
            where.appendChild(document.createElement("li").appendChild(document.createTextNode("* empty")));
        }
    }
}

function repository(src){
    var config = new CONFIG(); //Creating the config object.
    config.async = true; //async
    config.url = "http://api.github.com/search/repositories?q='" + src + "'"; //src
    config.info();
    AJAXCall(config).then(function(req) { //Success function to promise
            changeColor("green");
            console.log("ok" + req);
            changeAdvice("SEARCH SUCCESS!!");
            showRepository(req, config.url); //Show Joke
        }, function(error) { //Error function to promise
             var first = error[0];
             console.log("!AJAXCall error >> " + error.slice(1));
             changeAdvice("ERROR: " + error.slice(1)); //Show Error
             switch (first) {
             case "1":
             case "2":
             changeColor("mediumvioletred");
             break;
             case "3":
             changeColor("red");
             break;
             case "4":
             changeColor("orangered");
             break;
             }
             console.log("error");
    });
}

function randomWord (){
    var words = ["love", "peace", "math", "origin", "path", "bootcamp", "mountain", "art", "music", "clouds"];
    return words[(Math.floor(Math.random() * 10))];
}

function createRandomMatrix (x, y){
    var x1 = 0;
    var y1;
    var subMatrix = [];
    var matrix = [];
    for (x1;x1<x;x1++){
        for (y1=0;y1<y;y1++){
            subMatrix[y1]=randomWord();
        }
        matrix[x1]=subMatrix.slice();
    }
    return matrix;
}

function isANumber(str) {
    var num = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    var i;
    if (str.length < 1)
        return false;
    for (i = 0; i < str.length; i++) {
        if (num.indexOf(str[i]) == -1)
            return false;
    }
    return true;
}


function matrixToTable(){
    var x = (document.getElementById("x1-input").value);
    var y = (document.getElementById("x2-input").value);
    var error = "";
    console.log(typeof(x));
    if (!(isANumber(x) && isANumber(y))){
         error = ("X and Y must be an integer Number.");
    }
    else {
        if (x < 1 || y < 1){
            error = "X and Y must be equal or higher to 1."
        }
    }
    if (error != ""){
        changeColor("orange");
        changeAdvice(error);
        return;
    }
    var matrix = createRandomMatrix (x,y);
    console.log(matrix[0]);
    console.log(matrix[1]);
    var where = document.getElementById("hide");
    where.style.fontSize= "12px"; // Some style for a better watching
    where.style.fontWeight = "none";
    removeAllChildNodes(where);

    where = where.appendChild(document.createElement("table"));
    var root = where;
    where = where.appendChild(document.createElement("thead").appendChild(document.createElement("tr")));

    var j = 0;
    for (j;j<(matrix[0].length);j++){
        where.appendChild(document.createElement("th")).appendChild(document.createTextNode(matrix[0][j]));
    }

    where = root.appendChild(document.createElement("tbody"));
    var subRoot = where;

    var i;
    for (i=1; i<matrix.length;i++){
        where = subRoot;
        where = where.appendChild(document.createElement("tr"));
        for (j=0; j<matrix[i].length;j++){
            where.appendChild(document.createElement("th")).appendChild(document.createTextNode(matrix[i][j]));
        }
    }
    changeColor("green");
    changeAdvice("TABLE CREATED");
}

// Before doing anything, we want the DOMContentLoaded.
document.addEventListener("DOMContentLoaded", function() {
    /*EX 4 (KEY) - Hello world fade in. The animation is made by CSS.*/
    document.getElementById('hide').style.display="block";
    setTimeout(function(){
        document.getElementById('hide').style.opacity=1;} //FADE IN
        /*I don't know accurately why, but without the timer, this function: change the visibility to 1, but don't make the CSS
         * animation. Strangely, with a 1ms timer, it's change the visibility to 1 and MAKE the CSS animation. I've seen that
         * it's a common reported issue.
         * */
    , 1);

    document.getElementById("joke").addEventListener("click", function(){ //When the user click the "joke" button.
        Clicks += 1;
        var option = document.getElementsByName("ex"); //Check what radio button it's checked.
            if (option[0].checked) // EX 7
                prepareAJAXCall();
            else
                if (option[1].checked)
                    tellMeAJoke(); // EX
                else
                    if (option[2].checked)
                        repository("JavaScript");
                    else
                        if (option[3].checked)
                            repository(document.getElementById("ex-input").value);
                        else
                            matrixToTable();
    });

    function whoIsChecked(){
        var i = 0;
        var ex = document.getElementsByName("ex");
        for (i;i<ex.length;i++){
            if (ex[i].checked)
                return (i+1);
        }
    }

        var t = 0;
        var ex = document.getElementsByName("ex");
        for (t;t<ex.length;t++){
            ex[t].addEventListener("click", function(){
                document.getElementById("opt").innerHTML = "OP: " + whoIsChecked();
                document.getElementById("ex-input").disabled = !(document.getElementsByName("ex")[3].checked);
                document.getElementById("x1-input").disabled = !(document.getElementsByName("ex")[4].checked);
                document.getElementById("x2-input").disabled = !(document.getElementsByName("ex")[4].checked);
            });
        }

});