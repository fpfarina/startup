'use strict';

/*****************************************************************************************
 *  MY PLAY LIST CONTROLLER:                                                             *
 *  Check user playlist, local stored playlist, create new playlist                      *
 *****************************************************************************************/

var controller = angular.module('myPlayListCtrl', []);
controller.controller('myPlayListController',['$scope', 'sessionService', 'List',
    function($scope, sessionService, List) {

        /* INIT */
        $scope.myPlayList = sessionService.myPlayList;
        $scope.index = 0;
        $scope.list =  $scope.myPlayList.tracks;

        /* REFRESH SCOPES */
        $scope.$on('$locationChangeSuccess', function (event) {
            sessionService.ping();
            $scope.myPlayList = sessionService.myPlayList;
        });
        
        $scope.playLists = {};
        sessionService.getPlayLists($scope.playLists); //GET THE ONLINE PLAYLIST IT's AUTOMATIC
        setTimeout(() => $scope.index = 0,1000);
        
        /* CHANGES MS TO MINUTES */
        $scope.msToMinutes = function (time){
            var str_pad_left =  function (string,pad,length) {
                return (new Array(length+1).join(pad)+string).slice(-length);
            };

            var minutes = Math.floor(time /1000 / 60);
            var seconds = time - minutes * 60;
            return str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);
        };

        /* <SELECT> handler */
        $scope.set = function (index) {
            $scope.select = index;
        };

        $scope.changeSelect = function() {
            if ($scope.index > 0){
                //sessionService.getPlayListsTracks( $scope.playLists.lists.lists[$scope.index-1].tracks, $scope.playLists.lists.lists[$scope.index-1].id);

                var temp = $scope.playLists.lists.lists[$scope.index-1].tracks.tracks;
                $scope.list = {};
                $scope.list = temp;
            }
            else{
                $scope.list = {};
                $scope.list =  $scope.myPlayList.tracks;
            }
        };
        
        $scope.getListName = function() {
            if ($scope.index == 0)
                return 'My local play list';
            else
                return $scope.playLists.lists.lists[$scope.index - 1].name
        };

        /* STYLE */
        $scope.isOdd = function(number){
            return (number % 2) == 1;
        };

        /* DELETE A TRACK OF PLAYLIST*/
        $scope.delete = function($index) {
            //sessionService.myPlayList.deleteTrack($index);
            $scope.myPlayList.deleteTrack($index);
        };

        /* CREATE A NEW PLAYLIST */
        $scope.newPlaylist = function (){
            sessionService.createPlaylist($scope.name,$scope.myPlayList.tracks);
        };

        


    }]);