'use strict';

var _ = require('lodash');
var Raid = require('./raid.model');
var User = require('../user/user.model');
// Get list of raids
exports.index = function(req, res) {
  Raid.find(function (err, raids) {
    if(err) { return handleError(res, err); }
    return res.json(200, raids);
  });
};

// Get a single raid
exports.show = function(req, res) {
  Raid.findById(req.params.id, function (err, raid) {
    if(err) { return handleError(res, err); }
    if(!raid) { return res.send(404); }
    return res.json(raid);
  });
};

// Creates a new raid in the DB.
exports.create = function(req, res) {
  Raid.create(_.merge({ raidLead: req.user._id },req.body, function(err, raid) {
    if(err) { return handleError(res, err); }
    return res.json(201, raid);
  })
)};


// Updates an existing raid in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Raid.findById(req.params.id, function (err, raid) {
    if (err) { return handleError(res, err); }
    if(!raid) { return res.send(404); }
    // var updated = _.merge(raid, req.body);
    var updated = _.extend(raid, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, raid);
    });
  });
};

// Deletes a raid from the DB.
exports.destroy = function(req, res) {
  Raid.findById(req.params.id, function (err, raid) {
    if(err) { return handleError(res, err); }
    if(!raid) { return res.send(404); }
    raid.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
