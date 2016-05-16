'use strict';

var controller = angular.module('myPlayListCtrl', []);
controller.controller('myPlayListController',['$scope', 'sessionService', 'List',
    function($scope, sessionService, List){

        $scope.myPlayList = sessionService.myPlayList;

        $scope.$on('$locationChangeSuccess', function(event) {
            sessionService.ping();
            console.log("ON");
            $scope.myPlayList = sessionService.myPlayList;
        });

        $scope.msToMinutes = function (time){
            var str_pad_left =  function (string,pad,length) {
                return (new Array(length+1).join(pad)+string).slice(-length);
            };

            var minutes = Math.floor(time /1000 / 60);
            var seconds = time - minutes * 60;
            return str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);
        };

        $scope.set = function (index) {
            $scope.select = index;
            $scope.results.data.list.tracks[index].selectMovie = true;
        };

        $scope.isOdd = function(number){
            return (number % 2) == 1;
        };

        

}]);