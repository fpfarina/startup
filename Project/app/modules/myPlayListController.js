'use strict';

var controller = angular.module('myPlayListCtrl', []);
controller.controller('myPlayListController',['$scope', 'sessionService', 'List',
    function($scope, sessionService, List){

        $scope.myPlayList = sessionService.myPlayList;

        $scope.$on('$locationChangeSuccess', function(event) {
            sessionService.ping();
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
        };

        $scope.isOdd = function(number){
            return (number % 2) == 1;
        };

        $scope.delete = function($index) {
            //sessionService.myPlayList.deleteTrack($index);
            $scope.myPlayList.deleteTrack($index);
        };

        $scope.playLists = {};
        sessionService.getPlayLists($scope.playLists);
        setTimeout(() => $scope.index = 0,1000);
          
        $scope.changeSelect = function() {
            if ($scope.index > 0){
                //sessionService.getPlayListsTracks( $scope.playLists.lists.lists[$scope.index-1].tracks, $scope.playLists.lists.lists[$scope.index-1].id);

                var temp = $scope.playLists.lists.lists[$scope.index-1].tracks.tracks;
                $scope.list = {};
                $scope.list = temp;
                console.log($scope.list);
             }
            else{
                $scope.list = {};
                $scope.list =  $scope.myPlayList.tracks;
                console.log($scope.list.tracks);
            }
        };

        $scope.getListName = function() {
            if ($scope.index == 0)
                return 'My local play list';
            else
                return $scope.playLists.lists.lists[$scope.index - 1].name
        };
        
        $scope.index = 0;
        $scope.list =  $scope.myPlayList.tracks;

        $scope.save = function (){
            sessionService.createPlaylist($scope.name,$scope.myPlayList.tracks);
        };

        


    }]);