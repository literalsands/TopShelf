(function () {
  'use strict';
  /*
    @ngdoc object
    @name app.guild.controller:MainCtrl:
    @desc controller for the main state
  */
  angular
    .module('app.guild')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['Article', '$location'];
  /* @ngInject */
  function MainCtrl(Article, $location) {
    var vm = this;
    vm.articles = {};
    Article.all().success(function (data) {
      // bind the articles that come back to vm.articles
      vm.articles = data;
    })
    .error(function (error) {
      vm.status = 'Unable to Retrieve articles cause: ' + error.message;
    });
    vm.viewMore = function (article) {
      $location.path('/article/' + article._id);
    };
  }
}());