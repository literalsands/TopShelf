(function () {
  'use strict';

  /* @ngdoc object
   * @name home
   * @requires $routeProvider
   *
   * @description
   *
   *
   * @ngInject
   *
   */
function config ($stateProvider) {
    $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'app/home/home.tpl.html',
          controller: 'HomeCtrl',
          controllerAs: 'vm'
        });
    }


  angular
    .module('app')
    .config(config);

})();