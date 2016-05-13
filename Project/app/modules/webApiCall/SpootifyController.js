'use strict';

var spootifyController = angular.module('spootifyController', ['ui.router', 'authenticationService']);


spootifyController.controller('spootifyCaller', ['$scope', '$templateCache', '$location', '$state',
  '$authentication', 'localStorage',function($scope, $templateCache, $location, $state, $authentication, localStorage) {

        var locate = function () {

            var queryParameters = $authentication.readUrlParameters(String($location.$$absUrl));

                if (queryParameters.error == undefined) {

                localStorage.data.appState.index = 2;
                $scope.appState = "2";
                console.log("ENTER");
                localStorage.data.token = queryParameters.token;
                $scope.userState = queryParameters.state;

                $authentication.setToken(localStorage.data.token );
                var header = { Authorization: ('Bearer ' + localStorage.data.token )};
               // var header = {'Content-Type':'application/x-www-form-urlencoded'};
                $authentication.config('POST', 'https://accounts.spotify.com/api/token', $authentication.apiConnection,header);
                $authentication.fetch();


            }
            else {
                console.log("not ENTER" + $scope.appState);

                switch ($scope.appState) {
                    case '1':
                        //User must login -> Prepare login.
                        if (queryParameters.error == "bad_query")
                            if ($state.current)
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

       /* window.addEventListener("message", function(event) {
            var hash = JSON.parse(event.data);
            if (hash.type == 'access_token') {
                callback(hash.access_token);
            }
        }, false);
*/

        var callback = function (a)
        {
            console.log(a);
        };
        $scope.open =  function () {

             var width = 450,
                height = 730,
                left = (screen.width / 2) - (width / 2),
                top = (screen.height / 2) - (height / 2);

            var windows = window.open($authentication.urlAuthenticate, 'Spotify','menubar=no,location=no,resizable=no,' +
                'scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left);

            console.log(windows);
            windows.addEventListener("message", function(event) {
                alert(event.origin);
                console.log(event.origin);
                var hash = JSON.parse(event.data);
                if (hash.type == 'access_token') {
                    callback(hash.access_token);
                }
            }, false);

            };


        // at the bottom of your controller
        var init = function () {
            $scope.urlAuthenticate = $authentication.urlAuthenticate;
            console.log($scope.urlAuthenticate);
            $scope.appState = localStorage.data.appState.index;
            $scope.appMessage = localStorage.data.appState.message;
            locate();
        };
        init();
}]);