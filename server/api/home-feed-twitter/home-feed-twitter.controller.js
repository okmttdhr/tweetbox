'use strict';

var _ = require('lodash');
var HomeFeedTwitter = require('./home-feed-twitter.model');

// Get list of home-feed-twitters
exports.index = function(req, res) {
  HomeFeedTwitter.find(function (err, home-feed-twitters) {
    if(err) { return handleError(res, err); }
    return res.json(200, home-feed-twitters);
  });
};

// Get a single home-feed-twitter
exports.show = function(req, res) {
  HomeFeedTwitter.findById(req.params.id, function (err, home-feed-twitter) {
    if(err) { return handleError(res, err); }
    if(!home-feed-twitter) { return res.send(404); }
    return res.json(home-feed-twitter);
  });
};

// Creates a new home-feed-twitter in the DB.
exports.create = function(req, res) {
  HomeFeedTwitter.create(req.body, function(err, home-feed-twitter) {
    if(err) { return handleError(res, err); }
    return res.json(201, home-feed-twitter);
  });
};

// Updates an existing home-feed-twitter in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  HomeFeedTwitter.findById(req.params.id, function (err, home-feed-twitter) {
    if (err) { return handleError(res, err); }
    if(!home-feed-twitter) { return res.send(404); }
    var updated = _.merge(home-feed-twitter, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, home-feed-twitter);
    });
  });
};

// Deletes a home-feed-twitter from the DB.
exports.destroy = function(req, res) {
  HomeFeedTwitter.findById(req.params.id, function (err, home-feed-twitter) {
    if(err) { return handleError(res, err); }
    if(!home-feed-twitter) { return res.send(404); }
    home-feed-twitter.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}