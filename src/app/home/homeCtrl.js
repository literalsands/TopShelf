(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name home.controller:HomeCtrl
   * @function
   *
   * @description
   *
   *
   * @ngInject
   *
   */
  function HomeCtrl(Restangular) {
  var vm = this;

     vm.recruits = Restangular.all('recruit').getList().$object;


  }

  angular
    .module('app')
    .controller('HomeCtrl', HomeCtrl);

})();