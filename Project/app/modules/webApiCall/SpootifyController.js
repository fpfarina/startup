'use strict';

var spootifyController = angular.module('spootifyController', ['ui.router', 'authenticationService']);


spootifyController.controller('spootifyCaller', ['$scope', '$templateCache', '$location', '$state',
  '$authentication', 'localStorage',function($scope, $templateCache, $location, $state, $authentication, localStorage) {

        var locate = function () {

            var queryParameters = $authentication.readUrlParameters(String($location.$$absUrl));
            console.log(queryParameters.error);
            if (queryParameters.error == null) {
                //APP can START!!
                localStorage.data.appState.index = 2;
                $scope.appState = "2";
                console.log("ENTER");


                localStorage.data.token = queryParameters.code;

                $scope.userState = queryParameters.state;

                console.log(localStorage.data.token);
                $authentication.setAuthorizationCode(localStorage.data.token);
                var header = {'Content-Type':'application/x-www-form-urlencoded'};
                //var header = { Authorization: ('bearer' + localStorage.data.token) };
                /*var header = {
                    'Access-Control-Allow-Origin': '*'
                    //'Access-Control-Allow-Origin' : 'X-Requested-With'
                };*/
                $authentication.config('POST', 'https://accounts.spotify.com/api/token', $authentication.apiConnection,header);
                $authentication.fetch();


            }
            else {
                console.log("not ENTER" + $scope.appState);

                switch ($scope.appState) {
                    case '1':
                        //User must login -> Prepare login.
                        if (queryParameters.error == "not_query")
                            if ($state.current != 'index')
                                $state.go('index');
                            else
                                console.log("ENTER else");
                        $scope.appMessage = queryParameters.error;
                        localStorage.data.appState.index = "0";
                        $scope.appState = "0";
                        $scope.appMEssage = queryParameters.error;
                        break;
                    case 2:
                        console.log("state 2");
                }

            }


        };

        // at the bottom of your controller
        var init = function () {
            $scope.urlAuthenticate = $authentication.urlAuthenticate;
            $scope.appState = localStorage.data.appState.index;
            $scope.appMessage = localStorage.data.appState.message;
            locate();
        };
        init();
}]);