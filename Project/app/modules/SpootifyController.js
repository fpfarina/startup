'use strict';

var spootifyCallerController = angular.module('spootifyCallerController', ['ui.router','authenticationService']);


spootifyCallerController.controller('ApiCaller', ['$scope',
                                                      '$http', 
                                                      '$templateCache', 
                                                      '$location', 
                                                      '$state', 
                                                      '$authentication',
            function($scope, $http, $templateCache, $location, $state, $authentication) {

                $scope.urlAuthenticate = $authentication.urlAuthenticate;

                $scope.locate = function (){
                    var queryParameters = $authentication.readUrlParameters(String($location.$$absUrl));

                    if (queryParameters.error == null) {
                        //APP can START!!
                    }
                    else {
                        if (queryParameters.error == "not_query")
                            $state.go('index');
                    }

                    $scope.userToken = queryParameters.code;
                    $scope.userState = queryParameters.state;
                    console.log($scope.userToken);
                    console.log($scope.userState);
                    console.log(queryParameters.error);
                };
/*
                $scope.login = function(){
                    alert("OK");
                    console.log("LOGIN: user: " + $scope.user.name + " / pass: " + $scope.user.password);

                    $scope.updateModel ("GET", 'https://accounts.spotify.com/authorize' + query);
                    $scope.fetch();

                    //$scope.method = 'GET';
                    //$scope.url = 'https://api.spotify.com';
                    //$scope.url = 'https://accounts.spotify.com/authorize';

                };
*/
                /*

                $scope.fetch = function() {
                    $scope.code = null;
                    $scope.response = null;

                    //$http({method: $scope.method, url: $scope.url, cache: $templateCache, params: myParams}).
                    $http({method: $scope.method, url: $scope.url}). // cache: $templateCache dataType: 'jsonp'
                    then(function(response) {
                        $scope.status = response.status;
                        $scope.data = response.data;
                        console.log ("OK");
                        console.log (response.data);
                        console.log (response.status);
                        console.log (response);
                    }, function(response) {
                        $scope.data = response.data || "Request failed";
                        $scope.status = response.status;
                        console.log (response.data);
                    });
                };

                $scope.updateModel = function(method, url) {
                    $scope.method = method;
                    $scope.url = url;
                };*/
            }]);
