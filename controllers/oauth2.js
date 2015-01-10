/*
 OAuth2 controller to faciliate the OAuth2 flow.
 */

// Load required packages
var oauth2orize = require('oauth2orize');
var User = require('../models/user');
var Client = require('../models/client');
var Token = require('../models/token');
var Code = require('../models/code');

// Create OAuth 2.0 Server
var server = oauth2orize.createServer();

// Register serialalization function
server.serializeClient(function(client, callback) {
  return callback(null, client._id);
});

// Register deserialization function
server.deserializeClient(function(id, callback) {
  Client.findOne({ _id : id }, function(err, client) {
    if(err)
      return callback(err);

    return callback(null, client);
  });
});

// Register authorization code grant type
server.grant(oauth2orize.grant.code(function(client, redirectUri, user, ares, callback){
  // Create a new authorization code
  var code = new Code({
    value : uid(16),
    clientId : client._id,
    redirectUri : redirectUri,
    userId : user._id
  });

  // Save the auth code and check for errors
  code.save(function(err) {
    if (err)
      return callback(err);

    callback(null, code.value);
  });

}));
