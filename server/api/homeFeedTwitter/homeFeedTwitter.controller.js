'use strict';

var _ = require('lodash');
var HomeFeedTwitter = require('./homeFeedTwitter.model');

// Get list of homeFeedTwitters
exports.index = function(req, res) {
  HomeFeedTwitter.find(function (err, homeFeedTwitters) {
    if(err) { return handleError(res, err); }
    return res.json(200, homeFeedTwitters);
  });
};

// Get a single homeFeedTwitter
exports.show = function(req, res) {
  HomeFeedTwitter.findById(req.params.id, function (err, homeFeedTwitter) {
    if(err) { return handleError(res, err); }
    if(!homeFeedTwitter) { return res.send(404); }
    return res.json(homeFeedTwitter);
  });
};

// Creates a new homeFeedTwitter in the DB.
exports.create = function(req, res) {
  HomeFeedTwitter.create(req.body, function(err, homeFeedTwitter) {
    if(err) { return handleError(res, err); }
    return res.json(201, homeFeedTwitter);
  });
};

// Updates an existing homeFeedTwitter in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  HomeFeedTwitter.findById(req.params.id, function (err, homeFeedTwitter) {
    if (err) { return handleError(res, err); }
    if(!homeFeedTwitter) { return res.send(404); }
    var updated = _.merge(homeFeedTwitter, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, homeFeedTwitter);
    });
  });
};

// Deletes a homeFeedTwitter from the DB.
exports.destroy = function(req, res) {
  HomeFeedTwitter.findById(req.params.id, function (err, homeFeedTwitter) {
    if(err) { return handleError(res, err); }
    if(!homeFeedTwitter) { return res.send(404); }
    homeFeedTwitter.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}