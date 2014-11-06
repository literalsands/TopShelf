(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name topshelf.user.factory:Auth
   *
   * @description
   *
   */
  angular
    .module('topshelf.user')
    .factory('Auth', Auth);

   function Auth($location, $rootScope, $http, User, $localStorage, $sessionStorage, $q) {
          var STORAGE_KEY = 'token';

        function getStorageDriver(isPersistent) {
          return isPersistent ? $localStorage : $sessionStorage;
        }

        var currentUser = $sessionStorage.token ? User.get() : {};
        Auth.isPersistent = true;


        return {

          /**
           * Authenticate user and save token
           *
           * @param  {Object}   user     - login info
           * @param  {Function} callback - optional
           * @return {Promise}
           */
          login: function(user, callback) {
            var cb = callback || angular.noop;
            var deferred = $q.defer();

            $http.post('/auth/local', {
              email: user.email,
              password: user.password,
              rememberme : user.rememberme
            }).
            success(function(data) {
              $sessionStorage.token = data.token;

              currentUser = User.get();
              deferred.resolve(data);
              return cb();
            }).
            error(function(err) {
              this.logout();
              deferred.reject(err);
              return cb(err);
            }.bind(this));

            return deferred.promise;
          },

          /**
           * Delete access token and user info
           *
           * @param  {Function}
           */
          logout: function() {
            delete $sessionStorage.token;
            currentUser = {};
          },

          /**
           * Create a new user
           *
           * @param  {Object}   user     - user info
           * @param  {Function} callback - optional
           * @return {Promise}
           */
          createUser: function(user, callback) {
            var cb = callback || angular.noop;

            return User.save(user,
              function(data) {
                $sessionStorage.token = data.token;
                currentUser = User.get();
                return cb(user);
              },
              function(err) {
                this.logout();
                return cb(err);
              }.bind(this)).$promise;
          },

          /**
           * Change password
           *
           * @param  {String}   oldPassword
           * @param  {String}   newPassword
           * @param  {Function} callback    - optional
           * @return {Promise}
           */
          changePassword: function(oldPassword, newPassword, callback) {
            var cb = callback || angular.noop;

            return User.changePassword({ id: currentUser._id }, {
              oldPassword: oldPassword,
              newPassword: newPassword
            }, function(user) {
              return cb(user);
            }, function(err) {
              return cb(err);
            }).$promise;
          },

          /**
           * Gets all available info on authenticated user
           *
           * @return {Object} user
           */
          getCurrentUser: function() {
            return currentUser;
          },

          /**
           * Check if a user is logged in
           *
           * @return {Boolean}
           */
          isLoggedIn: function() {
            return currentUser.hasOwnProperty('role');
          },

          /**
           * Waits for currentUser to resolve before checking if user is logged in
           */
          isLoggedInAsync: function(cb) {
            if(currentUser.hasOwnProperty('$promise')) {
              currentUser.$promise.then(function() {
                cb(true);
              }).catch(function() {
                cb(false);
              });
            } else if(currentUser.hasOwnProperty('role')) {
              cb(true);
            } else {
              cb(false);
            }
          },
          store: function(data) {
            getStorageDriver(Auth.isPersistent)[STORAGE_KEY] = angular.copy(data);

            return this;
          },

          retrieve: function() {
              if (getStorageDriver(true)[STORAGE_KEY]) {
                return getStorageDriver(true)[STORAGE_KEY];
              } else if (getStorageDriver(false)[STORAGE_KEY]) {
                return getStorageDriver(false)[STORAGE_KEY];
              } else {
                return null;
              }
              return this;
            },
          clear: function() {
              delete getStorageDriver(true)[STORAGE_KEY];
              delete getStorageDriver(false)[STORAGE_KEY];
              return this;
            },

          isAuthenticated: function() {
              return !!Auth.retrieve();
            },





          /**
           * Check if a user is an admin
           *
           * @return {Boolean}
           */
          isAdmin: function() {
            return currentUser.role === 'admin';
          },

          /**
           * Get auth token
           */
          getToken: function() {
            return $localStorage.token;
          },

          /**
           * Set session token
           *
           * @param  {String}   session token
           * @return {Promise}
           */
          setSessionToken: function(sessionToken, callback) {
            var cb = callback || angular.noop;
            $sesionStorage.token = sessionToken;
            currentUser = User.get(cb);
          }
        };
      };
})();
