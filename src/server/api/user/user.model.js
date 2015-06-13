'use strict';
var config = require('../../config/environment');
var bcrypt = require('bcrypt-nodejs');
var c = require('chalk');
var thinky = require('../../config/thinky');
var r = thinky.r;
var type = thinky.type;
var validator = require('validator');

var User = thinky.createModel('User', {
    username: type.string(),
    password: type.string(),
    email: type.string(),
    role: type.string().enum(['registered',
      'member',
      'raider',
      'officer',
      'admin']).default('registered'),
    createdAt: type.date().default(r.now())
},  {
  // Make the username the primary key
  pk: 'username'
});

User.ensureIndex('createdAt');

User.defineStatic('getView', function() {
    return this.without('password');
});

// Salt and hash the password on save
User.pre('save', function(next) {
  // Get object from req
  var user = this;

  // Salt the password
  bcrypt.genSalt(5, function(err, salt) {
    if (err) {
      console.log(c.red('Errors while generating salt: ') + err);
    }

    // Hash the password
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
          return console.log(c.red('Errors while hashing password: ') + err);
      } else {
          user.password = hash;
          next();
      }
    });
  });
});

module.exports = User;
