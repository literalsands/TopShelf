(function () {
    'use strict';

    function recruitingPanel() {
        return {
      templateUrl: 'app/core/directives/recruitingPanel/core.recruitingPanel.tpl.html',
      restrict: 'EA',
      controller: function($scope, recruitmentFactory, $log) {
          recruitmentFactory.getRecruitment()
            .success(function (recruitments) {
            $scope.recruitments = recruitments;
          //console.log('aside - postsFactory.getPosts()', posts);
           // socket.syncUpdates('recruitment', $scope.recruitments);
        }).
        error(function (error) {
            $scope.status = 'Unable to Retrieve Recruitment Status: ' + error.message;
            console.log($scope.status);
        });
      }
    };
    }

    angular
        .module('topshelf.core.directives')
        .directive('recruitingPanel', recruitingPanel);
})();