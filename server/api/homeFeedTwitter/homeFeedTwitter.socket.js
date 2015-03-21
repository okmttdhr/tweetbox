/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var HomeFeedTwitter = require('./homeFeedTwitter.model');

exports.register = function(socket) {
  HomeFeedTwitter.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  HomeFeedTwitter.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('homeFeedTwitter:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('homeFeedTwitter:remove', doc);
}