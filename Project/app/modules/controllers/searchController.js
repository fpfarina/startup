'use strict';

/*****************************************************************************************
 *  SEARCH CONTROLLER:                                                                   *
 *  Search tracks.                                                                       *
 *****************************************************************************************/
var controller = angular.module('searchCtrl', ['ui.router', 'localStorageController', 'userSessionService', 'usefulMethodsService', 'classesFactory']);
controller.controller('searchController',['$scope', '$filter', 'sessionService', 'usefulAppMethods', 'List',
    function($scope, $filter, sessionService, usefulAppMethods, List){

        /* Initializing $scopes */
        $scope.results = {};
        $scope.results.data = {};
        $scope.results.status = -1;
        $scope.results.errorMessage = "";
        $scope.results.data.page = 1;

        /* Reset $scopes */
        $scope.results.resetState = function(){
            $scope.results.status = -1;
            $scope.results.errorMessage = "";
            $scope.results.data.page = 1;
        };


        /* Reset $scopes data */
        $scope.results.hightResetState = function(){
            $scope.results.data = {};
            $scope.results.status = -1;
            $scope.results.errorMessage = "";
            $scope.results.data.page = 1;
        };

        /* Avoid the using of function apply in a digest phase */
        $scope.safeApply = function(fn) {
            var phase = this.$root.$$phase;
            if(phase == '$apply' || phase == '$digest') {
                if(fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };

        /* Filter order by */
        var orderBy = $filter('orderBy');

        $scope.orderBy = function (parameter){
            var param = ['name','artists[0]','duration','albumName'];
            $scope.results.data.list.tracks = orderBy($scope.results.data.list.tracks, param[parameter]);
            var index;
            for (index = 0;index < $scope.results.data.list.tracks.length; index++)
                if ($scope.results.data.list.tracks[index].selectMovie)
                    $scope.select = index;
        };

        /* When the user stop writing, make a call */
        var waitWriting = false;
        var writing = 0;

        var  checkWriting =  function (chars) {
            return function () {
                if (writing == chars) {
                    waitWriting = false;
                    $scope.results.resetState();
                    if ($scope.string != "")
                        sessionService.search($scope.string, $scope.results);
                    else
                        $scope.safeApply($scope.results.hightResetState);
                }
                else{
                    setTimeout(checkWriting(writing),200);
                }
            }
        };

        /* Search tracks */
        $scope.search = function () {
            writing += 1;
            if (!waitWriting){
                waitWriting = true;
                setTimeout(checkWriting(writing),200);
            }
        };

        /* Pagination */
        $scope.move = function (move){
            var what = '&limit=20';
            if (move == 0){
                if ($scope.results.data.page != 1) {
                    sessionService.changePage($scope.results.data.previous, $scope.results, false);
                }
            }
            else {
                if ($scope.results.data.page < Math.ceil(($scope.results.data.total / 20))){
                    sessionService.changePage($scope.results.data.next, $scope.results, true);
                }
            }
        };

        $scope.pages = function(){
            var temp;
            if ($scope.results.data.total != null)
                temp =  Math.ceil(($scope.results.data.total / 20));
            else
                temp = 1;
            return temp;
        };

        /* Is odd? */
        $scope.isOdd = function(number){
            return (number % 2) == 1;
        };

        /* A better way of showing time */
        $scope.msToMinutes = function (time){
            var str_pad_left =  function (string,pad,length) {
                return (new Array(length+1).join(pad)+string).slice(-length);
            };

            var minutes = Math.floor(time /1000 / 60);
            var seconds = time - minutes * 60;
            return str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);
        };

        /* The user select a track */
        $scope.set = function (index) {
            $scope.select = index;
            $scope.results.data.list.tracks[index].selectMovie = true;
        };

        /* Add track to local playlist */
        $scope.addTrack = function (){
            var temp = $scope.results.data.list.tracks[$scope.select];
            if (sessionService.myPlayList == null)
                sessionService.myPlayList = new List("myPlayList");
            var index;
            var condition = true;
            for (index = 0; index < sessionService.myPlayList.tracks.length; index++)
                if (temp.id == sessionService.myPlayList.tracks[index].id)
                    condition = false;
            if (condition)
                sessionService.myPlayList.addTrack(temp.id, temp.name, temp.albumName, temp.trackNumber, temp.duration, temp.imageUrl, temp.previewUrl, temp.artists);
        };

        $scope.$on('$locationChangeSuccess', function(event) {
            sessionService.ping();
        });
    }]);