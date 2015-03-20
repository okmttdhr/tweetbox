/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var HomeFeedTwitter = require('./home-feed-twitter.model');

exports.register = function(socket) {
  HomeFeedTwitter.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  HomeFeedTwitter.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('home-feed-twitter:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('home-feed-twitter:remove', doc);
}