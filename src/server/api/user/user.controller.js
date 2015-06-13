'use strict';
var debug = require('debug')('tsg:User'),
User = require('./user.model'),
thinky = require('../../config/thinky'),
//jwt  = require('jwt-simple'),
moment = require('moment'),
bcrypt = require('bcrypt-nodejs'),
c = require('chalk'),
auth = require('../../auth/auth.service'),
config = require('../../config/environment'),
jwt = require('jsonwebtoken');

// Keep reference to RethinkDB's driver
var r = thinky.r;
/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.run().then(function (users) {
    if (err) return res.status(500).json(err);
    res.status(200).json(users);
  });
 }

/**
 * Creates a new user from a username and password.
 *
 * @param {Object} the request to our server
 * @param {response} the response to the client
 * @api public
 */
exports.signupUser = function(req, res) {
  // Create new instance of 'User' model
  var user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    role: 'registered'
  });

  // Save the person and check for errors kind-of. It'll also call `save`'s `pre` hook
  user.save(function(err, doc) {
  if (err) {
    res.status(403).json({
      error: 'Username already taken. Choose a different username.'
    });
    console.log(c.red('Error: ') + err);

  } else {
    // Create a token that expires 7 days from now
    var expires = moment().add(4200, 'minutes').valueOf();

    var payload = {
      sub: user.id,
      iss: user.username,
      role: user.role,
      iat: moment().unix(),
      exp: moment().add(4200, 'minutes').unix()
    };
    var token = jwt.sign(payload, config.session.secret);

    // Issue the token in the response
    res.json({token: token});
  }});
};

/**
 * Login Route
 *
 * @param {Object} the request sent to our server
 * @param {Object} the response sent back to the client.
 * Includes a valid JSON web token
 * @api public
 */
exports.loginUser = function(req, res) {
  // Start by finding the username
  User.get(req.body.username).run().then(function(user) {
    console.log(c.green('\nFound user: ') + req.body.username);

    // Compare the password here with the password in the database
    bcrypt.compare(req.body.password, user.password, function(err, res) {
      console.log(c.red('Errors: ') + err);
      console.log(c.blue('Password matched: ') + res);
    });

   // Create a token that expires 7 days from now
    var expires = moment().add(4200, 'minutes').valueOf();

    var payload = {
      sub: user.id,
      iss: user.username,
      role: user.role,
      iat: moment().unix(),
      exp: moment().add(4200, 'minutes').unix()
    };
    var token = jwt.sign(payload, config.session.secret);

    // Issue the token in the response
    res.json({token: token});

  }).error(function(err) {
    console.log(c.red('\nError: could not find user with username: ') + req.body.username);

    // @TODO: This is where you need to setup the logic to suggest that new users sign up.
    console.log(c.yellow('Maybe you should create an account?'));
    res.status(404).json({message: err});
  });
};

/**
 * Delete a user's account.
 *
 * @param {Object} the request sent to our server
 * @param {Object} the response sent back to the client
 * @api public
 */

exports.deleteUser = function(req, res) {
  // Get the username from the token
  var user = token.decode(req);

  User.get(user.iss).delete().execute().then(function(result) {
    res.json(result);
  }).error(function(err) {
    res.json({
      message: 'Error when trying to delete user',
      err: err
    });
  });
};
/**
 * Get a user by id.
 *
 * @param {Object} the request sent to our server
 * @param {Object} the response sent back to the client
 * @api public
 */

exports.showUser = function (req, res) {
  User.get(req.params.id).run().then(function(user) {
    res.json(user);
  });
};

/**
 * Get my info

exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
}; */

/**
 * Authentication callback
 */
