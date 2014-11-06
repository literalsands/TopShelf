(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name user.directive:loginForm
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="user">
       <file name="index.html">
        <login-form></login-form>
       </file>
     </example>
   *
   */
  angular
    .module('topshelf.user')
    .directive('loginForm', loginForm);

  function loginForm(Auth, $location, $window, ngToast) {
    return {
      templateUrl: 'user/login/loginForm.tpl.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        scope.user = {};
      scope.errors = {};

      scope.login = function(form) {
        scope.submitted = true;

        if(form.$valid) {
          Auth.login({
            email: scope.user.email,
            password: scope.user.password
          })
          .then( function() {
            ngToast.create('Successfully logged in!');
            // Logged in, redirect to home
            $location.path('/');
          })
          .catch( function(err) {
            scope.errors.other = err.message;
          });
        }
      };

      scope.loginOauth = function(provider) {
        $window.location.href = '/auth/' + provider;
      };
      }
    };
  };
})();
