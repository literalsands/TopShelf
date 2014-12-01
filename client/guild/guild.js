(function () {
  'use strict';

  /* @ngdoc object
   * @name guild
   * @requires $stateProvider
   *
   * @description
   *
   */
  function config($stateProvider) {
    $stateProvider
      .state('guildrecruitment', {
        url: '/guild/recruitment',
        templateUrl: 'guild/recruitment/recruitment.tpl.html',
        controller: 'RecruitmentCtrl as recruitment'
      })
      .state('raidlist', {
        url: '/guild/raids',
        templateUrl: 'guild/raid/raidList.tpl.html',
        controller: 'RaidListCtrl'
      })
      .state('raidView', {
        url: '/guild/raids/:id',
        templateUrl: 'guild/raid/viewRaid.tpl.html',
        controller: 'RaidViewCtrl'
      })

      .state('apply', {
        url: '/guild/application',
        templateUrl: 'guild/application/application.tpl.html',
        controller: 'ApplicationCtrl',
        authenticate: true
      })
      .state('streams', {
        url: '/guild/streams',
        templateUrl: 'guild/streams/streams.tpl.html',
        controller: 'StreamCtrl as vm'
      })
      .state('streams.watch', {
        url: '/guild/streams/watch',
        templateUrl: 'guild/streams/watch.tpl.html',
        controller: 'StreamCtrl as vm'
      });
  }
  angular
    .module('topshelf.guild')
    .config(config);
})();
