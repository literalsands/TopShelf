(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name home.controller:LoginCtrl
   * @function
   *
   * @description
   *
   *
   * @ngInject
   *
   */
  function LoginCtrl($scope, Auth, $location, $window) {
    
    
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/home');
        }
        .catch( function(err) {
          $scope.errors.other = err.message;
        })
      )}
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
}
  angular
    .module('account')
    .controller('LoginCtrl', LoginCtrl);

})();