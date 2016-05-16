'use strict';

/*****************************************************************************************
 *  USEFUL APP METHODS:                                                                  *
 *  A collection of new methods that I used in this application.                         *
 *  NOTE: I used most of this functions in first moments of this app, now most of them   *
 *  are not being used.                                                                  *
 *****************************************************************************************/
var svc = angular.module('usefulMethodsService',[]);
svc.service('usefulAppMethods',[function(){

    /* TYPE OF
     * Local method
     * The typeof java script method, with the difference that if the object it's an array
     * it will return 'array' and not 'object'.
     */
    var typeOf = function (variable) {
        var string = typeof(variable);
        if  (Array.isArray(variable))
            string = 'array';
        return string
    };

    /* setValues copy parameters from an objet to another object, but not functions. */
    this.setValues = function(object1, object2) {
        if (object1 !== null) {
            for (var property in object2) {
                if (typeof object1[property] === 'function' || typeof object2[property] === 'function' )
                    var nothing;
                else
                    if (typeof object1[property] !== undefined){
                        object1[property] = object2[property];
                    }
            }
        }
    };

    /* CLONE */
    this.cloneObject = function (anotherObject, object){
            if (!( object === null || typeof object  !== 'object' )) {
                for (var parameter in object)
                    anotherObject[parameter] = internalClone(object[parameter]);
            }
    };

    var internalClone = function (object){
            if ( object === null || typeof object  !== 'object' ) {
                return object;
            }
            var temporal = {};
            for ( var parameter in object ) {
                temporal[ parameter ] = internalClone( object[ parameter ] );
            }
            return temporal;
    };


    /*  SET COMPLEX OBJECT VALUES:
     *  (Expect 2 objects) Set all the properties values in the first object to
     *  the values given in the second object. This method, only changes values,
     *  not the structure of an object. It also, can changes nested object properties.
     *  NOTE1: 'null' value and 'undefined' type are thought like a simple value.
     *      examples: * {a : null}, {a: "newValue"} -> {a : "newValue"}
     *                * {a : undefined}, {a: "newValue"} -> {a : "newValue"}
     *                * {a : "value"}, {a: null} -> {a : null}
     *
     */
    this.setComplexObjectValues = function(object, newValues) {
        if (object !== null) {
            for (var property in newValues) {
                if (typeOf(object[property]) == 'function')
                    break;
                else {
                    if (typeOf(object[property]) === typeOf(newValues[property])) // Equal TYPES?
                        if (typeOf(object[property]) === 'object' && object[property] !== null) // Is it an object?
                            this.setComplexObjectValues(object[property], newValues[property]);
                        else // Single property
                            object[property] = newValues[property];
                    else // No equal types!
                    if ((typeOf(object[property]) !== 'object' || object[property] === null)
                        && (typeOf(newValues[property]) !== 'object' || newValues[property] === null)) //Is it not an object? (null it is not an object for this function
                        object[property] = newValues[property];
                    }
            }
        }
        return object;
    };

    /* Generate a random string // Security use */
    this.randomStringGenerator = function (length) {
        var alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var randomString = "";
        for (var indexString = 0; indexString < length; indexString++) {
            randomString += alphabet[Math.floor(Math.random() * alphabet.length)];
        }
        return randomString;
    };

    /* Expect an object, return a string with the  parameter in the query way and encoded */
    this.makeQueryParameters = function (object) {
        var parameterArray = [];
        var string = "";

        for (var parameter in object)
            if (object.hasOwnProperty(parameter))
                parameterArray.push(parameter + "=" + encodeURIComponent(object[parameter]));

        string += parameterArray.join("&");
        return string;
    };


    /* Return an object with the query parameters in the absolute Url */
    this.readUrlParameters = function (checkUrl) {
        var queryParameters = {
            error: "No Query"
        };
        var firstSplit = checkUrl.split('/');
        var popString;
        while (firstSplit.length > 0) {
            popString = firstSplit.pop();
            if (popString.includes('=')){
                popString = popString.replace('?', '');
                popString = popString.replace('#', '');
                var queryParameters = {};
                var thisParameter;
                if (popString.includes('&')) {
                    var queryParametersArray = popString.split("&");
                    while (queryParametersArray.length > 0) {
                        thisParameter = queryParametersArray.pop().split("=");
                        queryParameters[thisParameter[0]] = thisParameter[1];
                    }
                } else {
                    thisParameter = popString.split("=");
                    queryParameters[thisParameter[0]] = thisParameter[1];
                }
                break;
            }
            else {
            }
        }
        return queryParameters;
    };


}]);
