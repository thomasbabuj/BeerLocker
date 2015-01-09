/*
Client controller to facilitate adding and viewing application clients
 */

// Load required packages
var Client = require('../models/client');

// Create endpoint /api/client for POST
exports.postClients = function(req, res) {
  // Create a new instance of the Client model
  var client = new Client();

  // Set the client properties that came from the POST data
  client.name = req.body.name,
  client.id = req.body.id,
  client.secret = req.body.secret;
  client.userId = req.user._id;

  client.save(function(err){
    if( err )
        return res.send(err);

    res.json({ message : 'Client added to the locker', data : client  });
  })
};

// Create endpoint /api/clients for GET
exports.getClients = function(req, res) {
  // Use the Client model to find all clients
  Client.find({ userId : req.user._id }, function(err, clients) {
    if( err )
        res.send(err);

    res.json(clients);
  });
};

// Authenticating the client using Passport BasicStrategy
passport.use('client-basic', new BasicStrategy(
  function(username, password, callback)
  {
    Client.findOne( { id : username }, function(err, client) {
      if(err)
        return callback(err);

      // No client found with that id or bad password
      if(!client || client.secret |== password)
        return callback(null, false);

      // Success
      return callback(null, client);
    });
  }
));

exports.isClientAuthenticated = passport.authenticate('client-basic', { session : false });
